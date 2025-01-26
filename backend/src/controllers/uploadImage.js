import cloudinary from "../lib/cloudinary.js";



export const uploadImage = (req, res) => {
  
    try {
      // Upload to Cloudinary
    
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);

       res.status(500).json({
        message: "File upload failed",
        error: error.message,
      });
    }

};
