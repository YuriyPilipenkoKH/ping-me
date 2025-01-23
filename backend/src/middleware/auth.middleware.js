import jwt from 'jsonwebtoken'

export const protectRoute = async (req,res,next) => {
  try {
    const token = req.cookies.ping-token
    if(!token) {
      return res.status(401).json({message: 'Unauthorized — No token provided'})
    }
  } catch (error) {
    
  }
  
}