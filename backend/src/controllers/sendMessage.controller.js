import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  const userId = req.user._id;
  const { id: receiverId } = req.params;

  // Retrieve the text field from FormData
  const { text } = req.body;

  try {
    let imageUrl = null;

    if (req.file) {
      // Upload the file to Cloudinary using a Promise
      const uploadResponse = await new Promise((resolve, reject) => {
        const fileStream = cloudinary.uploader.upload_stream(
          {
            folder: `ping-me/users/${userId}/pics`,
            // public_id: userId,
            overwrite: false,
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error) {
              reject(error); // Reject the promise on error
            } else {
              resolve(result); // Resolve the promise with the result
            }
          }
        );
        // Pipe the file buffer to Cloudinary
        fileStream.end(req.file.buffer);
      });

      imageUrl = uploadResponse.secure_url; // Store the uploaded file URL
    }

    // Create and save the new message
    const newMessage = new Message({
      senderId: userId,
      receiverId,
      text: text || "", // Use the text field if available, or an empty string
      image: imageUrl, // Use the uploaded file URL if available
    });

    await newMessage.save();

    // Return success response
    return res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error during file upload:", error);
    return res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
};
