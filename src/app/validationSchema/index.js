import * as yup from "yup";
import { INVALID_EMAIL, phoneReg } from "../constants";
import { requiredMessage } from "../utils";

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

const firstNameValidationSchema = {
  firstName: yup.string().required(requiredMessage("Email"))
}

const lastNameValidationSchema = {
  lastName: yup.string().required(requiredMessage("Email"))
}


const rpocEmailValidationSchema = {
  email: yup.string().required(requiredMessage("Email"))
}

const cogentEmailValidationSchema = {
  cogentEmail: yup.string().email("Invalid Email")
}

const statusValidationSchema = {
  status: yup.string().required(requiredMessage("Status")),
}

const engagementTypeValidationSchema = {
  engagementType: yup.string().required(requiredMessage("engagementType")),
}

const languagesValidationSchema = {
  // languages: yup.string().required(requiredMessage("languages")),
  languages: yup.array().nullable()
    .required('Languages is required')
    .min(1, "At least one language is required").of(
      yup.object().shape({
        value: yup.string().required('Language is Required'),
        label: yup.string().required()
      })
    )
}

const skillSetValidationSchema = {
  // skillSet: yup.string().required(requiredMessage("skillSet")),
  skillSet: yup.array().nullable()
    .required('SkillSet is required')
    .min(1, "At least one skillSet is required").of(
      yup.object().shape({
        value: yup.string().required('skillSet is Required'),
        label: yup.string().required()
      })
    )
}

const availableToolsValidationSchema = {
  // availableTools: yup.string().required(requiredMessage("availableTools")),
  availableTools: yup.array().nullable()
    .required('Available Tool is is required')
    .min(1, "At least one availableTool is required").of(
      yup.object().shape({
        value: yup.string().required('availableTool is Required'),
        label: yup.string().required()
      })
    )
}

const beneficiaryFirstNameValidationSchema = {
  beneficiaryFirstName: yup.string().required(requiredMessage("beneficiaryFirstName")),
}

const beneficiaryLastNameValidationSchema = {
  beneficiaryLastName: yup.string().required(requiredMessage("beneficiaryLastName")),
}

const beneficiaryMiddleNameValidationSchema = {
  beneficiaryMiddleName: yup.string().required(requiredMessage("beneficiaryMiddleName")),
}

const beneficiaryAddressValidationSchema = {
  beneficiaryAddress: yup.string().required(requiredMessage("beneficiaryAddress")),
}


const accountTitleValidationSchema = {
  accountTitle: yup.string().required(requiredMessage("Account Title is required")),
}

const accountNumberValidationSchema = {
  accountNumber: yup.string().required(requiredMessage("accountNumber")),
}

const ibanValidationSchema = {
  iban: yup.string().required(requiredMessage("iban")),
}

const swiftCodeValidationSchema = {
  swiftCode: yup.string().required(requiredMessage("swiftCode")),
}

const bankNameValidationSchema = {
  bankName: yup.string().required(requiredMessage("bankName")),
}

const branchNameValidationSchema = {
  branchName: yup.string().required(requiredMessage("branchName")),
}

const bankAddressValidationSchema = {
  bankAddress: yup.string().required(requiredMessage("bankAddress")),
}

const isOnboardedValidationSchema = {
  isOnboarded: yup.boolean().required(requiredMessage("isOnboarded")),
}

const phoneNumberValidationSchema = {
  phoneNumber: yup.string().matches(phoneReg, 'Phone number is not valid').required(requiredMessage("Phone Number")),
}

export const resourceFormValidationSchema = yup.object({
  // ...emailValidationSchema,
  ...isOnboardedValidationSchema,
  ...statusValidationSchema,
  ...engagementTypeValidationSchema,
  ...skillSetValidationSchema,
  ...availableToolsValidationSchema,
  ...languagesValidationSchema,
  ...beneficiaryFirstNameValidationSchema,
  ...beneficiaryMiddleNameValidationSchema,
  ...beneficiaryLastNameValidationSchema,
  ...beneficiaryAddressValidationSchema,
  ...accountNumberValidationSchema,
  ...ibanValidationSchema,
  ...swiftCodeValidationSchema,
  ...bankAddressValidationSchema,
  ...branchNameValidationSchema,
  ...bankNameValidationSchema,
  ...cogentEmailValidationSchema,
  ...rpocEmailValidationSchema,
  ...accountTitleValidationSchema,
  ...firstNameValidationSchema,
  ...lastNameValidationSchema
})

export const loginValidationSchema = yup.object({
  ...emailValidationSchema,
  ...passwordValidationSchema
});

export const signUpValidationSchema = yup.object({
  ...rpocEmailValidationSchema,
  ...passwordValidationSchema,
  ...confirmPasswordValidationSchema,
  ...phoneNumberValidationSchema
})
