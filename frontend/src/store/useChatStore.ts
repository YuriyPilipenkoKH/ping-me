import { create } from "zustand";
import toast from "react-hot-toast";
import { User } from "../types/userTypes";
import { Message } from "../types/messageTypes";
import axios, { AxiosError } from "axios";

interface useChatStoreTypes {
  messages: Message[],
  users: User[],
  selectedUser:User | null,
  isUsersLoading: boolean,
  isMessagesLoading: boolean,
  getUsers: () => Promise<void>
  getMessages: (data: string) => Promise<void>
  setSelectedUser: (data: User) => void
  subscribeToMessages: () => void
  unsubscribeFromMessages: () => void
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
  subscribeToMessages: () => {},
  unsubscribeFromMessages: () => {},
}))
