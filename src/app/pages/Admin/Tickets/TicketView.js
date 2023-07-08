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
import { useParams } from 'react-router-dom';
import { DELETE_TICKET_MUTATION } from '../../../../graphql/tickets';
import { GET_TICKET_QUERY } from '../../../../graphql/admin';


export const TicketView = () => {

  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);
  const { id } = useParams();
   console.log("id", id)
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

    const { data : ticketData, loading: ticketLoading } = useQuery(GET_TICKET_QUERY, {
        variables: {
             id
        },
        fetchPolicy: "network-only"
    });
    console.log("ticketData",ticketData)
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
      {
        ticketLoading ? 
        <> ...Loading</>
        :
        <Box sx={{ backgroundColor: "white", p: 1.5, border:2, borderColor: getBorderColour(info?.city)}}>

        <Box  sx={{ mb: 2, display:'flex', justifyContent:'space-between' }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography sx={{fontWeight: 'bold'}}> Ticket# {getName(ticketData?.getTicket?.id)} </Typography>
            </Box>
          </Box>
          <Box>
          </Box>
        </Box>
        {/* <Divider /> */}
        {/* ================================================================================================ */}
        <Grid item xs={12} md={12} lg={12}>
          {/* <HeaderResource heading="General Information" /> */}
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ticket Id</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.id || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Ticket Number</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.customerTicketNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.customerName || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cogent Case Number</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.cogentCaseNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cogent Work Order Number</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.cogentWorkOrderNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ticket Type</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.ticketType || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Status </Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.status || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Number Of Hours Req </Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.numberOfHoursReq || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Number Of Resource</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.numberOfResource || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ticket Detail Id</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.ticketDetailId || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ticket Received Time</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.ticketReceivedTime || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Project Id</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.projectId || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>JobSite Id</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.jobSiteId || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Id</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.customerId || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Account Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.accountName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>End Client Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.endClientName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Spoc Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Spoc Contact Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.spocContactNumber || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Spoc Email Address</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.spocEmailAddress || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Access Instruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.siteAccessInstruction || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer CaseNumber</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.customerCaseNumber || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Job Summary</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.jobSummary || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Case Details</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.caseDetails || "_ _" }</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Scope Of Work</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.scopeOfWork || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Instructions</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.instructions || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Add Instruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.addInstruction || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Special Instruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.specialInstruction || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Hardware SN</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.hardwareSN || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Project Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.projectCode || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.siteName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Country</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.country || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>City</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.city || "_ _"}</Typography>
            </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Province</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.accountName || "_ _"}</Typography>
          </Grid>
         
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Special Instruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.specialInstruction || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Hardware SN</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.hardwareSN || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Project Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.projectCode || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.siteName || "_ _"}</Typography>
            </Grid>

            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Post Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.postCode || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Address</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.siteAddress || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tools Requested</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.toolsRequested || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Created At</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.createdAt || "_ _"}</Typography>
            </Grid>
           
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Updated At</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketData?.getTicket?.updatedAt}</Typography>
            </Grid>
          </Grid>
      </Box>
      }  
    </Container>
  );
}
