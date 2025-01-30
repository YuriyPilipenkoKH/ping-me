import React ,{ useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, sendText, isMessageSending } = useChatStore();


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file?.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
    if (file.size > 5 * 1024 * 1024) { 
      toast.error("File size exceeds the limit of 5MB.");
      return;
    }
    setFile(file)
    setImagePreview(URL.createObjectURL(file));
      
      // const reader = new FileReader();
      // reader.onloadend = () => {
        // setImagePreview(reader.result);
      // };
      // reader.readAsDataURL(file);

  };

  const removeImage = () => {
    setImagePreview(null);
    setFile(undefined)
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      
      if (file) {
       await sendMessage({  
        image: file,
        text: text.trim() 
      })
      }
      if (text && !file) {
        await sendText({   
          text: text.trim() ,
        });
      }
      // Clear form
      setText("")
      setImagePreview(null);
      setFile(undefined)
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="MessageInput p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={typeof imagePreview === "string" 
                ? imagePreview
                : undefined}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isMessageSending }
          />
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            disabled={isMessageSending }
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview 
                      ? "text-emerald-500" 
                      : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;