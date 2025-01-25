import React, { useState } from 'react'
import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage