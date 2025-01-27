import { create } from "zustand";
import toast from "react-hot-toast";
import { User } from "../types/userTypes";
import { Message, MessageInput } from "../types/messageTypes";
import  { AxiosError } from "axios";
import { axios } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


interface useChatStoreTypes {
  messages: Message[],
  users: User[],
  selectedUser:User | null,
  isUsersLoading: boolean,
  isMessagesLoading: boolean,
  getUsers: () => Promise<void>
  getMessages: (data: string) => Promise<void>
  setSelectedUser: (data: User | null) => void
  subscribeToMessages: () => void
  unsubscribeFromMessages: () => void
  sendMessage:  (data: MessageInput) => Promise<void>
}

export const useChatStore = create<useChatStoreTypes>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
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
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
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
  sendMessage: async (messageData) => {

    const { selectedUser, messages } = get();
    try {
      const res = await axios.post(`/messages/send/${selectedUser?._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
  }}
}
}))
