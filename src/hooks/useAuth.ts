import { useContext } from "react";
import { authContext } from "../context/AuthContext";

export function useAuth() {
  const value = useContext(authContext);
  return value;
}
