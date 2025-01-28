import cloudinary from 'cloudinary';
import Busboy from 'busboy';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';
// not in use
export const sendMessage = async (req, res) => {
  const userId = req.user?._id; // Assuming user is authenticated and ID is available in req.user
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID not found' });
  }

  if (!req.headers['content-type']?.includes('multipart/form-data')) {
    return res.status(400).json({ message: 'Invalid content type' });
  }

  try {
    const busboy = new Busboy({ headers: req.headers });
    let messageText = '';
    let receiverId = '';
    // Handle text fields
    busboy.on('field', (fieldname, value) => {
      if (fieldname === 'text') {
        messageText = value
      }
      if (fieldname === 'receiverId') {
        receiverId = value
      }
    });

    // Handle file uploads
    // if () {
    // }
    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
      try {
        const uploadResponse = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `ping-me/users/${userId}/pics`,
              // public_id: userId,
              overwrite: false,
              use_filename: true,
              unique_filename: true,
            },
            (error, result) => {
              if (error) {
                console.error('Error during Cloudinary upload:', error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          file.pipe(stream);
        });

        console.log('Upload complete:', uploadResponse.secure_url);
       const imageUrl = uploadResponse.secure_url 
        
      return imageUrl

      } catch (error) {
        console.error('Error during file upload:', error);
        return res.status(500).json({ message: 'File upload failed', error: error.message });
      }
    });
    
    req.pipe(busboy);
    
    

          const newMessage = new Message({
            senderId: userId,
            receiverId,
            text: messageText,
            image: imageUrl,
          });
      
          await newMessage.save();

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// not in use
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
