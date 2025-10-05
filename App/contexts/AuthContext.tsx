import { createContext, useState } from "react";
import type { Employee } from "@/types/openapi";
import { client } from "@/backend/Server";


interface AuthContextType {
  user: Employee | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Employee | null>(null);

  const login = (username: string, password: string) => {
    client.then(async (c) => {
      c.login(null, { username, password }).then(response => {
        if (response.status === 401) {
          alert("Invalid credentials");
          return;
        }
        setUser(response.data);
      });
    });
  }

  const logout = () => {
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
