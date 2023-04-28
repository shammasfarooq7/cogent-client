import { useLocation, Navigate } from "react-router-dom";
import { getToken, handleLogout } from "../utils";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../graphql/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/user-context";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { data, error } = useQuery(GET_CURRENT_USER);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (data?.getCurrentUser && !user) {
      setUser(data?.getCurrentUser)
    }
  }, [data]);

  if (error || !getToken()) {
    setUser(null);
    handleLogout();
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}