import * as yup from "yup";
import { INVALID_EMAIL } from "../../../constants";
import { requiredMessage } from "../../../utils";
import { isValidPhoneNumber } from "react-phone-number-input";


export const addTicketFormValidationSchema = yup.object({
    jobSiteId: yup.string().nullable().optional(),
    ticketType: yup.string().required("Ticket Type is required"),
    date: yup.array().nullable().of(yup.date()).optional(),
    time: yup.string().nullable().matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Invalid time format").optional(),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    customer: yup.object().nullable().required("Customer is required"),
    customerCaseNumber: yup.string().nullable().required("Customer Case Number is required"),
    accountName: yup.string().required("Account Name is required"),
    projectId: yup.string().nullable().optional(),
    endClientName: yup.string().required("End Client Name is required"),
    isAdhoc: yup.boolean(),
    project: yup.object().nullable().when('isAdhoc', {
        is: false,
        then: yup.object().required('Project is required').nullable(),
        otherwise: yup.object().optional().nullable()
    }),
    siteName: yup
        .mixed()
        .test('siteName', 'Site Name is required', function (value) {
            return (typeof (value === 'string') && value) || typeof value === 'object';
        })
        .required("Site Name is required"),
    region: yup.string().required("Region is required"),
    provinceState: yup.string().required("Province is required"),
    siteAddress: yup.string().required("Address is required"),
    postCode: yup.string().required("Post Code is required"),
    spocName: yup.string().required("SPOC Name is required"),
    spocContactNumber: yup.string().nullable().required('SPOC Contact Number is required').nullable().test('valid-spoc-number', 'SPOC Contact Number is Invalid', function (value) {
        if (!isValidPhoneNumber(value?.includes("+") ? value : `+${value}`)) return false  // this whole validation for required phone number
        return true
    }),
    spocEmailAddress: yup.string().email(INVALID_EMAIL).required(requiredMessage("SPOC Email")),
    siteAccessInstruction: yup.string().required("Site Access Instructions Name is required"),
    technologyType: yup.string().required("Technology Type is required"),
    jobSummary: yup.string().required("Job summary is required"),
    caseDetails: yup.string().required("Contact Details is required"),
    scopeOfWork: yup.string().required("Scope of work is required"),
    instructions: yup.string().required("Instructions is required"),
    addInstruction: yup.string().optional(),
    specialInstruction: yup.string().required("Special Instructions is required"),
    toolsRequested: yup.array().min(1, "At least one tool is required").of(yup.object().required()).required("Tools Requested is required"),
    serviceDocUrl: yup.string().optional(),
    hardwareSN: yup.string().required("Hardware is required"),
    serviceType: yup.string().required("Service Type is required"),
    serviceLevel: yup.string().required("Service Level is required"),
    servicePriority: yup.string().required("Service Priority is required"),
    slaPriority: yup.string().required("SLA Priority is required"),
    numberOfHoursReq: yup.number().nullable().required("Number of hours required").min(1, "Number of hours must be greater than 0"),
    numberOfResource: yup.number().nullable().required("Number of resources required"),
    ticketDates: yup.array().min(1, "At least one ticket date is required").of(yup.date()).required("Date is required"),
    projectCode: yup.string().required("Project Code is required"),
    scheduledTime: yup.string().nullable().required("Time is required").matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Invalid time format"),
})