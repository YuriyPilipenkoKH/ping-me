import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const signup = async(req, res) => {
  const{ name, email, password } = req.body;

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
    const newUser = new User({ 
      name,
      email, 
      password: hashedPassword });
  } catch (error) {
    
  }
}

export const login = (req, res) => {
  res.send('login route');
}

export const logout = (req, res) => {
  res.send('logout route');
}