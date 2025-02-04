import { create } from "zustand";
import toast from "react-hot-toast";
import { User } from "../types/userTypes";
import { del, img, Message, MessageInput, txt } from "../types/messageTypes";
import  { AxiosError } from "axios";
import { axios } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


interface useChatStoreTypes {
  messages: Message[]
  users: User[],
  selectedUser:User | null
  isUsersLoading: boolean
  isMessagesLoading: boolean
  isMessageSending: boolean
  getUsers: () => Promise<void>
  getMessages: (data: string) => Promise<void>
  setSelectedUser: (data: User | null) => void
  subscribeToMessages: () => void
  unsubscribeFromMessages: () => void
  sendMessage:  (data: MessageInput) => Promise<void>
  sendImage:  (data: img) => Promise<void>
  sendText:  (data: txt) => Promise<void>
  deleteMessage:  (data: del) => Promise<void>
  subscribeToDelete: () => void
  unsubscribeFromDelete: () => void
}

export const useChatStore = create<useChatStoreTypes>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isMessageSending: false,
  getUsers: async () => {
    set({ isUsersLoading: true })
    try {
      const res = await axios.get('/messages/users')
      set({ users: res.data });

    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
   } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage) => {
      console.log('senderId',newMessage.senderId);
      console.log('selectedUser._id',selectedUser._id)

      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      console.log(isMessageSentFromSelectedUser);
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
  sendMessage: async (data) => {
    set({ isMessageSending:true })
    const { selectedUser, messages } = get();
    try {
      const formData = new FormData();
      formData.append('file', data.image);
      if(data.text){
        formData.append('text', data?.text);
      }
      const res =
       await axios.post(`/messages/send-message/${selectedUser?._id}`, 
        formData,
        { headers: { "Content-Type": "multipart/form-data", },});
      if(res.data){
        set({ messages: [...messages, res.data] });
       }
      } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
    }}
    finally{
      set({ isMessageSending:false })
    }
  },
  sendImage: async  (data) => {
    set({ isMessageSending:true })
    const { selectedUser, messages } = get();
    try {
      const formData = new FormData();
      formData.append('file', data.image);
      const res =
       await axios.post(`/messages/upload-pic/${selectedUser?._id}`, 
        formData,
        { headers: { "Content-Type": "multipart/form-data", },});
      if(res.data){
        set({ messages: [...messages, res.data] });
       }
      } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
    }}
    finally{
      set({ isMessageSending:false })
    }
  },
  sendText:async  (data) => {
    set({ isMessageSending:true })
    const { selectedUser, messages } = get();
    try {

      const res = 
      await axios.post(`/messages/send/${selectedUser?._id}`,
        data);
      if(res.data){
         set({ messages: [...messages, res.data] });
        }

    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
  }}
  finally{
    set({ isMessageSending:false })
  }
  },
  deleteMessage: async (data) => {
    const {messageId} = data

    set({ isMessageSending:true })
      try {
      await axios.delete(`/messages/delete`,{data});
      // Update the messages state by filtering out the deleted message
      set({
        messages: get().messages.filter((message) => message._id !== messageId),
      });
      // toast.success("Message deleted");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
    }
  }
  finally{
    set({ isMessageSending:false })
  }
  },
  subscribeToDelete: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("messageDeleted", (data) => {
      const {messageId,  senderId} = data
    // console.log('messageId',messageId);
    // console.log('senderId',receiverId);

    const isMessageSentFromSelectedUser = senderId === selectedUser._id;
 
    if (!isMessageSentFromSelectedUser) return;
   
      set({
        messages: get().messages.filter((message) => message._id !== messageId),
      });
    });
  },
  unsubscribeFromDelete: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("messageDeleted");
  }
}))
