import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Avatar, Typography, Button } from "@mui/material"
import { Navigate, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { getName, getNameFromUrl, getUrlNameforDwnload } from '../../../helper';
import DeleteAlert from '../../../components/common/DeleteAlert';
import { Alert } from '../../../components/common/Alert';
import { downloadFile } from '../../../services/rest-apis';
import { rendercity, getBorderColour } from '../../../constants';
import { AddBoxOutlined } from '@mui/icons-material';
import { HeaderResource } from '../../../components/common/HeaderResource';
import { DELETE_TICKET_MUTATION } from '../../../../graphql/tickets';


export const ProjectView = () => {

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
        city: 'Cancelled',
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

      {/* {openTicketForm &&
        <SDForm
          openModal={openTicketForm}
          setOpenModal={setOpenTicketForm}
          editInfo={info}
          refetchResources={refetch} />} */}

      <Box sx={{ backgroundColor: "white", p: 1.5, border:2, borderColor: getBorderColour(info?.city)}}>

        <Box  sx={{ mb: 2, display:'flex', justifyContent:'space-between' }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography sx={{fontWeight: 'bold'}}> Project# {getName(info?.id)} </Typography>
            </Box>
          </Box>
          <Box>
            {/* <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button  sx={{mr:'10px', backgroundColor:'#50CD89', color:'white', textTransform:'capitalize'}} >Assign Resource</Button>
            <Button  sx={{mr:'10px', backgroundColor:'#00A3FF', color:'white',textTransform:'capitalize'}} >Chat</Button>
            <Button  sx={{ color: "white", backgroundColor: "#333333", marginRight: "10px",textTransform:'capitalize' }} onClick={handleUpdateClick}>Edit</Button>
            <Button sx={{ color: "white", backgroundColor: "red",textTransform:'capitalize' }}
              onClick={() => { setOpenDeleteAlert(true) }}>Delete</Button>
            </Box> */}
          </Box>
        </Box>
        {/* <Divider /> */}
        {/* ================================================================================================ */}
        <Grid item xs={12} md={12} lg={12}>
          {/* <HeaderResource heading="General Information" /> */}
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Start Date</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.date || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>End Date</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.customerName || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Id</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.customerTicketNumber || "_ _"}</Typography>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Status</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogentCaseNumber}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogentWorkOrder}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Client Partner Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm ContNum</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm ContNum</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sdm Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}> Cog Sdm Num</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sdm Cont</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sd Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sd ContNum</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Agreed Sla</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Coverage</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Technology Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Support Model</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Talent Level</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cancel Policy</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Dispatch Agreed</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Increment Time</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Sow</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Sow Desc</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>OwJd</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Deliv</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>SsInst</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>AsInst</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tools Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Named Worker</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Assigned Worker</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Technical Skill</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Beh Skills</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Experience Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Lang Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Train Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Train Doc</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Req Tools</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Req Soft</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Spec Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl1ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl1ec</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl2ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl2ec</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cgl1ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cgl1ec</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cfl2ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cgl2ec</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
            </Grid>
          </Grid>
          
        </Grid>
      </Box>
    </Container>
  );
}
