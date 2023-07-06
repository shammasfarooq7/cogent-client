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
  lastName: yup.string().required(requiredMessage("Last name"))
}
const middleNameValidationSchema = {
  middleName: yup.string().required(requiredMessage("Last name")).nullable()
}

const roleValidationSchema = {
  roles: yup.string().required(requiredMessage("Role"))
}

export const userValidationSchema = yup.object({
  firstName: yup.string().required(requiredMessage("First Name")),
  lastName: yup.string().required(requiredMessage("Last name")),
  role: yup.string().required(requiredMessage("Role")),
  email: yup.string().email(INVALID_EMAIL).required(requiredMessage("Email")),
})

export const customerValidationSchema = yup.object({
  name: yup.string().required(requiredMessage("Name")),
  vendorReference: yup.string().required(requiredMessage("Vendor Reference")),
  website: yup.string().required(requiredMessage("Website")),
  establishYear: yup.string().required(requiredMessage("EstablishYear")),
  employeesCount: yup.string().required(requiredMessage("Employees Count")),
  dispatchGroupEmail: yup.string().required(requiredMessage("Dispatch GroupEmail")),
  city: yup.string().required(requiredMessage("City")),
  employeeCountLinkedin: yup.string().required(requiredMessage("Employee Count Linkedin")),
  phone: yup.string().required(requiredMessage("Phone")),
  country: yup.string().required(requiredMessage("Country")),
  postCode: yup.string().required(requiredMessage("Post Code")),
  linkedinUrl: yup.string().required(requiredMessage("Linkedin Url")),
  email: yup.string().required(requiredMessage("Email")),
  stateProvince: yup.string().required(requiredMessage("State Province")),
  address: yup.string().required(requiredMessage("Address")),
  annualRevenue: yup.string().required(requiredMessage("Annual Revenue")),
  revenueSoftware: yup.string().required(requiredMessage("Revenue Software")),
  revenueConsultancy: yup.string().required(requiredMessage("Revenue Consultancy")),
  revenueSupport: yup.string().required(requiredMessage("Revenue Support")),
  revenueLogistics: yup.string().required(requiredMessage("Revenue Logistics")),
  revenueOther: yup.string().required(requiredMessage("Revenue Other")),
  contactNumber: yup.string().required(requiredMessage("Contact Number")),
  addressLine1: yup.string().required(requiredMessage("Address Line1")),
  addressLine2: yup.string().required(requiredMessage("Address Line2")),
  emailId: yup.string().required(requiredMessage("Email Id")),
  mobile: yup.string().required(requiredMessage("Mobile")),
  whatsappNumber: yup.string().required(requiredMessage("Whatsapp Number")),
  whatsappGroup: yup.string().required(requiredMessage("Whatsapp Group")),
  whatsappLink: yup.string().required(requiredMessage("Whatsapp Link")),
  cogentEmailId: yup.string().required(requiredMessage("Cogent Email Id")),
  workPermitStatus: yup.string().required(requiredMessage("Work Permit Status")),
  primaryTechService: yup.string().required(requiredMessage("Primary Tech Service")),
  fieldService: yup.string().required(requiredMessage("Field Service")),
  keyCustomerSupport: yup.string().required(requiredMessage("Key Customer Support")),
  languageSupport: yup.string().required(requiredMessage("Language Support")),
  countrySupported: yup.string().required(requiredMessage("Country Supported")),
  certification: yup.string().required(requiredMessage("Certification")),
  customerAbbr: yup.string().required(requiredMessage("Customer Abbr")),
})

