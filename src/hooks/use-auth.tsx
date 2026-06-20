import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserRole } from "@/lib/mock-data";
import { platformUsers } from "@/lib/mock-data";
import type { PlatformUser } from "@/lib/mock-data";

const AUTH_KEY = "place2invest_user";

interface AuthState {
  user: PlatformUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

function loadUser(): PlatformUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) return JSON.parse(stored) as PlatformUser;
  } catch {
    localStorage.removeItem(AUTH_KEY);
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PlatformUser | null>(loadUser);

  const login = (role: UserRole) => {
    const found = platformUsers.find(
      (u) => u.role === role && u.statut === "Actif",
    );
    if (found) {
      setUser(found);
      localStorage.setItem(AUTH_KEY, JSON.stringify(found));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
