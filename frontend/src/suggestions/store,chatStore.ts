import { create } from "zustand";
import { io } from "socket.io-client";

const socket = io(
  // process.env.NEXT_PUBLIC_SOCKET_URL!
);

interface ChatState {
  messages: { id: string; text: string }[];
  deleteMessage: (id: string) => void;
  subscribeToDelete: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],

  deleteMessage: (id) => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    }));
  },

  subscribeToDelete: () => {
    socket.on("messageDeleted", ({ messageId }) => {
      get().deleteMessage(messageId);
    });
  },
}));
