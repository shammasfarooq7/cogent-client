import { gql } from '@apollo/client';

export const CREATE_TICKET_MUTATION = gql`
mutation CreateTicket($createTicketInput: CreateTicketInput!) {
    createTicket(createTicketInput: $createTicketInput) {
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

export const GET_All_CUSTOMERS_QUERY = gql`
query GetCustomersQuery($getAllCustomerInput: GetAllCustomersInput!) {
  getAllCustomer(getAllCustomerInput: $getAllCustomerInput) {
    count
    customers{
      id
      name
    }
    }
  }
`;

export const GET_PROJECT_BY_CUSTOMERS_QUERY = gql`
query GetProjectByCustomerQuery($id: String!) {
  getProjectByCustomer(id: $id) {
    id
    name
    code
    }
  }
`;

export const GET_JOBSITE_BY_PROJECT = gql`
query GetJobsiteByProjectQuery($id: String!) {
  getJobsitesByProject(id: $id) {
    id
    name
    country
    city
    province
    postcode
    siteAddress
    pocName
    pocContactNumber
    pocEmailAdrress
    }
  }
`;

export const GET_ALL_TICKETS_QUERY = gql`
query GetALLTICKETSQuery($getAllTicketsInput: GetAllTicketsInput!) {
  getAllTickets(getAllTicketsInput: $getAllTicketsInput) {
    count
    tickets {
      id
      customerTicketNumber
      cogentCaseNumber
      cogentWorkOrderNumber
      ticketDetail {
        id
        region
      }
      createdAt
      updatedAt
      ticketReceivedTime
    }
    }
  }
`;