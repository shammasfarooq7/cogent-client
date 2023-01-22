// component import
import React from "react";
import { AuthLayout } from "../../../components/auth/Layout";
import { SignupForm } from "../../../components/auth/SignupForm";
// other imports
import { SIGN_UP, GET_STARTED } from "../../../constants";

export const Signup = () => (
  // <AuthLayout title={SIGN_UP} subTitle={GET_STARTED}>
    <SignupForm />
  //  </AuthLayout>
)