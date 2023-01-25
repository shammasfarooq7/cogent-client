import { useLocation, Navigate } from "react-router-dom";
import { getToken } from "../utils";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();

  if (!getToken()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}