import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { StyleSheet } from "react-native";

export function useThemedStyles<T>(styles: (darkMode: boolean) => T): T {
  const { darkMode } = useContext(ThemeContext);
  return styles(darkMode);
}
