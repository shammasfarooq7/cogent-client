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
  firstName: yup.string().required(requiredMessage("First Name"))
}

const lastNameValidationSchema = {
  lastName: yup.string().required(requiredMessage("Last Name"))
}


const rpocEmailValidationSchema = {
  email: yup.string().email("Invalid Email").required(requiredMessage("Email"))
}

const cogentEmailValidationSchema = {
  cogentEmail: yup.string().email("Invalid Email").nullable()
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

const contractStatusSchema = {
  isOnboarded: yup.boolean().required(requiredMessage("isOnboarded")),
  contractDocuments: yup.boolean().required(requiredMessage("Contract Document")).nullable(),
  interviewStatus: yup.string().required("Interview Status is required.").nullable(),
}

const rpocSchema = {

  rpocName: yup.string().nullable().when('status', {
    is: 'INDIRECT',
    then: yup.string().required('RPOC Name is required').nullable(),
    otherwise: yup.string().optional().nullable()
  }),
  rpocEmail: yup.string().nullable().when('status', {
    is: 'INDIRECT',
    then: yup.string().email(INVALID_EMAIL).required('RPOC Email is required').nullable(),
    otherwise: yup.string().email(INVALID_EMAIL).nullable()
  }),
  rpocContactNumber: yup.string().nullable().when('status', {
    is: 'INDIRECT',
    then: yup.string().required('RPOC Contact Number is required').nullable().test('valid-rpoc-number', 'RPOC Contact Number is Invalid', function (value) {
      if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false
      return true
    }),
    otherwise: yup.string().nullable().test('valid-rpoc-number', 'RPOC Contact Number is Invalid', function (value) {
      if (!value) return true
      if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false
      return true
    })
  }),

}

const phoneNumberValidationSchema = {
  mobileNumber: yup.string().matches(phoneReg, 'Phone number is not valid').required(requiredMessage("Phone Number")),
}

const rmsResourceFormRemainingFields = {
  ...rpocSchema,
  ...contractStatusSchema,
  ...cogentEmailValidationSchema,
}

const resourceFormCommonValidation = {
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
  ...rpocEmailValidationSchema,
  ...accountTitleValidationSchema,
  ...accountTypeValidationSchema,
  ...firstNameValidationSchema,
  ...lastNameValidationSchema,
  taxNumber: yup.string().required("Tax Number is required").nullable(),
  firstName: yup.string().required("First Name is required").nullable(),
  lastName: yup.string().required("First Name is required").nullable(),
  nationality: yup.string().required("Nationality is required").nullable(),
  country: yup.string().required("Country is required").nullable(),
  mobileNumber: yup.string().nullable().required('Mobile Number is required').nullable().test('valid-mobile-number', 'Mobile Number is Invalid', function (value) {
    if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false  // this whole validation for required phone number
    return true
  }),
  contactNumber: yup.string().nullable().test('valid-contact-number', 'Contact Number is Invalid', function (value) {
    if (!value) return true
    if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false   // this whole validation for optional phone number
    return true
  }),
  whatsappNumber: yup.string().nullable().test('valid-whatsappNo', 'WhatsApp Number is Invalid', function (value) {
    if (!value) return true
    if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false   // this whole validation for optional phone number
    return true
  }),
  addressLine1: yup.string().required("Address is required.").nullable(),
  addressLine2: yup.string().nullable().optional(),
  workPermitStatus: yup.string().required("Work Permit Status is required.").nullable(),
  resumeDocUrl: yup.string().nullable().optional(),
  identityDocUrl: yup.string().nullable().optional(),
  myResume: yup.mixed().test(
    'is-file',
    'Resume file is required',
    function (value) {
      if (this.parent.resumeDocUrl) return true;
      return value && ['application/pdf', 'image/jpg', "image/jpeg"].includes(value?.type);
    }
  ),
  transport: yup.string().required("Mode of transport is required.").nullable(),
  availability: yup.string().required("Availability of transport is required.").nullable(),
  // mobility: yup.number().typeError("Only Numbers are allowed").required("Mobility is required.")
  mobility: yup.string().required("Mobility is required.").nullable(),
  idCardType: yup.string().required("Id Card Type is required.").nullable(),
  identityDocument: yup.mixed().test(
    'is-file',
    'Identity file is required',
    function (value) {
      if (this.parent.identityDocUrl) return true;
      return value && ['application/pdf', 'image/jpg', "image/jpeg"].includes(value?.type);
    }
  ),
}

export const getResourceFormValidationSchema = (role) => {

  if (role === "rms") {
    return yup.object({
      ...resourceFormCommonValidation,
      ...rmsResourceFormRemainingFields
    })
  }
  else if (role === "resource") {
    return yup.object({
      ...resourceFormCommonValidation,
    })
  }
}


export const loginValidationSchema = yup.object({
  ...emailValidationSchema,
  ...passwordValidationSchema
});

export const signUpValidationSchema = yup.object({
  ...rpocEmailValidationSchema,
  ...passwordValidationSchema,
  ...confirmPasswordValidationSchema,
  ...firstNameValidationSchema,
  ...lastNameValidationSchema
})
