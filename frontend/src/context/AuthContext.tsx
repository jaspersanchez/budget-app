import { createContext } from "react";
import { IUser } from "../types";

interface AuthContextType {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
