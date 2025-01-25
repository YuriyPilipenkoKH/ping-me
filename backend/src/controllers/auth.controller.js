import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateToken from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async(req, res) => {
  const{ name, email, password } = req.body;
  if(!name || !email || !password) {
    return res.status(400).json({message: 'Please fill in all fields'});
  }

  try {
    //hash password
  const hashedPassword = await bcrypt.hash(password, 12);
    if(password.length < 4) {
      return res.status(400).json({message: 'Password must be at least 4 characters long'})
    }

    const user = await User.findOne({ email });
    if(user) {
      return res.status(400).json({message: 'User already exists'});
    }
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
    // Convert Mongoose document to plain object
      const userObject = newUser.toObject();
    // Destructure to exclude password from userObject
      const { password, ...plainUser } = userObject;
      return res.status(201).json(
        {
           message: 'User created successfully',
           user: plainUser
          })
    }
    else{
      return res.status(400).json({ message: 'Invalid user data' });

    }
  } catch (error) {
    console.log('Error in user signup', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export const login = async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if(!email || !password) {
      return res.status(400).json({message: 'Please fill in all fields'});
    }
    if(password.length < 4) {
      return res.status(400).json({message: 'Password must be at least 4 characters long'})
    }
    try {
      const user = await User.findOne({ email });
      if(!user) {
        return res.status(400).json({message: 'Invalid credentials'});
      }
    // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      generateToken(user._id, res);



      return res.status(200).json({ 
        message: 'User logged in successfully', 
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        } 
      });
  } catch (error) {
    console.log('Error in user login', error);
    return res.status(500).json({ message: 'Server error' });
    
  }
}

export const logout = (req,res) => {
  try {
    res.clearCookie('ping-token', {maxAge: 0});
    return res.status(200).json({ message: 'User logged out successfully' });  
  } catch (error) {
    console.log('Error in user logout', error);
    return res.status(500).json({ message: 'Server error' });
    
  }
}

export const updateProfile = async(req, res) => {
  try {
    const {profilePic} =  req.body
    const userId = req.user._id

    if(!profilePic) {
     return res.status(400).json({
      message: " Profile pic is not provided"
      })
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updateUser = await User.findByIdAndUpdate(
      userId, 
      {profilePic: uploadResponse.secure_url},
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

export const checkAuth = (req,res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkauth controller ",error.message);
    res.status(500).json({message: 'server error'})
  }
}