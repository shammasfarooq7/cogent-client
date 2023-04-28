// component import
import React from "react";
import { AuthLayout } from "../../../components/auth/Layout";
import { LoginForm } from "../../../components/auth/LoginForm";
// other imports
import { GET_STARTED, LOG_IN } from "../../../constants";
import { getToken } from "../../../utils";
import { Navigate } from "react-router-dom";

export const Login = () => {

    if (getToken()) return <Navigate to="/dashboard" replace />

    return (<LoginForm />)
}