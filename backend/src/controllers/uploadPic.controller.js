import cloudinary from 'cloudinary';
import User from '../models/user.model.js'; // Adjust import path if necessary

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
    const { image } = req.body;
    const userId = req.user._id;
    const existingUserImage = req.user.image;

    // console.log('image:', image);
    console.log('userId:', userId);
    console.log('existingUserImage:', existingUserImage);

    // Check if image is provided
    if (!image) {
      return res.status(400).json({
        message: "Profile pic is not provided"
      });
    }

    // If there is an existing image, delete it from Cloudinary
    if (existingUserImage) {
      const publicId = existingUserImage.split('/').pop().split('.')[0]; // Extract public_id from image URL
      console.log('Deleting old image with public_id:', publicId);

      try {
        const deleteResponse = await cloudinary.uploader.destroy(`ping-me/users/${userId}/${publicId}`);
        console.log('Old image deleted:', deleteResponse);
      } catch (deleteError) {
        console.error('Error deleting old image from Cloudinary:', deleteError);
        return res.status(500).json({
          message: 'Error deleting old image',
          error: deleteError.message
        });
      }
    }
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder:  `ping-me/users/${userId.toString()}`,
      resource_type: "image",
      public_id: userId,
  };

  
  // console.log('Uploading image to Cloudinary with options:', options);

    // Upload the new image to Cloudinary
    console.log('Uploading new image to Cloudinary');
    const uploadResponse = await cloudinary.uploader.upload(image, options);

    console.log('Image uploaded to Cloudinary:', uploadResponse);

    // Update user profile with new image URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: uploadResponse.secure_url },
      { new: true }
    );

    return res.status(201).json({
      message: 'User updated successfully',
      user: updatedUser
    });

  } catch (error) {
    // Log the full error message and stack trace for debugging
    console.error('Error in updateProfile controller:', error.message);
    console.error(error.stack);

    return res.status(500).json({
      message: 'Error updating profile',
      error: error.message
    });
  }
};
