import React, { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import { Camera, } from "lucide-react";
import toast from 'react-hot-toast';

const AvatarUploadForm = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] =  useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; // Use optional chaining to handle null or undefined
      if (!file) return;
        // Check if the file size is too large (e.g., 5MB max)
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error("File size exceeds the limit of 5MB.");
        return;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = async () => {
        const base64Image = reader.result as string; // Type assertion because result can be string or ArrayBuffer
        setSelectedImg(base64Image);
        await updateProfile({ image: base64Image });
      };
    };
  return (
    <div className="flex flex-col items-center gap-4">
    <div className="relative">
      <img
        src={selectedImg || authUser?.image || "/avatar.png"}
        alt="Profile"
        className="size-32 rounded-full object-cover border-4 "
      />
      <label
        htmlFor="avatar-upload"
        className={`
          absolute bottom-0 right-0 
          bg-base-content hover:scale-105
          p-2 rounded-full cursor-pointer 
          transition-all duration-200
          ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
        `}
      >
        <Camera className="w-5 h-5 text-base-200" />
        <input
          type="file"
          id="avatar-upload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUpdatingProfile}
        />
      </label>
    </div>
    <p className="text-sm text-zinc-400">
      {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
    </p>
  </div>

  )
}

export default AvatarUploadForm