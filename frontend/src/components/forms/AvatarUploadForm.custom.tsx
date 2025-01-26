import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { Camera, } from "lucide-react";
import { cn } from "../../lib/cn";


const AvatarUploadFormCustom = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] =  useState<string >('');
    const [file, setFile] = useState<File | null>(null); 
    console.log(authUser);
    console.log('selectedImg.cus',selectedImg);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; // Use optional chaining to handle null or undefined
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error("File size exceeds the limit of 5MB.");
        return;
      }
      setFile(file)
      setSelectedImg(URL.createObjectURL(file));

      await updateProfile({ image: file });
    }

  return (

    <div  className="flex flex-col items-center gap-4">
        <img
          src={selectedImg || authUser?.image || "/avatar.png"}
          alt="Profile image"
          className="size-32 rounded-full object-cover border-4 "
        />
      <form 
      className="relative">
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
      <p className="text-sm text-zinc-400">
      {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
    </p>
    </div>
  )
}

export default AvatarUploadFormCustom