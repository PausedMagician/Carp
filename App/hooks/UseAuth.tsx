import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
  /* TODO: Get context and handle undefined case */
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}