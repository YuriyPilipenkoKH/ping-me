import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { Camera, } from "lucide-react";
import { cn } from "../../lib/cn";


const AvatarUploadForm = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] =  useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null); 
    console.log(authUser);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; // Use optional chaining to handle null or undefined
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error("File size exceeds the limit of 5MB.");
        return;
      }
      setFile(file)

    }

  return (

    <>
        <img
          src={selectedImg || authUser?.image || "/avatar.png"}
          alt="Profile"
          className="size-32 rounded-full object-cover border-4 "
        />
      <form className="relative">
        <label
          htmlFor="avatar-upload"
          className={cn('absolute bottom-0 right-0 bg-base-content hover:scale-105  p-2 rounded-full cursor-pointer transition-all duration-200',
            isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
          )}       
          >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept=".png, .jpg, .jpeg, .webp"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
      </form>
    </>
  )
}

export default AvatarUploadForm