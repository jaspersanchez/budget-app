import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// throw if used outside provider — catches mistakes early
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
