import { gql } from '@apollo/client';
// mutation signin($loginUserInput: LoginUserInput!) {
//   signin(loginUserInput: $loginUserInput) {
//     accessToken
//   }
// }
export const SIGN_UP = gql`
  mutation SignUp($signUpUserInput: SignUpUserInput!) {
    signup(signUpUserInput: $signUpUserInput) {
      id
      email
      createdAt
      updatedAt
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($loginUserInput: LoginUserInput!) {
    signin(loginUserInput: $loginUserInput) {
      accessToken
      roles
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUserQuery {
    getCurrentUser {
      id
      email
      firstName
      lastName
      middleName
      roles {
        role
      }
      customer {
        id
        name
        vendorReference
        website
        establishYear
        employeesCount
        dispatchGroupEmail
        city
        employeeCountLinkedin
        phone
        country
        postCode
        linkedinUrl
        email
        stateProvince
        address
        annualRevenue
        revenueSoftware
        revenueConsultancy
        revenueSupport
        revenueLogistics
        revenueOther
        contactNumber
        addressLine1
        addressLine2
        emailId
        mobile
        whatsappNumber
        whatsappGroup
        whatsappLink
        cogentEmailId
        workPermitStatus
        primaryTechService
        fieldService
        keyCustomerSupport
        languageSupport
        countrySupported
        certification
        customerAbbr
      }
      resource {
        id
        email
        mobileNumber
        contactNumber
        status
        idCardType
        interviewStatus
        vendorName
        whatsappGroup
        whatsappGroupLink
        workPermitStatus
        contractDocuments
        availability
        engagementType
        rpocName
        rpocEmail
        rpocContactNumber
        firstName
        lastName
        middleName
        idCardNumber
        taxNumber
        languages
        skillSet
        availableTools
        nationality
        region
        country
        state
        city
        postalCode
        addressLine1
        addressLine2
        whatsappNumber
        cogentEmail
        descriptionColor
        hourlyRate
        halfDayRate
        fullDayRate
        monthlyRate
        anyExtraRate
        transport
        mobility
        resumeDocUrl
        identityDocUrl
        userPaymentMethod {
          id
          accountType
          accountTitle
          beneficiaryFirstName
          beneficiaryMiddleName
          beneficiaryLastName
          beneficiaryAddress
          sortCode
          accountNumber
          iban
          swiftCode
          bankName
          branchName
          bankAddress
          resource {
            id
            email
          }
          userId
          createdAt
          updatedAt
        }
      }
    }
  }
`;

