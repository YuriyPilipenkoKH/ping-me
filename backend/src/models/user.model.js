import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true,
    },
    email: { 
      type: String, 
      required: true,
      unique: true
    },
    password: { 
      type: String, 
      required: true,
      minLength: 4
    },
    image: { 
      type: String, 
      required: false,
      default: 'https://via.placeholder.com/150'
    },
    role: { 
      type: String, 
      required: true,
      default: 'user'
    },
  },
  { timestamps: true }
)
const User = mongoose.model('User', userShema)
export default User