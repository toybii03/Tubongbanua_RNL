import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PotectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default PotectedRoute;
