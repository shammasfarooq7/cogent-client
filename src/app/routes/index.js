import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// pages
import { Login } from "../pages/auth/login";
import { Signup } from "../pages/auth/signup";
// other packages
import { AUTH_LINKS, ROOT_ROUTE } from "../constants";
import { DashboardContent } from "../components/Dashboard/Dashboard";
import { PrivateRoute } from "./PrivateRoute";
import { ResourceDetails } from "../components/Dashboard/ResourceDetails";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT_ROUTE} element={
          <PrivateRoute>
            <DashboardContent />
          </PrivateRoute>
        } />
        <Route path={"/dashboard"} element={
          // <PrivateRoute>
            <DashboardContent />
          // </PrivateRoute>
        } />
         <Route path={"/resource-details"} element={
          // <PrivateRoute>
            <ResourceDetails />
          // </PrivateRoute>
        } />
        {/* <Route path={ROOT_ROUTE} element={<Navigate replace to={AUTH_LINKS.LOGIN_LINK} />} /> */}
        <Route path={AUTH_LINKS.LOGIN_LINK} element={<Login />} />
        <Route path={AUTH_LINKS.SIGN_UP} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes;