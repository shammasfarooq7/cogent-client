import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, TablePagination, Typography } from '@mui/material';
import { images } from '../../assets/images';
import { Search } from '../../components/common/Search';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_TICKET_MUTATION, GET_ALL_TICKETSS_QUERY } from '../../../graphql/tickets';
import DeleteAlert from '../../components/common/DeleteAlert';
import { Alert } from '../../components/common/Alert';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../customHooks/useDebounce';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { renderStatus } from '../../constants';


export const FeopsTable = ({ tableName, search, setTicketTabelRefetch, ticketTableRefetch, todays=false}) => {

    const navigate = useNavigate();

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [openSDForm, setOpenSDForm] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [editInfo, setEditInfo] = useState(null);

    
    const [allTickets, setAllTickets] = useState([
        {
            id: 367322,
            ticketType: 'FSE',
            date: '2023-06-17',
            time: '20:48',
            country: 'Pakistan',
            city: 'Lahore',
            status: 'Completed',
            checkInOrOut: 'Check-In',
            customerName: 'Facebook',
            customerTicketNumber: 'FB00123',
            cogentCaseNumber: 'COGENT0098',
            cogentWorkOrder: '782',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '673',
            endClientName: 'Lorum Ispum',
            siteName: 'location1', 
            region: 'EMEA',
            provinceState: 'Punjab',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737872,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Macbook'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 78,
            numberOfResource: 5,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67323,
            ticketType: 'PTE',
            date: '2023-06-12',
            time: '20:58',
            country: 'India',
            city: 'Dehli',
            status: 'Cancelled',
            checkInOrOut: 'Check-Out',
            customerName: 'Google',
            customerTicketNumber: 'GOOGLE00123',
            cogentCaseNumber: 'COGENT0099',
            cogentWorkOrder: '783',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '674',
            endClientName: 'Lorum Ispum',
            siteName: 'location2', 
            region: 'EMEA',
            provinceState: 'Punjab',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum001@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737873,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 3,
            numberOfResource: 1,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67324,
            ticketType: 'FTE',
            date: '2023-06-10',
            time: '21:30',
            country: 'United Kingdom',
            city: 'London',
            status: 'In Progress',
            checkInOrOut: 'Check-In',
            customerName: 'Microsoft Corporation',
            customerTicketNumber: 'Microsoft00123',
            cogentCaseNumber: 'COGENT0100',
            cogentWorkOrder: '785',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '678',
            endClientName: 'Lorum Ispum',
            siteName: 'location3', 
            region: 'EMEA',
            provinceState: 'England',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737889,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Macbook', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 8,
            numberOfResource: 2,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67324,
            ticketType: 'FTE',
            date: '2023-06-10',
            time: '21:30',
            country: 'United Kingdom',
            city: 'London',
            status: 'Escalated',
            checkInOrOut: 'Check-In',
            customerName: 'Microsoft Corporation',
            customerTicketNumber: 'Microsoft00123',
            cogentCaseNumber: 'COGENT0100',
            cogentWorkOrder: '785',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '678',
            endClientName: 'Lorum Ispum',
            siteName: 'location3', 
            region: 'EMEA',
            provinceState: 'England',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737889,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Macbook', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 8,
            numberOfResource: 2,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 367322,
            ticketType: 'FSE',
            date: '2023-06-17',
            time: '20:48',
            country: 'Pakistan',
            city: 'Lahore',
            status: 'Completed',
            checkInOrOut: 'Check-In',
            customerName: 'Facebook',
            customerTicketNumber: 'FB00123',
            cogentCaseNumber: 'COGENT0098',
            cogentWorkOrder: '782',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '673',
            endClientName: 'Lorum Ispum',
            siteName: 'location1', 
            region: 'EMEA',
            provinceState: 'Punjab',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737872,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Macbook'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 78,
            numberOfResource: 5,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67323,
            ticketType: 'PTE',
            date: '2023-06-12',
            time: '20:58',
            country: 'India',
            city: 'Dehli',
            status: 'Cancelled',
            checkInOrOut: 'Check-Out',
            customerName: 'Google',
            customerTicketNumber: 'GOOGLE00123',
            cogentCaseNumber: 'COGENT0099',
            cogentWorkOrder: '783',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '674',
            endClientName: 'Lorum Ispum',
            siteName: 'location2', 
            region: 'EMEA',
            provinceState: 'Punjab',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum001@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737873,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 3,
            numberOfResource: 1,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67324,
            ticketType: 'FTE',
            date: '2023-06-10',
            time: '21:30',
            country: 'United Kingdom',
            city: 'London',
            status: 'In Progress',
            checkInOrOut: 'Check-In',
            customerName: 'Microsoft Corporation',
            customerTicketNumber: 'Microsoft00123',
            cogentCaseNumber: 'COGENT0100',
            cogentWorkOrder: '785',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '678',
            endClientName: 'Lorum Ispum',
            siteName: 'location3', 
            region: 'EMEA',
            provinceState: 'England',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737889,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Macbook', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 8,
            numberOfResource: 2,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67324,
            ticketType: 'FTE',
            date: '2023-06-10',
            time: '21:30',
            country: 'United Kingdom',
            city: 'London',
            status: 'Escalated',
            checkInOrOut: 'Check-In',
            customerName: 'Microsoft Corporation',
            customerTicketNumber: 'Microsoft00123',
            cogentCaseNumber: 'COGENT0100',
            cogentWorkOrder: '785',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '678',
            endClientName: 'Lorum Ispum',
            siteName: 'location3', 
            region: 'EMEA',
            provinceState: 'England',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737889,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Macbook', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 8,
            numberOfResource: 2,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },  {
            id: 367322,
            ticketType: 'FSE',
            date: '2023-06-17',
            time: '20:48',
            country: 'Pakistan',
            city: 'Lahore',
            status: 'Completed',
            checkInOrOut: 'Check-In',
            customerName: 'Facebook',
            customerTicketNumber: 'FB00123',
            cogentCaseNumber: 'COGENT0098',
            cogentWorkOrder: '782',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '673',
            endClientName: 'Lorum Ispum',
            siteName: 'location1', 
            region: 'EMEA',
            provinceState: 'Punjab',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737872,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Macbook'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 78,
            numberOfResource: 5,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67323,
            ticketType: 'PTE',
            date: '2023-06-12',
            time: '20:58',
            country: 'India',
            city: 'Dehli',
            status: 'Cancelled',
            checkInOrOut: 'Check-Out',
            customerName: 'Google',
            customerTicketNumber: 'GOOGLE00123',
            cogentCaseNumber: 'COGENT0099',
            cogentWorkOrder: '783',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '674',
            endClientName: 'Lorum Ispum',
            siteName: 'location2', 
            region: 'EMEA',
            provinceState: 'Punjab',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum001@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737873,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 3,
            numberOfResource: 1,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67324,
            ticketType: 'FTE',
            date: '2023-06-10',
            time: '21:30',
            country: 'United Kingdom',
            city: 'London',
            status: 'In Progress',
            checkInOrOut: 'Check-In',
            customerName: 'Microsoft Corporation',
            customerTicketNumber: 'Microsoft00123',
            cogentCaseNumber: 'COGENT0100',
            cogentWorkOrder: '785',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '678',
            endClientName: 'Lorum Ispum',
            siteName: 'location3', 
            region: 'EMEA',
            provinceState: 'England',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737889,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Macbook', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 8,
            numberOfResource: 2,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67324,
            ticketType: 'FTE',
            date: '2023-06-10',
            time: '21:30',
            country: 'United Kingdom',
            city: 'London',
            status: 'Escalated',
            checkInOrOut: 'Check-In',
            customerName: 'Microsoft Corporation',
            customerTicketNumber: 'Microsoft00123',
            cogentCaseNumber: 'COGENT0100',
            cogentWorkOrder: '785',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '678',
            endClientName: 'Lorum Ispum',
            siteName: 'location3', 
            region: 'EMEA',
            provinceState: 'England',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737889,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Macbook', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 8,
            numberOfResource: 2,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },  {
            id: 367322,
            ticketType: 'FSE',
            date: '2023-06-17',
            time: '20:48',
            country: 'Pakistan',
            city: 'Lahore',
            status: 'Completed',
            checkInOrOut: 'Check-In',
            customerName: 'Facebook',
            customerTicketNumber: 'FB00123',
            cogentCaseNumber: 'COGENT0098',
            cogentWorkOrder: '782',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '673',
            endClientName: 'Lorum Ispum',
            siteName: 'location1', 
            region: 'EMEA',
            provinceState: 'Punjab',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737872,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Macbook'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 78,
            numberOfResource: 5,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67323,
            ticketType: 'PTE',
            date: '2023-06-12',
            time: '20:58',
            country: 'India',
            city: 'Dehli',
            status: 'Cancelled',
            checkInOrOut: 'Check-Out',
            customerName: 'Google',
            customerTicketNumber: 'GOOGLE00123',
            cogentCaseNumber: 'COGENT0099',
            cogentWorkOrder: '783',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '674',
            endClientName: 'Lorum Ispum',
            siteName: 'location2', 
            region: 'EMEA',
            provinceState: 'Punjab',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum001@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737873,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 3,
            numberOfResource: 1,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67324,
            ticketType: 'FTE',
            date: '2023-06-10',
            time: '21:30',
            country: 'United Kingdom',
            city: 'London',
            status: 'In Progress',
            checkInOrOut: 'Check-In',
            customerName: 'Microsoft Corporation',
            customerTicketNumber: 'Microsoft00123',
            cogentCaseNumber: 'COGENT0100',
            cogentWorkOrder: '785',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '678',
            endClientName: 'Lorum Ispum',
            siteName: 'location3', 
            region: 'EMEA',
            provinceState: 'England',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737889,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Macbook', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 8,
            numberOfResource: 2,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 67324,
            ticketType: 'FTE',
            date: '2023-06-10',
            time: '21:30',
            country: 'United Kingdom',
            city: 'London',
            status: 'Escalated',
            checkInOrOut: 'Check-In',
            customerName: 'Microsoft Corporation',
            customerTicketNumber: 'Microsoft00123',
            cogentCaseNumber: 'COGENT0100',
            cogentWorkOrder: '785',
            accountName: 'Lorum Ispum',
            project: 'adhoc', 
            projectCode: '678',
            endClientName: 'Lorum Ispum',
            siteName: 'location3', 
            region: 'EMEA',
            provinceState: 'England',
            siteAddress: 'Adress of the site',
            postCode: 54000,
            spocName: 'Lorum Ispum',
            spocContactNumber: 'Lorum Ispum',
            spocEmailAddress: 'lorum@ispum.com',
            siteAccessInstruction: 'Lorum ispum instructions',
            customerCaseNumber: 737889,
            technologyType: 'EUC',
            jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
            caseDetails: 'Lorum ispum instructions Lorum ispum',
            scopeOfWork: 'Lorum ispum instructions Lorum ispum',
            instructions: 'Lorum ispum instructions Lorum ispum',
            addInstruction: 'Lorum ispum instructions Lorum ispum',
            specialInstruction: 'Lorum ispum instructions Lorum ispum',
            toolsRequested: ['Windows Laptop', 'Macbook', 'Cisco VPN'],
            serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
            hardwareSN: 'lorum ispum',
            serviceType: 'Breakfix',
            serviceLevel: 'L1',
            servicePriority: 'P1',
            slaPriority: '3BD',
            numberOfHoursReq: 8,
            numberOfResource: 2,
            attachments: 'https://www.africau.edu/images/default/sample.pdf',
        },
    ]);


    const searchQuery = useDebounce(searchValue, 500);


    const loading = '';
    const data = '';
    const refetch = '';
   
    const handleChangePage = (event, newPage) => {
        console.log({ newPage });
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteConfirm = async () => {
       
        Alert.success("Deleted Successfully!")
        setOpenDeleteAlert(false);
    }

    const handleEditClick = (info) => {
        setEditInfo(info);
        setOpenSDForm(true)
    }

    const onDeleteClick = (id) => {
        setOpenDeleteAlert(true);

    }

    return (
        <>
            <DeleteAlert
                open={openDeleteAlert}
                setOpen={setOpenDeleteAlert}
                handleConfirm={handleDeleteConfirm}
                title={"Delete?"}
                text={"Are you sure you want to delete this? This action cannot be revert back."}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={{ color: "black", fontWeight: "600", fontSize: "18px" }}>{tableName}</Typography>

            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F5F8FA", borderRadius: "10px" }}>
                        <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>Ticket Number</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Check In/Out</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ marginTop: "10px" }}>

                    {loading
                        ? <TableRow >
                            <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                Loading...
                            </TableCell>
                        </TableRow>
                        : !allTickets.length
                            ?
                            <TableRow >
                                <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                    No Record Found
                                </TableCell>
                            </TableRow>
                            : allTickets.map((ticket) => (
                                <TableRow key={ticket.id} sx={{ mt: 2 }}>
                                    <TableCell>
                                        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>ID# {ticket.id}</Box>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 500, fontSize: "13px", lineHeight: "20px", color: "#B5B5C3" }}>
                                                {ticket.city}, {ticket.country}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{ticket.date}</TableCell>
                                    <TableCell>{ticket.time}</TableCell>
                                    <TableCell>{ticket.country}</TableCell>
                                    <TableCell>{ticket.checkInOrOut}</TableCell>
                                    <TableCell>
                                        {
                                            renderStatus(ticket.status)
                                        }
                                    </TableCell>
                                    <TableCell >
                                        <Box display={"flex"} alignItems={"center"}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F8FA", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
                                                onClick={() => { navigate(`/ticket-details?id=${ticket?.id}`) }} >
                                                <VisibilityIcon color='action' />
                                            </Box>
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "6px" }}
                                                 src={images.Edit} alt='Menu' onClick={() => { handleEditClick(ticket) }} />
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "1px" }}
                                                src={images.Trash} alt='Menu'onClick={() => { onDeleteClick(ticket?.id) }}
                                        />

                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table >
            <Box display={"flex"} justifyContent={"end"} marginTop={2}>
                <TablePagination
                    component="div"
                    count={data?.getAllUsers?.count || 0}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={limit}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </>
    );
}