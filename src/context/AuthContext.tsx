import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import { readStorage, writeStorage } from "../lib/storage";
import { demoAdmin, demoCustomer } from "../data/users";

interface AuthContextValue {
  user: User | null;
  login: (email: string, role: "customer" | "admin") => void;
  logout: () => void;
  signup: (name: string, email: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const KEY = "vm_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStorage<User | null>(KEY, null));

  useEffect(() => {
    writeStorage(KEY, user);
  }, [user]);

  const login = (email: string, role: "customer" | "admin") => {
    if (role === "admin") {
      setUser({ ...demoAdmin, email: email || demoAdmin.email });
    } else {
      setUser({ ...demoCustomer, email: email || demoCustomer.email });
    }
  };

  const signup = (name: string, email: string) => {
    setUser({ ...demoCustomer, name: name || demoCustomer.name, email: email || demoCustomer.email });
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout, signup }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
