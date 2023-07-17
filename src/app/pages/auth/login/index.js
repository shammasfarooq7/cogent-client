// component import
import React from "react";
import { LoginForm } from "../../../components/auth/LoginForm";
// other imports
import { getToken } from "../../../utils";
import { Navigate } from "react-router-dom";

export const Login = () => {

    if (getToken()) return <Navigate to="/dashboard" replace />

    return (<LoginForm />)
}