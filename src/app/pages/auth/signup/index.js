// component import
import React from "react";
import { AuthLayout } from "../../../components/auth/Layout";
import { SignupForm } from "../../../components/auth/SignupForm";
// other imports
import { SIGN_UP, GET_STARTED } from "../../../constants";
import { getToken } from "../../../utils";
import { Navigate } from "react-router-dom";

export const Signup = () => {
  if (getToken()) return <Navigate to="/dashboard" replace />
  return (<SignupForm />)
}