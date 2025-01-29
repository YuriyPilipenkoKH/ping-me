import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req,res,next) => {
  console.log('protectRoute');
  
  try {
    const token = req.cookies['ping-token'];
    if(!token) {
      return res.status(401).json({message: 'Unauthorized — No token provided'})
    }
    const decoded = jwt.verify(token, process.env.SECRET)
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user =await User.findById(decoded.userId).select("-password")
    
    if(!user) {
      return res.status(404).json({message: "User not found"})
    }
    req.user = user 
    // console.log('req.user.midd',req.user);
    next()
  } catch (error) {
    console.log('Error in protectroute middleware', error.message);
    return res.status(500).json({message: 'server error'})
  }
  
}