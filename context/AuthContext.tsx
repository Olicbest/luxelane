"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  } catch (error) {
    console.error("Failed to load user:", error);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return;
    }

    localStorage.removeItem("user");
  }, [user]);

  const login = (email: string, password: string) => {
    void password;

    const stored = localStorage.getItem("user");
    if (!stored) {
      alert("No user found. Please register.");
      return;
    }

    const parsed = JSON.parse(stored) as User;

    if (parsed.email === email) {
      setUser(parsed);
    } else {
      alert("Invalid credentials");
    }
  };

  const register = (name: string, email: string, password: string) => {
    void password;

    const newUser = { name, email };
    setUser(newUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
