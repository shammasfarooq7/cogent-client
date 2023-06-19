import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Avatar, Typography, Button } from "@mui/material"
import { Navigate, useNavigate } from 'react-router-dom';
import { HeaderResource } from '../../components/common/HeaderResource';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_TICKET_MUTATION, GET_A_TICKET_QUERY } from '../../../graphql/tickets';
import { getName, getNameFromUrl, getUrlNameforDwnload } from '../../helper';
import DeleteAlert from '../../components/common/DeleteAlert';
import { Alert } from '../../components/common/Alert';
import { downloadFile } from '../../services/rest-apis';
import { renderStatus, getBorderColour } from '../../constants';
import { SDForm } from '../serviceDesk/ServiceDeskForm';
import { AddBoxOutlined } from '@mui/icons-material';
import { ResourceForm } from '../Resource/ResourceForm';


export const CustomerViewOpportunity = () => {

  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search)
  const id = urlSearchParams?.get("id") || "";
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);


  const error =''
  const refetch = ''
  const data = {
        id: 367322,
        ticketType: 'FSE',
        date: '2023-06-17',
        time: '20:48',
        country: 'Pakistan',
        city: 'Lahore',
        status: 'Cancelled',
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
        siteAccessInstruction: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
        customerCaseNumber: 737872,
        technologyType: 'EUC',
        jobSummary: 'Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
        caseDetails: 'Lorum ispum instructions Lorum ispum Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
        scopeOfWork: 'Lorum ispum instructions Lorum ispum Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
        instructions: 'Lorum ispum instructions Lorum ispum Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
        addInstruction: 'Lorum ispum instructions Lorum ispum Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructionsLorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
        specialInstruction: 'Lorum ispum instructions Lorum ispum Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions Lorum ispum instructions',
        toolsRequested: ['Macbook', "Cisco VPN"],
        serviceDocUrl: 'https://www.africau.edu/images/default/sample.pdf',
        hardwareSN: 'lorum ispum',
        serviceType: 'Breakfix',
        serviceLevel: 'L1',
        servicePriority: 'P1',
        slaPriority: '3BD',
        numberOfHoursReq: 78,
        numberOfResource: 5,
        attachments: 'https://www.africau.edu/images/default/sample.pdf',
    }

  const [deleteTicket, { loading: isDeleteLoading }] = useMutation(DELETE_TICKET_MUTATION)
  const info = data;

  const handleDeleteConfirm = async () => {
    await deleteTicket({
      variables: {
        id
      }
    })
    Alert.success("Deleted Successfully!")
    setOpenDeleteAlert(false);
    navigate("/all-resource")
  }

  const handleUpdateClick = () => {
    setOpenTicketForm(true);
  };

  const handleDownloadClick = (url) => {
    downloadFile(getUrlNameforDwnload(url))
  }

  if (error)
    return (
      <Box padding={"30px"} sx={{ margin: "30px", border: "1px solid gray", borderRadius: "8px", background: "white" }}>
        {error?.message || "Something went wrong"}
      </Box>
    )

  return (
    <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>

      <DeleteAlert
        open={openDeleteAlert}
        setOpen={setOpenDeleteAlert}
        handleConfirm={handleDeleteConfirm}
        isLoading={isDeleteLoading}
        title={"Delete Resource"}
        text={"Are you sure you want to delete this resource? This action cannot be revert back."}
      />

      {openTicketForm &&
        <ResourceForm
          openModal={openTicketForm}
          setOpenModal={setOpenTicketForm}
          editInfo={info}
          type="Oportunity"
          refetchResources={refetch} />}

      <Box sx={{ backgroundColor: "white", p: 1.5}}>

        <Box  sx={{ mb: 2, display:'flex', justifyContent:'space-between' }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography sx={{fontWeight: 'bold'}}> Opportunity </Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button onClick={handleUpdateClick}
             sx={{mr:'10px', backgroundColor:'#333333', color:'white',textTransform:'capitalize', '&:hover': {
                backgroundColor: ' #333333'
              }}} >
                Edit</Button>
          <Button  sx={{mr:'10px', backgroundColor:'#EFEFEF', color:'#333333', textTransform:'capitalize','&:hover': {
                backgroundColor: '#EFEFEF'
              }}} >Delete</Button>
            </Box>
          </Box>
        </Box>

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="JOB Details" />
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Job Title</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.siteName}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.region}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Location</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.country}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Qualification</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
          </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Experince</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.siteAddress}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Apply at</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.provinceState}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Application Deadline</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.postCode}</Typography>
            </Grid>
         </Grid>
         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Job Description/ Summary</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.jobSummary}</Typography>
            </Grid>
         </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
