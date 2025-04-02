import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";

const ProtectedRoute = () => {
  const auth = useRecoilValue(authState) as { isAuthenticated: boolean };
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
