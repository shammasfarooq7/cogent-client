import { gql } from '@apollo/client';

export const CREATE_RESOURCE_MUTATION = gql`
mutation CreateResource($createResourceInput: CreateResourceInput!) {
    createResource(createResourceInput: $createResourceInput) {
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

export const DELETE_RESOURCE_MUTATION = gql`
mutation DeleteResourceMutation($id: String!) {
  deleteResource(id: $id) {
      message
    }
  }
`;

