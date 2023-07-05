import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
mutation CreateUser($createUserInput: CreateUserInput!) {
    createuser(createUserInput: $createUserInput) {
      email
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

export const DELETE_USER_MUTATION = gql`
mutation DeleteResourceMutation($id: String!) {
  deleteResource(id: $id) {
      message
    }
  }
`;