import { create } from "zustand";
import { Theme } from "../constants";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme: Theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));