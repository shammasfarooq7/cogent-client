import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Avatar, Typography, Button } from "@mui/material"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { getName, getNameFromUrl, getUrlNameforDwnload } from '../../../helper';
import DeleteAlert from '../../../components/common/DeleteAlert';
import { Alert } from '../../../components/common/Alert';
import { downloadFile } from '../../../services/rest-apis';
import { rendercity, getBorderColour } from '../../../constants';
import { AddBoxOutlined } from '@mui/icons-material';
import { HeaderResource } from '../../../components/common/HeaderResource';
import { DELETE_TICKET_MUTATION } from '../../../../graphql/tickets';
import { GET_CUSTOMER_QUERY } from '../../../../graphql/admin';


export const CustomerView = () => {

  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);
  const { id } = useParams();
   console.log("id", id)

  const error =''

    const { data : customerData, loading: customerLoading } = useQuery(GET_CUSTOMER_QUERY, {
      variables: {
           id
      },
      fetchPolicy: "network-only"
  });

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

      <Box sx={{ backgroundColor: "white", p: 1.5, border:2}}>

        <Box  sx={{ mb: 2, display:'flex', justifyContent:'space-between' }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography sx={{fontWeight: 'bold'}}> Customer# {getName(customerData?.getCustomer?.id)} </Typography>
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
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.name || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>vendor Refernce</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.vendorReference || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Website</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.website || "_ _"}</Typography>
          </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Establish Year</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.establishYear || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Employees Count</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.employeesCount || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Dispatch Group Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.dispatchGroupEmail || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>City</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Employee Count Linkedin</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.employeeCountLinkedin || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Phone</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.phone || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Country</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.country || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Post Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.postCode || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Linkedin Url</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.linkedinUrl || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}> Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.email || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>State Province</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.stateProvince || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Address</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.address || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Annual Revenue</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.annualRevenue || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue Software</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.revenueSoftware || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue Consultancy</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.revenueConsultancy || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue Support</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.revenueSupport || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue Logistics</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.revenueLogistics || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue Other</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.revenueOther || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Contact Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.contactNumber || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Address Line1</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.addressLine1 || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Address Line2</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.addressLine2 || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Email Id</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.emailId || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Mobile</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.mobile || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Whatsapp Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.whatsappNumber || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Whatsapp Group</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.whatsappGroup || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Whatsapp Link</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.whatsappLink || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cogent Email Id</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.cogentEmailId || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Work Permit city</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.workPermitStatus || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Primary Tech Service</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.primaryTechService || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Field Service</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.fieldService || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Key Customer Support</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.keyCustomerSupport || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Language Support</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.languageSupport}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Country Supported</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.countrySupported}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Certification</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.certification}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Abbriviation</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{customerData?.getCustomer.customerAbbr}</Typography>
            </Grid>          
        </Grid>
      </Box>
    </Container>
  );
}
