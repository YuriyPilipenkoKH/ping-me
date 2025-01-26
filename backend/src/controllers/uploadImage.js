import cloudinary from "../lib/cloudinary.js";



export const uploadImage = async(req, res) => {
  console.log('uploadImage');
  const file = await req.formData()
  const image = file.get('file')
  // const {image} =  req.body
  const userId = req.user._id
  if (!userId) {
    return res.status(400).json({ message: "User ID not found" });
  }
   if (!image) {
    return res.status(400).json({ message: "Profile pic is not provided" });
  }
  console.log( 'userId',userId);
  console.log('image',image);
  
    try {
      // Upload to Cloudinary
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      console.log(buffer);
  

      return res.status(200).json(
        {
           message: 'User updated successfully',
          //  user: updateUser
          })
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);

       res.status(500).json({
        message: "File upload failed",
        error: error.message,
      });
    }

};
