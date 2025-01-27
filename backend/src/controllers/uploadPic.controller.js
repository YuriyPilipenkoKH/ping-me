import cloudinary from 'cloudinary';
import Busboy from 'busboy';


export const uploadPic = async(req, res) => {
  console.log('uploadPic started');

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
      console.log(`Uploading file: ${filename}`);

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
                // console.log('Cloudinary upload result:', result);
                resolve(result);
              }
            }
          );
          file.pipe(stream); // Pipe the file stream to Cloudinary
        });
        console.log('Upload complete:', uploadResponse.secure_url);
        return  uploadResponse.secure_url

      } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ message: 'File upload failed', error: error.message });
      }
    });
    // Finish event
    busboy.on('finish', () => {
      // console.log('Busboy finished parsing the request.');
    });
    req.pipe(busboy);
  
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return res.status(500).json({
      message: 'File upload failed',
      error: error.message,
    });
  }
};
