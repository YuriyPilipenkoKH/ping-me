import formidable from "formidable";
import fs from "fs";
import cloudinary from "../lib/cloudinary.js";



export const uploadImage = (req, res) => {
  const form = formidable({
    multiples: false, // Single file upload
    uploadDir: "./uploads", // Temporary storage
    keepExtensions: true, // Retain file extensions
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(400).json({ message: "Error parsing form data" });
    }

    const file = files.image; // Assuming 'image' is the field name
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(file.filepath, {
        folder: `ping-me/users/${fields.userId}`, // User-specific folder
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });
      console.log(uploadResponse.secure_url);

      // Delete the temp file
      fs.unlinkSync(file.filepath);

      // Respond with the Cloudinary URL
      res.status(200).json({
        message: "File uploaded successfully",
        url: uploadResponse.secure_url,
      });
    } catch (uploadError) {
      console.error("Error uploading to Cloudinary:", uploadError);

      // Delete the temp file even if upload fails
      fs.unlinkSync(file.filepath);

      res.status(500).json({
        message: "File upload failed",
        error: uploadError.message,
      });
    }
  });
};
