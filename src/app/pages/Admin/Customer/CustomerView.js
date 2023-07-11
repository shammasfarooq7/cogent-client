import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Avatar, Typography, Button, Modal } from "@mui/material"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { getName, getNameFromUrl, getUrlNameforDwnload } from '../../../helper';
import DeleteAlert from '../../../components/common/DeleteAlert';
import { Alert } from '../../../components/common/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { DELETE_TICKET_MUTATION } from '../../../../graphql/tickets';
import { GET_CUSTOMER_QUERY } from '../../../../graphql/admin';

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

export const CustomerView = ({openModal, setOpenModal, info}) => {
  console.log(info)
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);
  const { id } = useParams();
  const error =''
  const handleClose = () => setOpenModal(false);
  
  const [deleteTicket, { loading: isDeleteLoading }] = useMutation(DELETE_TICKET_MUTATION)

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
       <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
       >
      {/* {openTicketForm &&
        <SDForm
          openModal={openTicketForm}
          setOpenModal={setOpenTicketForm}
          editInfo={info}
          refetchResources={refetch} />} */}

      <Box sx={style}>

        <Box  sx={{ mb: 2, display:'flex', justifyContent:'space-between' }}>
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography sx={{fontWeight: 'bold'}}> Customer# {getName(info?.id)} </Typography>
            </Box>        
          <Box>
          <Box sx={{cursor:'pointer'}}>
                            <CloseIcon onClick={handleClose} />
                        </Box>
          </Box>
        </Box>
        {/* <Divider /> */}
        {/* ================================================================================================ */}
        <Grid item xs={12} md={12} lg={12}>
          {/* <HeaderResource heading="General Information" /> */}
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.name || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>vendor Refernce</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.vendorReference || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Website</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.website || "_ _"}</Typography>
          </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Establish Year</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.establishYear || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Employees Count</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.employeesCount || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Dispatch Group Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.dispatchGroupEmail || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>City</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Employee Count Linkedin</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.employeeCountLinkedin || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Phone</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.phone || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Country</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.country || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Post Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.postCode || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Linkedin Url</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.linkedinUrl || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}> Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.email || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>State Province</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.stateProvince || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Address</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.address || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Annual Revenue</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.annualRevenue || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue Software</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.revenueSoftware || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue Consultancy</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.revenueConsultancy || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue Support</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.revenueSupport || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue Logistics</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.revenueLogistics || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue Other</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.revenueOther || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Contact Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.contactNumber || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Address Line1</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.addressLine1 || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Address Line2</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.addressLine2 || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Email Id</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.emailId || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Mobile</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.mobile || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Whatsapp Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.whatsappNumber || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Whatsapp Group</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.whatsappGroup || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Whatsapp Link</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.whatsappLink || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cogent Email Id</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.cogentEmailId || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Work Permit city</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.workPermitStatus || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Primary Tech Service</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.primaryTechService || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Field Service</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.fieldService || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Key Customer Support</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.keyCustomerSupport || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Language Support</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.languageSupport}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Country Supported</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.countrySupported}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Certification</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.certification}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Abbriviation</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info.customerAbbr}</Typography>
            </Grid>          
        </Grid>
      </Box>
      </Modal>
    </Container>
  );
}
