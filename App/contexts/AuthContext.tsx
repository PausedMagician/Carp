import { createContext, useContext, useState } from "react";

export interface User {
  username: string;
  password: string;
}

const users: User[] = [
  {username: "User", password: "Pass"}
]

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  /* TODO: Add user state here */
  const [user, setUser] = useState<User | null>(null);
  /* TODO: Create login function */
  const login = (username: string, password: string) => {
    users.forEach(user => {
      if (user.username === username && user.password === password) {
        setUser(user);
      }
    });
  }
  /* TODO: Create logout function */
  const logout = () => {
    setUser(null);
  }
  /* TODO: Create context value object */
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
