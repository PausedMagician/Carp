import { createContext, useState } from "react";
import type { Employee } from "@/types/openapi";
import { client } from "@/backend/Server";

export type User = Employee;

// UNTIL WE GET AN IMPLEMENTATION TO THE BACKEND
const users: User[] = [
    {
        username: "Chad",
        password: "Paine",
        email: "chad@paine.com",
        department: "IT",
        personal_details: {
            first_name: "Chad",
            last_name: "Paine",
            birthday: "1990-04-20",
        },
    }
];

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    client.then(async (c) => {
      c.login(null, { username, password }).then(response => {
        setUser(response.data);
      });
    });
  }

  const logout = () => {
    setUser(null);
  }

  const contextValue: AuthContextType = {
    user: user,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}