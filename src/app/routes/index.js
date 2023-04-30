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
import { AllResource } from "../components/Dashboard/AllResource";
import { MainLayout } from "../components/layout/main-layout";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path={ROOT_ROUTE} element={
            <PrivateRoute>
              <DashboardContent />
            </PrivateRoute>
          } />
          <Route path={"/dashboard"} element={
            <PrivateRoute>
              <DashboardContent />
            </PrivateRoute>
          } />
          <Route path={"/resource-details"} element={
            <PrivateRoute>
              <ResourceDetails />
            </PrivateRoute>
          } />
          <Route path={"/all-resource"} element={
            <PrivateRoute>
              <AllResource />
            </PrivateRoute>
          } />
          {/* <Route path={ROOT_ROUTE} element={<Navigate replace to={AUTH_LINKS.LOGIN_LINK} />} /> */}
          <Route path={AUTH_LINKS.LOGIN_LINK} element={<Login />} />
          <Route path={AUTH_LINKS.SIGN_UP} element={<Signup />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default MainRoutes;