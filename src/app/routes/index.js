import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import { Login } from "../pages/auth/login";
import { Signup } from "../pages/auth/signup";
// other packages
import { AUTH_LINKS, ROLE, ROOT_ROUTE } from "../constants";
import { PrivateRoute } from "./PrivateRoute";
import { ResourceDetails } from "../pages/rms/ResourceDetails";
import { TicketDetails } from "../pages/serviceDesk/TicketDetails";
import { ServiceDesk } from "../pages/serviceDesk/ServiceDeskDashboard";
import { AllResource } from "../pages/rms/AllResource";
import { AllTickets } from "../pages/serviceDesk/AllTickets";
import { SDCalender } from "../pages/serviceDesk/calender/sdCalender";
import { MainLayout } from "../components/layout/main-layout";
import { FeopsDashboard } from "../pages/Feops/FeopsDashboard";
import { FeopsTicket } from "../pages/Feops/FeopsTickets";
import { FeopsAllTickets } from "../pages/Feops/FeopsAlltickets";
import { FeopsAssignResource } from "../pages/Feops/FeopsAssignResource";
import { FeopsFteTicket } from "../pages/Feops/FeopsFteTicket";
import { FeopsInvoiceApproval } from "../pages/Feops/InvoiceApproval";
import { AccountDashboard } from "../pages/Accounts/AccountDashboard";
import { AccountInvoice } from "../pages/Accounts/AccountInvoice";
import { ResourcesDashboard } from "../pages/Resource/ResourcesDashboard";
import { ResourceDashboard } from "../pages/rms/ResourceDashboard";
import { ResourceCalender } from "../pages/Resource/ResourceCalendar";
import { ResourceFseTicket } from "../pages/Resource/ResourceFseTicket";
import { ResourceFteTicket } from "../pages/Resource/ResourceFteTicket";
import { ResourceProfile } from "../pages/Resource/ResourceProfile";
import { ResourceOpportunity } from "../pages/Resource/ResourceOportunity";
import { CustomerDashboard } from "../pages/Customer/CustomerDashboard";
import { CustomerFseTicket } from "../pages/Customer/CustomerFseTicket";
import { CustomerFteTicket } from "../pages/Customer/CustomerFteTicket";
import { CustomerOportunity } from "../pages/Customer/CustomerCreateOportunity";
import { CustomerViewOpportunity } from "../pages/Customer/CustomerViewOpportunity";
import { CustomerFormDetails } from "../pages/Customer/CustomerDetailsForm";
import { CustomerProfile } from "../pages/Customer/CustomerProfile";
import { CustomerInvoice } from "../pages/Customer/CustomerInvoice";
import { CreateUser } from "../pages/Admin/User/CreateUser";
import { UserListing } from "../pages/Admin/User/UserListing";
import { UserView } from "../pages/Admin/User/UserView";
import { CustomerView } from "../pages/Admin/Customer/CustomerView";
import { CustomerListing } from "../pages/Admin/Customer/CustomerListing";
import { ProjectListing } from "../pages/Admin/Project/ProjectListing";
import { ProjectView } from "../pages/Admin/Project/ProjectView";
import { JobsListing } from "../pages/Admin/Jobs/JobsListing";
import { JobsView } from "../pages/Admin/Jobs/JobsView";
import { TicketsListing } from "../pages/Admin/Tickets/TicketsListing";
import { TicketView } from "../pages/Admin/Tickets/TicketView";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path={ROOT_ROUTE} element={
            <PrivateRoute roles={[ROLE.RMS]}>
              <ResourceDashboard />
            </PrivateRoute>
          } />
          <Route path={"/dashboard"} element={
            <PrivateRoute roles={[ROLE.RMS]}>
              <ResourceDashboard />
            </PrivateRoute>
          } />
          <Route path={"/service-desk"} element={
            <PrivateRoute roles={[ROLE.SD]}>
              <ServiceDesk />
            </PrivateRoute>
          } />
          <Route path={"/resource-details"} element={
            <PrivateRoute roles={[ROLE.RMS, ROLE.RESOURCE]}>
              <ResourceDetails />
               </PrivateRoute>
          } />
           <Route path={"/ticket-details"} element={
            <PrivateRoute roles={[ROLE.SD]}>
              <TicketDetails />
            </PrivateRoute>
          } />
          <Route path={"/sd-calender"} element={
            <PrivateRoute roles={[ROLE.SD]}>
              <SDCalender />
            </PrivateRoute>
          } />
          <Route path={"/all-resource"} element={
            <PrivateRoute roles={[ROLE.RMS]}>
              <AllResource />
            </PrivateRoute>
          } />
           <Route path={"/service-desk-tickets"} element={
            <PrivateRoute roles={[ROLE.SD]}>
              <AllTickets />
            </PrivateRoute>
          } />
            <Route path={"/feops-command-center"} element={
            <PrivateRoute roles={[ROLE.FEOPS]}>
              <FeopsDashboard />
            </PrivateRoute>
          } />
          <Route path={"/feops-ticket"} element={
            <PrivateRoute roles={[ROLE.FEOPS]}>
              <FeopsTicket />
            </PrivateRoute>
          } />
           <Route path={"/feops-all-tickets"} element={
            <PrivateRoute roles={[ROLE.FEOPS]}>
              <FeopsAllTickets />
            </PrivateRoute>
          } />
            <Route path={"/feops-assign-resource"} element={
            <PrivateRoute roles={[ROLE.FEOPS]}>
              <FeopsAssignResource />
             </PrivateRoute>
          } />
           <Route path={"/feops-fte-ticket"} element={
            <PrivateRoute roles={[ROLE.FEOPS]}>
              <FeopsFteTicket />
            </PrivateRoute>
          } />
            <Route path={"/feops-invoice-approval"} element={
            <PrivateRoute roles={[ROLE.FEOPS]}>
              <FeopsInvoiceApproval />
            </PrivateRoute>
          } />
           <Route path={"/account-dashboard"} element={
            <PrivateRoute roles={[ROLE]}>
              <AccountDashboard />
            </PrivateRoute>
          } />
            <Route path={"/account-invoice"} element={
            <PrivateRoute roles={[ROLE]}>
              <AccountInvoice />
            </PrivateRoute>
          } />
             <Route path={"/resources-dashboard"} element={
            // <PrivateRoute roles={[ROLE.RESOURCE]}>
              <ResourcesDashboard />
            // </PrivateRoute>
          } />
            <Route path={"/resources-calendar"} element={
            <PrivateRoute roles={[ROLE.RESOURCE]}>
              <ResourceCalender />
            </PrivateRoute>
          } />
             <Route path={"/resources-fse-ticket"} element={
            <PrivateRoute roles={[ROLE.RESOURCE]}>
              <ResourceFseTicket />
            </PrivateRoute>
          } />
            <Route path={"/resources-fte-ticket"} element={
            <PrivateRoute roles={[ROLE.RESOURCE]}>
              <ResourceFteTicket />
            </PrivateRoute>
          } />
           <Route path={"/resources-fte-ticket"} element={
            <PrivateRoute roles={[ROLE.RESOURCE]}>
              <ResourceFteTicket />
            </PrivateRoute>
          } />
                     <Route path={"/resources-profile"} element={
            <PrivateRoute roles={[ROLE.RESOURCE]}>
              <ResourceProfile />
            </PrivateRoute>
          } />
                     <Route path={"/resources-oportunity"} element={
            <PrivateRoute roles={[ROLE.RESOURCE]}>
              <ResourceOpportunity />
            </PrivateRoute>
          } />
           <Route path={"/customer-dashboard"} element={
              <PrivateRoute roles={[ROLE.CUSTOMER]}>
                <CustomerDashboard />
              </PrivateRoute>
            } />
            <Route path={"/customer-fse-ticket"} element={
              <PrivateRoute roles={[ROLE.CUSTOMER]}>
                <CustomerFseTicket />
              </PrivateRoute>
            } />
             <Route path={"/customer-fte-ticket"} element={
              <PrivateRoute roles={[ROLE.CUSTOMER]}>
                <CustomerFteTicket />
              </PrivateRoute>
            } />
             <Route path={"/customer-opportunity"} element={
              <PrivateRoute roles={[ROLE.CUSTOMER]}>
                <CustomerOportunity />
              </PrivateRoute>
            } />
             <Route path={"/customer-view-opportunity"} element={
              <PrivateRoute roles={[ROLE.CUSTOMER]}>
                <CustomerViewOpportunity />
              </PrivateRoute>
            } />
            <Route path={"/customer-details"} element={
              <PrivateRoute roles={[ROLE.CUSTOMER]}>
                <CustomerFormDetails />
              </PrivateRoute>
            } />
                        <Route path={"/customer-profile"} element={
              <PrivateRoute roles={[ROLE.CUSTOMER]}>
                <CustomerProfile />
              </PrivateRoute>
            } />
                    <Route path={"/customer-invoice"} element={
              <PrivateRoute roles={[ROLE.CUSTOMER]}>
                <CustomerInvoice />
              </PrivateRoute>
            } />
              <Route path={"/admin/user"} element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <UserListing />
               </PrivateRoute>
            } />
             <Route path={"/admin/userview"} element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <UserView />
               </PrivateRoute>
            } />
             <Route path={"/admin/customer"} element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <CustomerListing />
               </PrivateRoute>
            } />
                <Route path={"/admin/customerview/:id"} element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <CustomerView />
               </PrivateRoute>
            } />
              <Route path={"/admin/project"} element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <ProjectListing />
               </PrivateRoute>
            } />
                <Route path={"/admin/projectview/:id"} element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <ProjectView />
               </PrivateRoute>
            } />
             <Route path={"/admin/job"} element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <JobsListing />
               </PrivateRoute>
            } />
                <Route path={"/admin/jobview/:id"} element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <JobsView />
               </PrivateRoute>
            } />
                <Route path={"/admin/ticket"} element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <TicketsListing />
               </PrivateRoute>
            } />
                <Route path={"/admin/ticketview/:id"} element={
              <PrivateRoute roles={[ROLE.ADMIN]}>
                <TicketView />
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