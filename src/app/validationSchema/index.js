import * as yup from "yup";
import { INVALID_EMAIL , phoneReg} from "../constants";
import {requiredMessage } from "../utils";

const passwordValidationSchema = {
   password: yup.string().required(requiredMessage("Password")), 
}

const confirmPasswordValidationSchema = {
  confirmPassword: yup
  .string()
  .oneOf([yup.ref("password"), null], "Passwords must match")
  .required("confirm your password")
}

const emailValidationSchema = {
  email: yup.string().email(INVALID_EMAIL).required(requiredMessage("Email")),
}

const emailNotRequiredValidationSchema = {
  email: yup.string().email(INVALID_EMAIL)
}

const phoneNumberValidationSchema = {
  phoneNumber: yup.string().matches(phoneReg, 'Phone number is not valid').required(requiredMessage("Phone Number"))
}

export const loginValidationSchema = yup.object({
  ...emailValidationSchema,
  ...passwordValidationSchema
});

export const signUpValidationSchema = yup.object({
  ...emailValidationSchema,
  ...passwordValidationSchema,
  ...confirmPasswordValidationSchema,
  ...phoneNumberValidationSchema
})
