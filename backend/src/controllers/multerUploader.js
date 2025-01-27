import cloudinary from "../lib/cloudinary.js";


export const multerUploader = async (req, res) => {
  const userId = req.user._id
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    // Upload the file to Cloudinary
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
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'File upload failed', error: error.message });
        }

        // If upload is successful, return the result
        return res.status(200).json({
          message: 'File uploaded successfully',
          secure_url: result?.secure_url,
        });
      }
    );
    // Pipe the file buffer to Cloudinary
    fileStream.end(req.file.buffer); // req.file.buffer contains the file's binary data

  } catch (error) {
    console.error('Error during file upload:', error);
    return res.status(500).json({ message: 'File upload failed', error: error.message });
  }
}
