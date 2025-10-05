import React, { useState, ReactNode } from "react";
import { ThemeContext, ThemeContextType } from "../../contexts/ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState(false);

  const contextValue: ThemeContextType = {
    darkMode,
    setDarkMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
