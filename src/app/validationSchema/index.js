import * as yup from "yup";
import { INVALID_EMAIL, phoneReg } from "../constants";
import { requiredMessage } from "../utils";
import { isValidPhoneNumber } from "react-phone-number-input";

function paymentMethodValidation(name, value, parentThis) {
  const fields = ['accountType', 'accountTitle', 'beneficiaryFirstName', 'beneficiaryMiddleName', 'beneficiaryLastName', 'beneficiaryAddress', 'sortCode', 'accountNumber', 'iban', 'swiftCode', 'branchName', 'bankAddress', 'bankName'];
  const anyOtherFieldHasValue = fields.filter(field => field !== name)?.some((key) => parentThis.parent[key]?.trim());
  if (anyOtherFieldHasValue) {
    if (!value) return false
    return yup.string().required().validateSync(value)
  }
  return true;
};

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
  email: yup.string().email("Invalid Email").required(requiredMessage("Email"))
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
  beneficiaryFirstName: yup.string().test(
    'beneficiaryFirstName-required',
    'Beneficiary First Name is required.',
    function (value) {
      const parentThis = this;
      return paymentMethodValidation("beneficiaryFirstName", value, parentThis)
    }
  )
};

const beneficiaryLastNameValidationSchema = {
  beneficiaryLastName: yup.string().test(
    'beneficiaryLastName-required',
    'Beneficiary First Name is required.',
    function (value) {
      const parentThis = this;
      return paymentMethodValidation("beneficiaryLastName", value, parentThis)
    }
  )
};

const beneficiaryMiddleNameValidationSchema = {
  beneficiaryMiddleName: yup.string(),
}

const beneficiaryAddressValidationSchema = {
  beneficiaryAddress: yup.string(),
}


const accountTitleValidationSchema = {
  accountTitle: yup.string().test(
    'account-title-required',
    'Account Title is required.',
    function (value) {
      const parentThis = this;
      return paymentMethodValidation("accountTitle", value, parentThis)
    }
  )
};

const accountTypeValidationSchema = {
  accountType: yup.string().test(
    'accountType-required',
    'Account Type is required.',
    function (value) {
      const parentThis = this;
      return paymentMethodValidation("accountType", value, parentThis)
    }
  )
};

const accountNumberValidationSchema = {
  accountNumber: yup.string().test(
    'accountNumber-required',
    'Account Number is required.',
    function (value) {
      const parentThis = this;
      return paymentMethodValidation("accountNumber", value, parentThis)
    }
  )
};

const ibanValidationSchema = {
  iban: yup.string().test(
    'iban-required',
    'Iban is required.',
    function (value) {
      const parentThis = this;
      return paymentMethodValidation("iban", value, parentThis)
    }
  )
};

const swiftCodeValidationSchema = {
  swiftCode: yup.string().test(
    'swiftCode-required',
    'Swift Code is required.',
    function (value) {
      const parentThis = this;
      return paymentMethodValidation("swiftCode", value, parentThis)
    }
  )
};

const bankNameValidationSchema = {
  bankName: yup.string().test(
    'bankName-required',
    'Bank Name is required.',
    function (value) {
      const parentThis = this;
      return paymentMethodValidation("bankName", value, parentThis)
    }
  )
};

const branchNameValidationSchema = {
  branchName: yup.string(),
}

const bankAddressValidationSchema = {
  bankAddress: yup.string(),
}

const isOnboardedValidationSchema = {
  isOnboarded: yup.boolean().required(requiredMessage("isOnboarded")),
}

const phoneNumberValidationSchema = {
  mobileNumber: yup.string().matches(phoneReg, 'Phone number is not valid').required(requiredMessage("Phone Number")),
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
  ...accountTypeValidationSchema,
  ...firstNameValidationSchema,
  ...lastNameValidationSchema,
  rpocName: yup.string().when('status', {
    is: 'INDIRECT',
    then: yup.string().required('RPOC Name is required'),
    otherwise: yup.string().optional()
  }),
  rpocEmail: yup.string().when('status', {
    is: 'INDIRECT',
    then: yup.string().email(INVALID_EMAIL).required('RPOC Email is required'),
    otherwise: yup.string().email(INVALID_EMAIL)
  }),
  rpocContactNumber: yup.string().when('status', {
    is: 'INDIRECT',
    then: yup.string().required('RPOC Contact Number is required').test('valid-rpoc-number', 'RPOC Contact Number is Invalid', function (value) {
      if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false
      return true
    }),
    otherwise: yup.string().test('valid-rpoc-number', 'RPOC Contact Number is Invalid', function (value) {
      if (!value) return true
      if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false
      return true
    })
  }),
  taxNumber: yup.string().required("Tax Number is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("First Name is required"),
  nationality: yup.string().required("Nationality is required"),
  country: yup.string().required("Country is required"),
  mobileNumber: yup.string().required('Mobile Number is required').test('valid-mobile-number', 'Mobile Number is Invalid', function (value) {
    if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false  // this whole validation for required phone number
    return true
  }),
  contactNo: yup.string().test('valid-contact-number', 'Contact Number is Invalid', function (value) {
    if (!value) return true
    if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false   // this whole validation for optional phone number
    return true
  }),
  whatsappNo: yup.string().test('valid-whatsappNo', 'WhatsApp Number is Invalid', function (value) {
    if (!value) return true
    if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false   // this whole validation for optional phone number
    return true
  }),
  addressLine1: yup.string().required("Address is required."),
  workPermitStatus: yup.string().required("Work Permit Status is required."),
  resumeDocUrl: yup.string().optional(),
  identityDocUrl: yup.string().optional(),
  myResume: yup.mixed().test(
    'is-file',
    'Resume file is required',
    function (value) {
      if (this.parent.resumeDocUrl) return true;
      return value && ['application/pdf', 'image/jpg'].includes(value?.type);
    }
  ),
  transport: yup.string().required("Mode of transport is required."),
  availability: yup.string().required("Availability of transport is required."),
  // mobility: yup.number().typeError("Only Numbers are allowed").required("Mobility is required.")
  mobility: yup.string().required("Mobility is required."),
  idCardType: yup.string().required("Id Card Type is required."),
  identityDocument: yup.mixed().test(
    'is-file',
    'Identity file is required',
    function (value) {
      if (this.parent.identityDocUrl) return true;
      return value && ['application/pdf', 'image/jpg'].includes(value?.type);
    }
  ),
  contractDocuments: yup.boolean().required(requiredMessage("Contract Document")),
  interviewStatus: yup.string().required("Interview Status is required."),
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
