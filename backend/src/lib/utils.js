import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {

  const token = jwt.sign(
    { userId }, 
    process.env.SECRET, 
    { expiresIn: '7d' }
  );
  // Set the cookie
  res.cookie(
    'ping-token',
     token, 
     { 
      maxAge: 1000 * 60 * 60 * 24 * 7, 
      httpOnly: true ,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    }
    );
}