import User from "../models/user.model.js"


export const getUsersForSidebar = async (req,res) => {
  try {
    const loggedInUserId = req.user._id //me
    const filteredUsers = await User
    .find({_id: {$ne:loggedInUserId}}) // find all exept me
    .select("-password")

    return res.status(200).json(filteredUsers)
  } catch (error) {
    console.log("error in getUsersForSidebar");
    return res.status(500).json({ message: 'Server error' });
  }
}

export const getMessages =  async (req,res) => {
  try {
    const {id: userToCatId} = req.params
  } catch (error) {
    console.log("error in getMessages");
    return res.status(500).json({ message: 'Server error' });
  }
}