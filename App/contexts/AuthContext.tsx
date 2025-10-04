import { createContext, useContext, useState } from "react";

export interface PersonalDetails {
  first_name: string;
  last_name: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  department?: string;
  personal_details: PersonalDetails;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    // Call backend API to get all employees and find a match
    try {
      const res = await fetch("http://192.168.50.191:3000/employees");
      const employees: User[] = await res.json();

      const foundUser = employees.find(
        (u) => u.username === username && u.password === password
      );
      if (foundUser) {
        setUser(foundUser);
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Try again.");
    }
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  return (
    /* DONE-TODO: Wrap children with AuthContext.Provider */
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
