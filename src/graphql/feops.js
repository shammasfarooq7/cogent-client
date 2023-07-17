import { gql } from '@apollo/client';

export const GET_RESOURCES_TO_BE_ASSIGN_QUERY = gql`
query GetAllResourcesQuery($getAllResourcesInput: GetAllResourcesInput!) {
  getAllResources(getAllResourcesInput: $getAllResourcesInput) {
    count
    resources{
      id
      firstName
      lastName
      middleName
      country
      city
    }
    }
  }
`;

export const ASSIGN_RESOURCE_TO_TICKET_MUTATION = gql`
mutation AssignResourcesToTicketMutation($assignResourcesToTicketInput: AssignResourcesToTicketInput!) {
    assignResourcesToTicket(assignResourcesToTicketInput: $assignResourcesToTicketInput) {
   message
    }
  }
`;