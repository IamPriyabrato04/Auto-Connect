import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const {token, isAuthenticated, logout} = useAuthStore();
  // Check if the user is authenticated
  useEffect(() => {
    if (!token || !isAuthenticated) {
      logout();
      navigate("/auth", { replace: true });
    }
   }, [token, isAuthenticated]);

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;