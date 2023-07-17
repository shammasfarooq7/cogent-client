// component import
import React from "react";
import { SignupForm } from "../../../components/auth/SignupForm";
// other imports
import { getToken } from "../../../utils";
import { Navigate } from "react-router-dom";

export const Signup = () => {
  if (getToken()) return <Navigate to="/dashboard" replace />
  return (<SignupForm />)
}