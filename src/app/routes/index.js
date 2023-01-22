import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// pages
import { Login } from "../pages/auth/login";
import { Signup } from "../pages/auth/signup";
// other packages
import { AUTH_LINKS, ROOT_ROUTE } from "../constants";
import { DashboardContent } from "../components/Dashboard/Dashboard";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT_ROUTE} element={<Navigate replace to={AUTH_LINKS.LOGIN_LINK} />} />
        <Route path={AUTH_LINKS.LOGIN_LINK} element={<Login />} />
        <Route path={AUTH_LINKS.SIGN_UP} element={<Signup />} />
        <Route path="/dashboard" element={<DashboardContent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes;