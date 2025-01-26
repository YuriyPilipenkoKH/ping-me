import { create } from "zustand";
import toast from "react-hot-toast";
import { User } from "../types/userTypes";
import { Message } from "../types/messageTypes";

interface useChatStoreTypes {
  messages: Message[],
  users: User[],
  selectedUser:User | null,
  isUsersLoading: boolean,
  isMessagesLoading: boolean,
}

export const useChatStore = create<useChatStoreTypes>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
}));