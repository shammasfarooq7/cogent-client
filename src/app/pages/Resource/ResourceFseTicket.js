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
import { SDForm } from '../../components/tickets/addTicket/AddTicketForm';
import { AddBoxOutlined } from '@mui/icons-material';
import { ResourceForm } from './ResourceForm';


export const ResourceFseTicket = () => {

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
          refetchResources={refetch} />}

      <Box sx={{ backgroundColor: "white", p: 1.5, border:2, borderColor: getBorderColour(info?.status)}}>

        <Box  sx={{ mb: 2, display:'flex', justifyContent:'space-between' }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography sx={{fontWeight: 'bold'}}> Ticket# {getName(info?.id)} </Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button  sx={{mr:'10px', backgroundColor:'#50CD89', color:'white', textTransform:'capitalize'}} >Generate Invoice</Button>
            <Button onClick={handleUpdateClick}
             sx={{mr:'10px', backgroundColor:'#00A3FF', color:'white',textTransform:'capitalize'}} >Update Time</Button>
            </Box>
          </Box>
        </Box>
        {/* <Divider /> */}
        {/* ================================================================================================ */}
        <Grid item xs={12} md={12} lg={12}>
          {/* <HeaderResource heading="General Information" /> */}
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ticket Received Time</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.time || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ticket Received Date</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.date || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.customerName || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Ticket Number</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.customerTicketNumber || "_ _"}</Typography>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cogent Case Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogentCaseNumber}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cogent Workoder Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogentWorkOrder}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Current Status</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{renderStatus(info?.status)}</Typography>
            </Grid>
          </Grid>
          
        </Grid>
        {/* //===================================================================================== */}

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Project Information" />
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Account Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.accountName}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Project Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.project}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>SLA</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.slaPriority}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>End Client Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.endClientName}</Typography>
          </Grid>
          
        </Grid>

        {/* //================================================================================================ */}

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Service Details" />
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.siteName}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Region</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.region}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Country</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.country}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>City</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city}</Typography>
          </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Address</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.siteAddress}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Province/State</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.provinceState}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Post Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.postCode}</Typography>
            </Grid>
         </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Access Insruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.siteAccessInstruction}</Typography>
            </Grid>
         </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={6} md={6} lg={6}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Case#</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.customerCaseNumber}</Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Technology Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.technologyType}</Typography>
            </Grid>
         </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Job Description/ Summary</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.jobSummary}</Typography>
            </Grid>
         </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Case Details</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.caseDetails}</Typography>
            </Grid>
         </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Scope of Work</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.scopeOfWork}</Typography>
            </Grid>
         </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Insruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.instructions}</Typography>
            </Grid>
         </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Additional Insruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.addInstruction}</Typography>
            </Grid>
         </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Special Insruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.specialInstruction}</Typography>
            </Grid>
         </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tools Requested</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.toolsRequested.join(", ")}</Typography>
            </Grid>
         </Grid>

            <Grid container sx={{ mt: 2 }}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Document</Typography>
                    <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
                        {getNameFromUrl(info?.serviceDocUrl) || "_ _"}
                        {info?.serviceDocUrl &&
                            <>
                            <a href={info?.serviceDocUrl}
                                style={{ color: '#543F3F', fontWeight: 400, fontSize: "10px", marginLeft: "20px", textDecorationLine: "none" }}
                                target='_blank'>Open</a>
                            <Button sx={{
                                fontFamily: 'Poppins', fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "15px", textDecorationLine: "underline",
                                color: "#EA3434", marginLeft: "2px",
                            }}
                                onClick={() => handleDownloadClick(info?.serviceDocUrl)}>
                                Download
                            </Button>
                            </>}
                    </Typography>
                </Grid >

                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Hardware S/N</Typography>
                    <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.hardwareSN}</Typography>
                </Grid>
            </Grid>
        </Grid>

        {/* //================================================================================================ */}

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Service Schedule" />
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Type</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.serviceType}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Level</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.serviceLevel}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Priority</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.servicePriority}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>SLA Priority</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.slaPriority}</Typography>
          </Grid>

          <Grid container sx={{mt: 2}}>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Default Number of Hours Requested</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.numberOfHoursReq}</Typography>
            </Grid>

            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Number of Resource Requested</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.numberOfResource}</Typography>
            </Grid>
          </Grid>      
        </Grid>

        {/* ============================================================================================================================== */}

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Visit Type" />
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>End Client Appointment Setup</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>Cogent to setup appointment with end client </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Dispatch Now</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>SBD</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Scheduled for Later</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>00:00 AM/PM</Typography>
          </Grid>    
        </Grid>

        {/* ============================================================================================================================== */}

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Files" />
        </Grid>
        <Grid container>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Attachment</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
                    {getNameFromUrl(info?.attachments) || "_ _"}
                    {info?.attachments &&
                        <>
                        <a href={info?.attachments}
                            style={{ color: '#543F3F', fontWeight: 400, fontSize: "10px", marginLeft: "20px", textDecorationLine: "none" }}
                            target='_blank'>Open</a>
                        <Button sx={{
                            fontFamily: 'Poppins', fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "15px", textDecorationLine: "underline",
                            color: "#EA3434", marginLeft: "2px",
                        }}
                            onClick={() => handleDownloadClick(info?.attachments)}>
                            Download
                        </Button>
                        </>}
                </Typography>
            </Grid >           
        </Grid>

        {/* ============================================================================================================================== */}

      </Box>
    </Container>
  );
}
