import { gql } from '@apollo/client';

export const CREATE_RESOURCE_MUTATION = gql`
mutation CreateResource($createResourceInput: CreateResourceInput!) {
    createResource(createResourceInput: $createResourceInput) {
      message
    }

  }
`;

export const UPDATE_RESOURCE_MUTATION = gql`
mutation UpdateResourceMutation($updateResourceInput: UpdateResourceInput!, $id:String!) {
  updateResource(updateResourceInput: $updateResourceInput, id:$id) {
      message
    }

  }
`;


export const GET_ALL_USERS_QUERY = gql`
query GetAllUsersQuery($getAllUsersInput: GetAllUsersInput!) {
  getAllUsers(getAllUsersInput: $getAllUsersInput) {
    count
    users{
      id
      status
      vendorName
      rpocName
      rpocEmail
      rpocContactNumber
      firstName
      lastName
      idCardType
      identityDocUrl
      middleName
      idCardNumber
      taxNumber
      nationality
      region
      country
      state
      city
      postalCode
      addressLine1
      addressLine2
      email
      mobileNumber
      contactNumber
      whatsappNumber
      whatsappGroup
      whatsappGroupLink
      cogentEmail
      workPermitStatus
      skillSet
      resumeDocUrl
      availableTools
      hourlyRate
      halfDayRate
      fullDayRate
      monthlyRate
      anyExtraRate
      languages
      engagementType
      userPaymentMethod {
        id
        accountType
        accountTitle
        beneficiaryFirstName
        beneficiaryMiddleName
        beneficiaryAddress
        beneficiaryLastName
        sortCode
        accountNumber
        iban
        swiftCode
        bankName
        branchName
        bankAddress
      }
      transport
      availability
      mobility
      interviewStatus
      contractDocuments
      onboardedBy{
        id
      firstName
      lastName
      middleName
      }
      isOnboarded
    }
    }
  }
`;

export const GET_REQUEST_USERS_QUERY = gql`
query GetRequestUsersQuery($getNewRequestUsersInput: GetAllUsersInput!) {
  getNewRequestUsers(getNewRequestUsersInput: $getNewRequestUsersInput) {
    count
    users{
      id
      email
      firstName
      lastName
      middleName
      country
      city
      isOnboarded
    }
    }
  }
`;

export const Get_Dashboard_Stats = gql`
  query GetDashboardStats{
    getDashboardStats {
    totalResourceCount
    newRequestCount
    newHiringCount
  }
  }
`;

export const Get_RESOURCE_Dashboard_Stats = gql`
  query GetResourceDashboardStats{
    getResourceDashboardStats {
      resourceStats {
        total
        difference
      }
      onboardedStats{
        total
        difference
      }
  }
  }
`;

export const DELETE_RESOURCE_MUTATION = gql`
mutation DeleteResourceMutation($id: String!) {
  deleteResource(id: $id) {
      message
    }
  }
`;

export const ACCEPT_REQUEST_MUTATION = gql`
mutation ApproveUserRequestMutation($id: String!) {
  approveUserRequest(id: $id) {
      message
    }
  }
`;

export const GET_A_RESOURCE_QUERY = gql`
query GetResourceQuery($id: String!) {
  getResource(id: $id) {
    id
    status
    vendorName
    rpocName
    rpocEmail
    rpocContactNumber
    firstName
    lastName
    idCardType
    identityDocUrl
    middleName
    idCardNumber
    taxNumber
    nationality
    region
    country
    state
    city
    postalCode
    addressLine1
    addressLine2
    email
    mobileNumber
    contactNumber
    whatsappNumber
    whatsappGroup
    whatsappGroupLink
    cogentEmail
    workPermitStatus
    skillSet
    resumeDocUrl
    availableTools
    hourlyRate
    halfDayRate
    fullDayRate
    monthlyRate
    anyExtraRate
    languages
    engagementType
    userPaymentMethod {
      id
      accountType
      accountTitle
      beneficiaryFirstName
      beneficiaryMiddleName
      beneficiaryAddress
      beneficiaryLastName
      sortCode
      accountNumber
      iban
      swiftCode
      bankName
      branchName
      bankAddress
    }
    transport
    availability
    mobility
    interviewStatus
    contractDocuments
    onboardedBy{
      id
      firstName
      lastName
      middleName
    }
    isOnboarded
    }
  }
`;

