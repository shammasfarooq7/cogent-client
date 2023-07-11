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
query GetProjectByCustomerQuery($id: String!, $getProjectsByCustomerInput: GetProjectsByCustomerInput!) {
  getProjectByCustomer(id: $id,getProjectsByCustomerInput:$getProjectsByCustomerInput) {
    id
    name
    code
    }
  }
`;

export const GET_PROJECT_QUERY = gql`
query GetProjectQuery($id: String!) {
  getProject(id: $id) {
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
      customerName
      cogentCaseNumber
      cogentWorkOrderNumber
      status
      customerTicketNumber
      ticketReceivedTime
      projectId
      numberOfHoursReq
      numberOfResource
      isExternal
      isApproved
      ticketType
      ticketDates {
        date
        scheduledTime
      }
      ticketDetail {
        endClientName
        accountName
        slaPriority
        siteName
        region
        country
        city
        siteAccessInstruction
        hardwareSN
        serviceDocUrl
        projectCode
        toolsRequested
        specialInstruction
        addInstruction
        instructions
        scopeOfWork
        caseDetails
        jobSummary
        technologyType
        customerCaseNumber
        serviceType
        serviceLevel
        servicePriority
        siteAddress
        province
        postCode
        attachments {
          url
        }

      }
    }
    }
  }
`;


export const GET_A_TICKET_QUERY = gql`
query GetTicketQuery($id: String!) {
  getTicket(id: $id) {
      
      id
      customerName
      cogentCaseNumber
      status
      numberOfHoursReq
      numberOfResource
      ticketDetail {
        accountName
        endClientName
        country
        city
        region
        province
        postCode
        siteName
        siteAddress
        spocName
        spocEmailAddress
        spocContactNumber
        jobSummary
        siteAccessInstruction
        technologyType
        caseDetails
        scopeOfWork
        instructions
        instructions
        specialInstruction
        toolsRequested
        serviceDocUrl
        hardwareSN
        serviceType
        serviceLevel
        servicePriority
        slaPriority
        attachments{
          url
        }
      }
      ticketDates{
        date
        scheduledTime
      }
      createdAt
      updatedAt
      ticketReceivedTime
    }
  }
`;


// export const GET_A_TICKET_QUERY = gql`
// query GetTicketQuery($id: String!) {
//   getTicket(id: $id) {

//       id
//       customerName
//       cogentCaseNumber
//       cogentWorkOrderNumber
//       status
//       customerTicketNumber
//       ticketReceivedTime
//       projectId
//       numberOfHoursReq
//       numberOfResource
//       isExternal
//       isApproved
//       ticketType
//       ticketDates {
//         date
//         scheduledTime
//       }
//       ticketDetail {
//         endClientName
//         accountName
//         slaPriority
//         siteName
//         region
//         country
//         city
//         siteAccessInstruction
//         hardwareSN
//         serviceDocUrl
//         projectCode
//         toolsRequested
//         specialInstruction
//         addInstruction
//         instructions
//         scopeOfWork
//         caseDetails
//         jobSummary
//         technologyType
//         customerCaseNumber
//         serviceType
//         serviceLevel
//         servicePriority
//         siteAddress
//         province
//         postCode
//         attachments {
//           url
//         }

//       }

//     }
//   }
// `;

export const GET_TODAY_TICKET_QUERY = gql`
query GetTodayTicketQuery($getTodayTicketsInput:GetTodayTicketsInput!) {
  getTodayTicket(getTodayTicketsInput: $getTodayTicketsInput) {
    count
    tickets {
      id
      customerName
      cogentCaseNumber
      cogentWorkOrderNumber
      status
      customerTicketNumber
      ticketReceivedTime
      projectId
      numberOfHoursReq
      numberOfResource
      isExternal
      isApproved
      ticketType
      ticketDates {
        date
        scheduledTime
      }
      ticketDetail {
        endClientName
        accountName
        slaPriority
        siteName
        region
        country
        city
        siteAccessInstruction
        hardwareSN
        serviceDocUrl
        projectCode
        toolsRequested
        specialInstruction
        addInstruction
        instructions
        scopeOfWork
        caseDetails
        jobSummary
        technologyType
        customerCaseNumber
        serviceType
        serviceLevel
        servicePriority
        siteAddress
        province
        postCode
        attachments {
          url
        }

      }
    }
  }
}
`;