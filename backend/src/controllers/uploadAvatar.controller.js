import cloudinary from '../lib/cloudinary.js';
import User from '../models/user.model.js';

export const uploadAvatar = async (req, res) => {
  // console.log('req.file',req.file);

  const userId = req.user._id
  if (!userId) {
    return res.status(400).json({ message: 'User ID not found' });
  }
  console.log('User ID:', userId);

  if (!req.headers['content-type']?.includes('multipart/form-data')) {
    return res.status(400).json({ message: 'Invalid content type' });
  }

  try {
 let imageUrl = null;

    if (req.file) {
      // Upload the file to Cloudinary using a Promise
      const uploadResponse = await new Promise((resolve, reject) => {
        const fileStream = cloudinary.uploader.upload_stream(
          {
              folder: `ping-me/users/${userId}`,
              public_id: userId,
              overwrite: true,
              // use_filename: true,
              // unique_filename: false,
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
    console.log('Upload complete:', imageUrl);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile image uploaded successfully',
      user : updatedUser,
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return res.status(500).json({
      message: 'File upload failed',
      error: error.message,
    });
  }
};

