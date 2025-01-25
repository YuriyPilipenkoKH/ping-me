
import cloudinary from 'cloudinary';

export const updateProfile = async(req, res) => {
  try {
    const {image} =  req.body
    const userId = req.user._id
    const existingUserImage = req.user.image

    if(!image) {
     return res.status(400).json({
      message: " Profile pic is not provided"
      })
    }    

    // Upload the image to Cloudinary with the specified folder
 // If an old image exists, delete it from Cloudinary
    if (existingUserImage) {
      const publicId = existingUserImage.split('/').pop().split('.')[0]; // Extract public_id from the image URL
      await cloudinary.uploader.destroy(`ping-me/users/${userId}/${publicId}`);
    }

    // Upload the new image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: `ping-me/users/${userId}`, // Folder path in Cloudinary
    });


    const updateUser = await User.findByIdAndUpdate(
      userId, 
      {image: uploadResponse.secure_url},
      {new: true}
    )
    return res.status(201).json(
      {
         message: 'User updated successfully',
         user: updateUser
        })
    
  } catch (error) {
    console.log('error in updateprofile controller');
  }
}