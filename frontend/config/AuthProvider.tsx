"use client";
import { IProfile } from "@/entities/profile";
import { fetchUser } from "@/features/auth/model/fetch-user";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: IProfile) => void;
  logout: () => void;
  profile: IProfile | null;
  setProfile: Dispatch<SetStateAction<IProfile | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await fetchUser();
        setIsAuthenticated(true);
        setProfile(userData);
      } catch (error) {
        console.error("User is not authenticated:", error);
      }
    };

    checkAuth();
  }, []);

  const login = (user: IProfile) => {
    setIsAuthenticated(true);
    setProfile(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setProfile(null);
    localStorage.removeItem("token"); // Видаляємо токен
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, profile, setProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
