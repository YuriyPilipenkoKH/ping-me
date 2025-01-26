import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";


const AvatarUploadForm = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] =  useState<string | null>(null);
    console.log(authUser);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; // Use optional chaining to handle null or undefined
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error("File size exceeds the limit of 5MB.");
        return;
      }
      
    }

  return (
    <form>AvatarUploadForm</form>
  )
}

export default AvatarUploadForm