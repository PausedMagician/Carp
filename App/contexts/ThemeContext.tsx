import { createContext } from "react";

export interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

// Default values
export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () => {},
});
