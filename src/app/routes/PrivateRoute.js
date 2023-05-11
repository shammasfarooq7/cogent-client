import { useLocation, Navigate } from "react-router-dom";
import { getToken, handleLogout } from "../utils";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../graphql/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/user-context";
import { getLandingPageRoute } from "../constants";

export const PrivateRoute = ({ children, roles = [] }) => {
  const location = useLocation();
  const { data, error } = useQuery(GET_CURRENT_USER);
  const { user, setUser } = useContext(UserContext);

  const { userRole } = user || {};

  useEffect(() => {
    if (data?.getCurrentUser && !user) {
      setUser({ ...data?.getCurrentUser, userRole: (data?.getCurrentUser?.roles?.[0]?.role || "")?.toLowerCase() })
    }
  }, [data]);

  if (error || !getToken()) {
    setUser(null);
    handleLogout();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    return <></> // To DO : Add Loader
  }

  if (!roles.includes(userRole)) {
    return <Navigate to={getLandingPageRoute(userRole)} state={{ from: location }} replace />;
  }

  return children;

}