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
    addressLine1
    email
    mobileNumber
    whatsappNumber
    cogentEmail
    skillSet
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
    mobility
    onboardedBy
    isOnboarded
    }
  }
`;

