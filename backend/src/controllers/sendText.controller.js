import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from "../lib/socket.js";

export const sendText = async (req, res) => {
  const userId = req.user?._id
  const {text, image} = req.body
  const { id: receiverId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: 'User ID not found' });
  }
  
  try {

    const newMessage = new Message({
      senderId: userId,
      receiverId,
      text,
      image,
    });

    await newMessage.save();

    //real time logic
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json(newMessage)
      } catch (error) {
        console.log("error in sendMessage controller");
        return res.status(500).json({ message: 'Server error' });
    }

  }