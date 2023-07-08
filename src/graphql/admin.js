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

export const GET_ALL_JOBS_QUERY = gql`
query GetAllJobsQuery($getAllJobsitesInput: GetAllJobsitesInput!) {
  getAllJobsites(getAllJobsitesInput: $getAllJobsitesInput) {
    jobsites{
      id
      name
     postcode
    }
    }
  }
`;

export const GET_ALL_TICKETS_QUERY = gql`
query GetAllTicketsQuery($getAllTicketsInput: GetAllTicketsInput!) {
  getAllTickets(getAllTicketsInput: $getAllTicketsInput) {
    tickets{
      id
      customerTicketNumber
      customerName
    }
    }
  }
`;

export const GET_TICKET_QUERY = gql`
query GetTicketQuery($id: String!) {
  getTicket(id: $id) {    
      id
      customerTicketNumber
      customerName
      cogentCaseNumber
      cogentWorkOrderNumber
      ticketType
      status
      numberOfHoursReq
      numberOfResource
      ticketDetailId
      projectId
      jobSiteId
      customerId
      ticketReceivedTime
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const GET_CUSTOMER_QUERY = gql`
query GetCustomerQuery($id: String!) {
  getCustomer(id: $id) {    
      id
      name
      vendorReference
      website
      establishYear
      employeesCount
      dispatchGroupEmail
      city
      employeeCountLinkedin
      phone
      country
      postCode
      linkedinUrl
      email
      stateProvince
      address
      annualRevenue
      revenueSoftware
      revenueConsultancy
      revenueSupport
      revenueLogistics
      revenueOther
      contactNumber
      addressLine1
      addressLine2
      emailId
      mobile
      whatsappNumber
      whatsappGroup
      whatsappLink
      cogentEmailId
      workPermitStatus
      primaryTechService
      fieldService
      keyCustomerSupport
      languageSupport
      countrySupported
      certification
      customerAbbr
      onboardedAt
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const GET_PROJECT_QUERY = gql`
query GetProjectQuery($id: String!) {
  getProject(id: $id) {    
      id
      startDate
      endDate
      status
      projectNumber
      name
      clientPartnerName
      custSdmName
      custSdmEmail
      custSdmContNum
      cogSdmName
      cogSdmNum
      cogSdmCont
      cogSdEmail
      cogSdContNum
      cancelPolicy
      dispatchAgreed
      incrementTime
      sow
      sowDesc
      owJd
      serviceDeliv
      ssInst
      asInst
      toolsReq
      namedWorker
      assignedWorker
      technicalSkill
      behSkills
      experienceReq
      langReq
      trainReq
      trainDoc
      reqTools
      reqSoft
      specReq
      cl1ee
      cl1ec
      cl2ee
      cl2ec
      cgl1ee
      cgl1ec
      cfl2ee
      cgl2ec
      code
      customerId
    }
  }
`;

export const GET_JOB_QUERY = gql`
query GetJobQuery($id: String!) {
  getJobsite(id: $id) {    
      id
      name
      country
      city
      state
      province
      postcode
      siteAddress
      pocName
      pocContactNumber
      pocEmailAdrress
      ppe1h
      ppe2h
      ppe3h
      ppe4h
      ppe5h
      ppe6h
      ppe7h
      ppe8h
      tandm30
      tandm1h
      afth
      wknd
      ph
      sat
      sun
      siteTiming
      timeZone
      dispatchAgreed
      incrementTime
      projectId
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