import { gql } from '@apollo/client';

export const CREATE_TICKET_MUTATION = gql`
mutation CreateTicket($createTicketInput: CreateTicketInput!) {
    createTicket(createTicketInput: $createTicketInput) {
      message
    }

  }
`;

export const DELETE_TICKET_MUTATION = gql`
mutation DeleteTicketMutation($id: String!) {
  deleteTicket(id: $id) {
      message
    }
  }
`;

export const UPDATE_TICKET_MUTATION = gql`
mutation updateTicketMutation($updateTicketInput: UpdateTicketInput!) {
  updateTicket(updateTicketInput: $updateTicketInput) {
      message
    }

  }
`;

export const APPROVE_EXTERNAL_TICKET_MUTATION = gql`
mutation ApproveExternalTicket($id:String!) {
  approveExternalTicket(id:$id) {
      message
    }
  }
`;

export const CHANGE_TICKET_STATUS = gql`
mutation changeStatus($changeStatusInput: ChangeStatusInput!){
  changeStatus(changeStatus: $changeStatusInput){
    message
  }
}
`

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

export const GET_SD_DASHBOARD_STATS = gql`
query GetDashboardStatsTicket {
  getDashboardStatsTicket {
    todayCount
    futureCount
    inProgressCount
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
      customerId
      cogentCaseNumber
      cogentWorkOrderNumber
      status
      customerTicketNumber
      ticketReceivedTime
      projectId
      jobSiteId
      numberOfHoursReq
      numberOfResource
      isExternal
      isApproved
      ticketType
      canEditAndDelete
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
        spocName
        spocEmailAddress
        spocContactNumber
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

export const GET_RESOURCE_TICKET_COUNT_QUERY = gql`
query GetResourceTicketQuery($getResourceTicketInput:GetResourceTicketInput!) {
  getResourceTickets(getResourceTicketInput: $getResourceTicketInput) {
    count
  }
}
`;

export const GET_RESOURCE_TICKET_QUERY = gql`
query GetResourceTicketQuery($getResourceTicketInput:GetResourceTicketInput!) {
  getResourceTickets(getResourceTicketInput: $getResourceTicketInput) {
    count
    ticketDates {
      date
      scheduledTime
      ticket {
        id
        customerName
        customerId
        cogentCaseNumber
        cogentWorkOrderNumber
        status
        customerTicketNumber
        ticketReceivedTime
        projectId
        jobSiteId
        numberOfHoursReq
        numberOfResource
        isExternal
        isApproved
        ticketType
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
          spocName
          spocEmailAddress
          spocContactNumber
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
}
`;


export const GET_TODAY_TICKET_QUERY = gql`
query GetTodayTicketQuery($getTodayTicketsInput:GetTodayTicketsInput!) {
  getTodayTicket(getTodayTicketsInput: $getTodayTicketsInput) {
    count
    tickets {
      id
      customerName
      customerId
      cogentCaseNumber
      cogentWorkOrderNumber
      canEditAndDelete
      status
      customerTicketNumber
      ticketReceivedTime
      projectId
      jobSiteId
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
        spocName
        spocEmailAddress
        spocContactNumber
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

export const GET_TIME_SHEETS_QUERY = gql`
query GetTimeSheetsQuery($ticketId:String!) {
  ticketTimeSheetData(ticketId: $ticketId) {
    id
    checkIn
    checkOut
    sdCheckIn
    sdCheckOut
    feopsCheckIn
    feopsCheckOut
    ticketDate {
      id
      date
    }
    resource {
      id
      firstName
      lastName
      middleName
    }
  }
}
`;

export const TIME_SHEET_CHECK_IN_OUT = gql`
mutation TimeSheetCheckInOutMutation($checkinCheckoutInput: CheckinCheckoutInput!){
  timeSheetCheckInOut(checkinCheckoutInput: $checkinCheckoutInput){
    message
  }
}`;