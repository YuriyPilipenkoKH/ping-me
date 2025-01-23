import jwt from 'jsonwebtoken'
import User from '../models/user.model'

export const protectRoute = async (req,res,next) => {
  try {
    const token = req.cookies.ping-token
    if(!token) {
      return res.status(401).json({message: 'Unauthorized — No token provided'})
    }
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = User.findById(decoded.userId).select("-password")
    
    if(!user) {
      return res.status(401).json({message: "User not found"})
    }
    req.user = user 
    next()

  } catch (error) {
    
  }
  
}