import  { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { formatMessageTime } from '../../lib/formatMessageTime';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import MainModal from '../modals/MainModal';
import { DeletingMessageConfirmProps } from '../../data/modalProps';
// import Menu from '../modals/Menu';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,  
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    subscribeToDelete,
    unsubscribeFromDelete
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [messageId, setMessageId] = useState<string>('')


  useEffect(() => {
    getMessages(selectedUser?._id || "");
    subscribeToMessages();
    subscribeToDelete();
    return () => {
      unsubscribeFromMessages()
      unsubscribeFromDelete()
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages, subscribeToDelete]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent the default context menu from appearing
    // Retrieve the ID of the div
    const divId = e.currentTarget.id;

    // Find the image element inside the clicked div
    const imgElement = e.currentTarget.querySelector("img");
    // Get the `src` of the image, if it exists
    const imgSrc = imgElement ? imgElement.src : null;

    console.log("DivID:", divId);
    console.log("ImageSrc:", imgSrc);

    setShowMenu(!showMenu)
    setMessageId(divId)


    const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
    if (modal) modal.showModal();
 
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat relative ${message.senderId === authUser?._id 
              ? "chat-end" 
               : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser?.image || "/avatar.png"
                      : selectedUser?.image || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div 
              className="chat-bubble flex flex-col relative"
              onContextMenu={(e) => handleRightClick(e)}
              id={message._id}>
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            {/* {showMenu && <Menu/>} */}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
      <MainModal 
      modalProps={DeletingMessageConfirmProps}
      messageId={messageId}
      receiverId={selectedUser?._id}/>
      {/* <Menu/> */}
    </div>
  );
}

export default ChatContainer