export const projectValidationSchema = yup.object({
  startDate : yup.string().required(requiredMessage("Start Date")),
  endDate : yup.string().required(requiredMessage("End Date")),
  customerId: yup.string().required(requiredMessage("Customer Id")),
  status: yup.string().required(requiredMessage("Status")),
  name: yup.string().required(requiredMessage("Name")),
  clientPartnerName: yup.string().required(requiredMessage("Client Partner Name")),
  custSdmName: yup.string().required(requiredMessage("Cust Sdm Name")),
  custSdmEmail: yup.string().required(requiredMessage("Cust Sdm Email")),
  custSdmContNum: yup.string().required(requiredMessage("Cust Sdm ContNum")),
  cogSdmName: yup.string().required(requiredMessage("Cog Sdm Name")),
  cogSdmNum: yup.string().required(requiredMessage("Cog Sdm Num")),
  cogSdmCont: yup.string().required(requiredMessage("Cog Sdm Cont")),
  cogSdEmail: yup.string().required(requiredMessage("Cog Sd Email")),
  cogSdContNum: yup.string().required(requiredMessage("Cog Sd ContNum")),
  agreedSla: yup.string().required(requiredMessage("Agreed Sla")),
  coverage: yup.string().required(requiredMessage("Coverage")),
  technologyType: yup.string().required(requiredMessage("Technology Type")),
  serviceType: yup.string().required(requiredMessage("Service Type")),
  supportModel: yup.string().required(requiredMessage("Support Model")),
  talentLevel: yup.string().required(requiredMessage("Talent Level")),
  cancelPolicy: yup.string().required(requiredMessage("Cancel Policy")),
  dispatchAgreed: yup.string().required(requiredMessage("Dispatch Agreed")),
  incrementTime: yup.string().required(requiredMessage("Increment Time")),
  sow: yup.string().required(requiredMessage("Sow")),
  sowDesc: yup.string().required(requiredMessage("Sow Desc")),
  owJd: yup.string().required(requiredMessage("OwJd")),
  serviceDeliv: yup.string().required(requiredMessage("Service Deliv")),
  ssInst: yup.string().required(requiredMessage("SsInst")),
  asInst: yup.string().required(requiredMessage("AsInst")),
  toolsReq: yup.string().required(requiredMessage("Tools Req")),
  namedWorker: yup.string().required(requiredMessage("Named Worker")),
  assignedWorker: yup.string().required(requiredMessage("Assigned Worker")),
  technicalSkill: yup.string().required(requiredMessage("Technical Skill")),
  behSkills: yup.string().required(requiredMessage("Beh Skills")),
  experienceReq: yup.string().required(requiredMessage("Experience Req")),
  langReq: yup.string().required(requiredMessage("Lang Req")),
  trainReq: yup.string().required(requiredMessage("Train Req")),
  trainDoc: yup.string().required(requiredMessage("Train Doc")),
  reqTools: yup.string().required(requiredMessage("Req Tools")),
  reqSoft: yup.string().required(requiredMessage("Req Soft")),
  specReq: yup.string().required(requiredMessage("Spec Req")),
  cl1ee: yup.string().required(requiredMessage("Cl1ee")),
  cl1ec: yup.string().required(requiredMessage("Cl1ec")),
  cl2ee: yup.string().required(requiredMessage("Cl2ee")),
  cl2ec: yup.string().required(requiredMessage("Cl2ec")),
  cgl1ee: yup.string().required(requiredMessage("Cgl1ee")),
  cgl1ec: yup.string().required(requiredMessage("Cgl1ec")),
  cfl2ee: yup.string().required(requiredMessage("Cfl2ee")),
  cgl2ec: yup.string().required(requiredMessage("Cgl2ec")),
  code: yup.string().required(requiredMessage("Code")),
})

export const JobsValidationSchema = yup.object({
  name : yup.string().required(requiredMessage("Name")),
  country : yup.string().required(requiredMessage("Country")),
  city: yup.string().required(requiredMessage("City")),
  state: yup.string().required(requiredMessage("State")),
  province: yup.string().required(requiredMessage("Province")),
  postcode: yup.string().required(requiredMessage("Post Code")),
  siteAddress: yup.string().required(requiredMessage("Site Address")),
  pocName: yup.string().required(requiredMessage("Poc Name")),
  pocContactNumber: yup.string().required(requiredMessage("Poc Contact Number")),
  pocEmailAdrress: yup.string().required(requiredMessage("Poc Email Adrress")),
  ppe1h: yup.string().required(requiredMessage("Ppe1h")),
  ppe2h: yup.string().required(requiredMessage("Ppe2h")),
  ppe3h: yup.string().required(requiredMessage("Ppe3h")),
  ppe4h: yup.string().required(requiredMessage("Ppe4h")),
  ppe5h: yup.string().required(requiredMessage("Ppe5h")),
  ppe6h: yup.string().required(requiredMessage("Ppe6h")),
  ppe7h: yup.string().required(requiredMessage("Ppe7h")),
  ppe8h: yup.string().required(requiredMessage("Ppe8h")),
  tandm30: yup.string().required(requiredMessage("Tandm30")),
  tandm1h: yup.string().required(requiredMessage("Tandm1h")),
  afth: yup.string().required(requiredMessage("Afth")),
  wknd: yup.string().required(requiredMessage("Wknd")),
  ph: yup.string().required(requiredMessage("Ph")),
  sat: yup.string().required(requiredMessage("Sat")),
  sun: yup.string().required(requiredMessage("Sun")),
  siteTiming: yup.string().required(requiredMessage("Site Timing")),
  timeZone: yup.string().required(requiredMessage("Time Zone")),
  dispatchAgreed: yup.string().required(requiredMessage("Dispatch Agreed")),
  incrementTime: yup.string().required(requiredMessage("Increment Time")),
  serviceType: yup.string().required(requiredMessage("Service Type")),
  supportType: yup.string().required(requiredMessage("Support Type")),
  serviceCatItem: yup.string().required(requiredMessage("Service CatItem")),
  agreedSla: yup.string().required(requiredMessage("Agreed Sla")),
  coverage: yup.string().required(requiredMessage("Coverage")),
  technologyType: yup.string().required(requiredMessage("Technology Type")),
  currency: yup.string().required(requiredMessage("Currency")),
  projectId: yup.string().required(requiredMessage("Project Id"))
})



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
