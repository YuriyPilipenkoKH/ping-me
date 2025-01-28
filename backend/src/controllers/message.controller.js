import cloudinary from "../lib/cloudinary.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"


export const getUsersForSidebar = async (req,res) => {
  try {
    const loggedInUserId = req.user._id //me
    const filteredUsers = await User
    .find({_id: {$ne:loggedInUserId}}) // find all exept me
    .select("-password")

     res.status(200).json(filteredUsers)
  } catch (error) {
    console.log("error in getUsersForSidebar");
     res.status(500).json({ message: 'Server error' });
  }
}

export const getMessages =  async (req,res) => {
  try {
    const {id: userToChatId} = req.params
    const myId = req.user._id

    const messages = await Message.find({
      $or:[
        { senderId:myId, receiverId:userToChatId },
        { senderId:userToChatId, receiverId:myId },
        ]
    })
    return res.status(200).json(messages)
  } catch (error) {
    console.log("error in getMessages controller");
    return res.status(500).json({ message: 'Server error' });
  }
}
// original controller not in use
export const sendMessage =  async (req,res) => {
  try {
    const {text,image} = req.body
    const {id: receiverId} = req.params
    const senderId = req.user._id

    let imageUrl
    if(image){
      //upload base64
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url
     }

     const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image:imageUrl
     })
     await newMessage.save()
  return res.status(200).json(newMessage)
  } catch (error) {
    console.log("error in sendMessage controller");
    return res.status(500).json({ message: 'Server error' });
  }
}

export const deleteMessage =  async (req,res) => {
  const { id } = req.params;
  try {
    const del = await Message.deleteOne({ _id: id });

    if (del.deletedCount === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({
      message: 'Message successfully removed',
    });
  } catch (error) {
    console.log("error in deleteMessage controller"+error);
    return res.status(500).json({ message: 'deleteMessage error' });
  }

}

//DivID: 6798b23001ba85a893435a82