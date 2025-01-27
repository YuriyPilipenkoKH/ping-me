import Busboy from 'busboy';
import cloudinary from '../lib/cloudinary.js';
import User from '../models/user.model.js';

export const uploadAvatar = async (req, res) => {
  // console.log('uploadAvatar');

  const userId = req.user._id
  if (!userId) {
    return res.status(400).json({ message: 'User ID not found' });
  }
  console.log('User ID:', userId);

  if (!req.headers['content-type']?.includes('multipart/form-data')) {
    return res.status(400).json({ message: 'Invalid content type' });
  }


  try {
    const busboy = new Busboy({ headers: req.headers });
    // Handle file uploads
    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
      // console.log(`Uploading file: ${filename}`);

      try {
        const uploadResponse = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `ping-me/users/${userId}`,
              public_id: userId,
              overwrite: true,
              use_filename: true,
              unique_filename: false,
            },
            (error, result) => {
              if (error) {
                console.error('Error during Cloudinary upload:', error);
                reject(error);
              } else {
                // console.log('Cloudinary upload result:', result);
                resolve(result);
              }
            }
          );
          file.pipe(stream); // Pipe the file stream to Cloudinary
        });

        console.log('Upload complete:', uploadResponse.secure_url);

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { image: uploadResponse.secure_url },
          { new: true }
        );

        res.status(200).json({
          message: 'Profile image uploaded successfully',
          user : updatedUser,
        });
      } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ message: 'File upload failed', error: error.message });
      }
    });


    req.pipe(busboy); // Pipe the incoming request to Busboy for parsing

  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return res.status(500).json({
      message: 'File upload failed',
      error: error.message,
    });
  }
};

