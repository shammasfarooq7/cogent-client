import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
mutation CreateUser($createUserInput: CreateUserInput!) {
    createuser(createUserInput: $createUserInput) {
      email
    }

  }
`;

export const CREATE_CUSTOMER_MUTATION = gql`
mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      message
    }

  }
`;

export const CREATE_PROJECT_MUTATION = gql`
mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(createProjectInput: $createProjectInput) {
      message
    }

  }
`;

export const CREATE_JOBSITE_MUTATION = gql`
mutation CreateJobsite($createJobsiteInput: CreateJobsiteInput!) {
    createJobsite(createJobsiteInput: $createJobsiteInput) {
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
      firstName
      lastName
      middleName
      email
      roles {
        role
      }
    }
    }
  }
`;

export const GET_ALL_PROJECTS_QUERY = gql`
query GetAllProjectsQuery($getAllProjectsInput: GetAllProjectsInput!) {
  getAllProjects(getAllProjectsInput: $getAllProjectsInput) {
    count
    projects{
      id
      name
      status
      customerId
      projectNumber
    }
    }
  }
`;



export const GET_ALL_CUSTOMERS_QUERY = gql`
query GetAllCustomersQuery($getAllCustomerInput: GetAllCustomersInput!) {
  getAllCustomer(getAllCustomerInput: $getAllCustomerInput) {
    count
    customers{
      id
      name
      email
      postCode
    }
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
mutation DeleteResourceMutation($id: String!) {
  deleteResource(id: $id) {
      message
    }
  }
`;