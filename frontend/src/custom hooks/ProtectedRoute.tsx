import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authAtom";

const ProtectedRoute = () => {
  const isAuthenticated = useRecoilValue(authState);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
