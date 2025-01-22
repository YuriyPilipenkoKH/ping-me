import bcrypt from 'bcryptjs';

export const signup = async(req, res) => {
  const{ name, email, password } = req.body;

  try {
    //hash password
  const hashedPassword = await bcrypt.hash(password, 12);
    
  } catch (error) {
    
  }
}

export const login = (req, res) => {
  res.send('login route');
}

export const logout = (req, res) => {
  res.send('logout route');
}