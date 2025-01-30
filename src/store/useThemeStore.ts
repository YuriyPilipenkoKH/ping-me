import { create } from "zustand";
import { Theme, THEMES } from "../constants";

interface useThemeStoreTypes {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<useThemeStoreTypes>((set) => {
  // Get the theme from localStorage and validate it
  const storedTheme = localStorage.getItem("chat-theme");
  const initialTheme: Theme = THEMES.includes(storedTheme as Theme)
    ? (storedTheme as Theme)
    : "coffee"; // Default to "coffee" if the stored theme is invalid

  return {
    theme: initialTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem("chat-theme", theme);
      set({ theme });
    },
  };
});