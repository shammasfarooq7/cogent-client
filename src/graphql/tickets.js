import { gql } from '@apollo/client';

export const CREATE_TICKET_MUTATION = gql`
mutation Create($createTicketInput: CreateTicketInput!) {
    create(createTicketInput: $createTicketInput) {
      message
    }

  }
`;

export const DELETE_TICKET_MUTATION = gql`
mutation Delete($id: String!) {
  delete(id: $id) {
      message
    }
  }
`;

export const UPDATE_TICKET_MUTATION = gql`
mutation Update($updateTicketInput: UpdateTicketInput!, $id:String!) {
  update(updateTicketInput: $updateTicketInput, id:$id) {
      message
    }

  }
`;

export const GET_ALL_TICKETS_QUERY = gql`
query GetAllTicketsQuery($getAllTicketsInput: GetAllTicketsInput!) {
  getAllTickets(getAllTicketsInput: $getAllTicketsInput) {
  
  }
`;
    
