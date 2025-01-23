import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateToken from '../lib/utils.js';

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

export const login = (req, res) => {
  res.send('login route');
}

export const logout = (req, res) => {
  res.send('logout route');
}