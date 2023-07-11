import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Avatar, Typography, Button, Modal } from "@mui/material"
import { Navigate, useNavigate } from 'react-router-dom';
import { HeaderResource } from '../../components/common/HeaderResource';
import { useMutation, useQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { DELETE_TICKET_MUTATION, GET_A_TICKET_QUERY } from '../../../graphql/tickets';
import { getName, getNameFromUrl, getUrlNameforDwnload } from '../../helper';
import DeleteAlert from '../../components/common/DeleteAlert';
import { Alert } from '../../components/common/Alert';
import { SDForm } from '../../components/tickets/addTicket/AddTicketForm';
import { downloadFile } from '../../services/rest-apis';
import { renderStatus, getBorderColour } from '../../constants';

const style = {
  position: 'absolute',
  overflow: 'auto',
  top: '52%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  borderRadius: "10px",
  boxShadow: 24,
  height: "80%",
  width: "75%",
  backgroundColor: "white",
   p: 1.5,
   border:2

};

export const TicketDetails = ({ openModal, setOpenModal, info}) => {
  console.log("info", info)
  debugger
  const navigate = useNavigate();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);

  // const { data, loading, error, refetch } = useQuery(GET_A_TICKET_QUERY, {
  //   variables: {
  //     id
  //   },
  //   fetchPolicy: "network-only"
  // });


  const [deleteTicket, { loading: isDeleteLoading }] = useMutation(DELETE_TICKET_MUTATION)

  let ticketDateData = info?.ticketDates?.map((date) => {
    return new Date(date.date).toDateString();
  }).join(", ");


  const ticketReceiveDate = new Date(info?.ticketReceivedTime).toDateString();

  const ticketReceivedTime = new Date(info?.ticketReceivedTime).toTimeString();


  const handleDeleteConfirm = async () => {
    await deleteTicket({
      variables: {
          id: info?.id
      }
    })
    Alert.success("Deleted Successfully!")
    setOpenDeleteAlert(false);
    navigate("/all-resource")
  }

  const handleClose = () => setOpenModal(false);

  const handleDownloadClick = (url) => {
    downloadFile(getUrlNameforDwnload(url))
  }

  // if (error)
  //   return (
  //     <Box padding={"30px"} sx={{ margin: "30px", border: "1px solid gray", borderRadius: "8px", background: "white" }}>
  //       {error?.message || "Something went wrong"}
  //     </Box>
  //   )

  return (
    <Box sx={{ overflowY: "auto" }}>
         <DeleteAlert
        open={openDeleteAlert}
        setOpen={setOpenDeleteAlert}
        handleConfirm={handleDeleteConfirm}
        isLoading={isDeleteLoading}
        title={"Delete Resource"}
        text={"Are you sure you want to delete this resource? This action cannot be revert back."}
      />
         <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

      <Box sx={style}>

        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={4} md={4} lg={4} sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography sx={{fontWeight: 'bold'}}> Ticket# {getName(info?.id)} </Typography>
            </Box>
          </Grid>
          <Grid item xs={4} md={4} lg={5}>

          </Grid>
          <Grid item xs={4} md={4} lg={3}>
          <Box sx={{ display: "flex" }}>
        {/* <Button sx={{ color: "white", backgroundColor: "red", marginRight: "10px" }}
              onClick={() => { setOpenDeleteAlert(true) }}>Delete</Button> */}
                        <Box sx={{ position: "relative", left: "50%", top: "5px", cursor: "pointer" }} >
                            <CloseIcon onClick={handleClose} />
                        </Box>
                    </Box>
            {/* <Button variant="contained" onClick={handleUpdateClick}>Update</Button> */}
          </Grid>
        </Grid>
        <Divider />
        {/* ================================================================================================ */}
        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="General Information" />
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ticket Received Time</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketReceivedTime || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ticket Received Date</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketReceiveDate || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.customerName || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Ticket Number</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.customerTicketNumber || "_ _"}</Typography>
          </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cogent Case Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogentCaseNumber}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cogent Workoder Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogentWorkOrder || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Case#</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail?.customerCaseNumber}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ticket Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.ticketType}</Typography>
            </Grid>
              <Grid item xs={4} md={4} lg={3}>
                  <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Approved</Typography>
                  <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.isApproved ?  'True' : 'False'}</Typography>
              </Grid>
              <Grid item xs={4} md={4} lg={3}>
                  <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>External</Typography>
                  <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.isExternal ?  'True' : 'False'}</Typography>
              </Grid>
              <Grid item xs={4} md={4} lg={3}>
                  <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Current Status</Typography>
                  <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{renderStatus(info?.status)}</Typography>
              </Grid>
        </Grid>
        {/* //===================================================================================== */}

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Project Information" />
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Account Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.accountName}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Project Code</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail?.projectCode}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>SLA</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.slaPriority}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>End Client Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.endClientName}</Typography>
          </Grid>
          
        </Grid>

        {/* //================================================================================================ */}

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Service Details" />
        </Grid>
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.siteName}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Region</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.region}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Country</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.country}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>City</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.city}</Typography>
          </Grid>

         <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Address</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.siteAddress}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Province/State</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.provinceState}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Post Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.postCode}</Typography>
            </Grid>
         </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Access Insruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.siteAccessInstruction}</Typography>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Case#</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.customerCaseNumber}</Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Technology Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.technologyType}</Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Job Description/ Summary</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.jobSummary}</Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Case Details</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.caseDetails}</Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Scope of Work</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.scopeOfWork}</Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Insruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.instructions}</Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Additional Insruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.addInstruction}</Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Special Insruction</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.specialInstruction}</Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tools Requested</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketDateData}</Typography>
            </Grid>

            <Grid container sx={{ mt: 2 }}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Document</Typography>
                    <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
                        {getNameFromUrl(info?.serviceDocUrl) || "_ _"}
                        {info?.ticketDetail.serviceDocUrl &&
                            <>
                            <a href={info?.ticketDetail.serviceDocUrl}
                                style={{ color: '#543F3F', fontWeight: 400, fontSize: "10px", marginLeft: "20px", textDecorationLine: "none" }}
                                target='_blank'>Open</a>
                            <Button sx={{
                                fontFamily: 'Poppins', fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "15px", textDecorationLine: "underline",
                                color: "#EA3434", marginLeft: "2px",
                            }}
                                onClick={() => handleDownloadClick(info?.ticketDetail.serviceDocUrl)}>
                                Download
                            </Button>
                            </>}
                    </Typography>
                </Grid >

                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Hardware S/N</Typography>
                    <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.hardwareSN}</Typography>
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
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.serviceType.join(",")|| ""}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tools Requested</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.toolsRequested.join(",")|| ""}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tools Requested</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{ticketReceiveDate}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Level</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.serviceLevel}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Priority</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.servicePriority}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>SLA Priority</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDetail.slaPriority}</Typography>
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

            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Scheduled Time</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ticketDates?.[0].scheduledTime}</Typography>
            </Grid>
          </Grid>      
        </Grid>

        {/* ============================================================================================================================== */}

        {/* <Grid item xs={12} md={12} lg={12}>
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
        </Grid> */}

        {/* ============================================================================================================================== */}

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Files" />
        </Grid>
        <Grid container>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Attachment</Typography>

                {
                  info?.ticketDetail?.attachments?.map((attachment) => (
                      <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
                      {getNameFromUrl(attachment.url )}
                          <>
                            <a href={attachment.url}
                                style={{ color: '#543F3F', fontWeight: 400, fontSize: "10px", marginLeft: "20px", textDecorationLine: "none" }}
                                target='_blank'>Open</a>
                            <Button sx={{
                                fontFamily: 'Poppins', fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "15px", textDecorationLine: "underline",
                                color: "#EA3434", marginLeft: "2px",
                            }}
                                onClick={() => handleDownloadClick(attachment.url)}>
                                Download
                            </Button>
                          </>
                    </Typography>

                  ))

                }
              
            </Grid >           
        </Grid>

        {/* ============================================================================================================================== */}

      </Box>
      </Modal>
    </Box>
  );
}
