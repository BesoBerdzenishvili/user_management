import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { User } from "../types/Interfaces";

interface AuthContextValue {
  user: string;
  login: (userData: string) => Promise<void>;
  logout: () => void;
  checkUser: (user: User) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<string>("user", "");
  const navigate = useNavigate();

  const login = async (userData: string) => {
    setUser(userData);
    navigate("/");
  };

  const logout = () => {
    setUser("");
    navigate("/login", { replace: true });
  };

  const checkUser = (user: User) => {
    if (user.status === "blocked") {
      navigate("/login");
      logout();
      return false;
    }
    return true;
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      checkUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
