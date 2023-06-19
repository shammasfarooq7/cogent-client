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
import { DELETE_RESOURCE_MUTATION, GET_A_RESOURCE_QUERY } from '../../../graphql/resources';
import { getName, getNameFromUrl, getUrlNameforDwnload } from '../../helper';
import DeleteAlert from '../../components/common/DeleteAlert';
import { Alert } from '../../components/common/Alert';
import { downloadFile } from '../../services/rest-apis';


const mdTheme = createTheme();

export const ResourceProfile = () => {
    const navigate = useNavigate();
    const urlSearchParams = new URLSearchParams(window.location.search)
    const id = urlSearchParams?.get("id") || "";
  
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [openResourceForm, setOpenResourceForm] = useState(false);
  
    // const { data, loading, error, refetch } = useQuery(GET_A_RESOURCE_QUERY, {
    //   variables: {
    //     id
    //   },
    //   fetchPolicy: "network-only"
    // });
  
    // const [deleteResource, { loading: isDeleteLoading }] = useMutation(DELETE_RESOURCE_MUTATION)
  
  
    const info = ""
    const paymentInfo = info?.userPaymentMethod?.[0]
  
  
    const handleDeleteConfirm = async () => {
    //   await deleteResource({
    //     variables: {
    //       id
    //     }
    //   })
      Alert.success("Deleted Successfully!")
      setOpenDeleteAlert(false);
      navigate("/all-resource")
    }
  
    const handleUpdateClick = () => {
      setOpenResourceForm(true);
    };
  
    const handleDownloadClick = (url) => {
      downloadFile(getUrlNameforDwnload(url))
    }
  
    // if (!id) return <Navigate replace to={"/dashboard"} />
  
    // if (error)
    //   return (
    //     <Box padding={"30px"} sx={{ margin: "30px", border: "1px solid gray", borderRadius: "8px", background: "white" }}>
    //       {error?.message || "Something went wrong"}
    //     </Box>
    //   )

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, paddingLeft: "10px" }}>

      {/* <DeleteAlert
        open={openDeleteAlert}
        setOpen={setOpenDeleteAlert}
        handleConfirm={handleDeleteConfirm}
        isLoading={isDeleteLoading}
        title={"Delete Resource"}
        text={"Are you sure you want to delete this resource? This action cannot be revert back."}
      /> */}



      <Box sx={{ backgroundColor: "white", p: 2 }}>
        {/* Chart */}
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={4} md={4} lg={4} sx={{ display: "flex", flexDirection: "row" }}>
            <Avatar src="/static/images/avatar/1.jpg" variant="rounded" />
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography> {getName(info?.firstName, info?.middleName, info?.lastName) || "Brand Dennis"} </Typography>
              <Typography sx={{ fontSize: "9px" }}>{info?.id || "#1245636636"}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4} md={4} lg={5}>

          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            {/* <Button sx={{ color: "#7E8299", backgroundColor: "#F5F8FA", marginRight: "10px" }}
              onClick={() => { setOpenDeleteAlert(true) }}>Delete</Button> */}
            <Button variant="contained" onClick={handleUpdateClick}>Update</Button>
          </Grid>
        </Grid>
        <Divider />

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Personal Details" />
        </Grid>
        <Grid container >

          <Grid item xs={4} md={4} lg={3} >
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{getName(info?.firstName, info?.middleName, info?.lastName) || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>ID Card Type</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.idCardType || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>ID Card Attachment</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
              {getNameFromUrl(info?.identityDocUrl) || "_ _"}
              {info?.identityDocUrl &&
                <>
                  <a
                    href={info?.identityDocUrl}
                    style={{ color: '#543F3F', marginLeft: "20px", fontWeight: 400, fontSize: "10px", textDecorationLine: "none" }}
                    target='_blank'>Open</a>
                  <Button sx={{
                    fontFamily: 'Poppins', fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "15px", textDecorationLine: "underline",
                    color: "#EA3434", marginLeft: "2px",
                  }}
                    onClick={() => handleDownloadClick(info?.identityDocUrl)}>
                    Download
                  </Button>
                </>}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>TaxNumber</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Nationality</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.nationality || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Region</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.region || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Country</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.country || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>State</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.state || "_ _"}</Typography>
            </Grid >
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>City</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3} >
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Postal Code</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.postalCode || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Address Line 1</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.addressLine1 || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Address Line 2</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.addressLine2 || "_ _"}</Typography>
            </Grid >
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Email Address</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.email || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Mobile Number</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.mobileNumber || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Contact Number</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.contactNumber || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>WhatsApp Number</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.whatsappNumber || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>WhatsApp Group</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.whatsappGroup || "_ _"}</Typography>
            </Grid >
          </Grid>

          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>whatsapp Group Link</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.whatsappGroupLink || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cogent Email Id</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogentEmail || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>
              <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Work Permit Status</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.workPermitStatus || "_ _"}</Typography>
            </Grid >
            <Grid item xs={4} md={4} lg={3}>

            </Grid >
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Skill SET & TOOLS" />
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Skill Set</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
              {info?.skillSet?.length ? info?.skillSet?.join(", ") : "_ _"}
            </Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Available Tools</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
              {info?.availableTools?.length ? info?.availableTools?.join(", ") : "_ _"}
            </Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Resume/CV Attachment</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
              {getNameFromUrl(info?.resumeDocUrl) || "_ _"}
              {info?.resumeDocUrl &&
                <>
                  <a href={info?.resumeDocUrl}
                    style={{ color: '#543F3F', fontWeight: 400, fontSize: "10px", marginLeft: "20px", textDecorationLine: "none" }}
                    target='_blank'>Open</a>
                  <Button sx={{
                    fontFamily: 'Poppins', fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "15px", textDecorationLine: "underline",
                    color: "#EA3434", marginLeft: "2px",
                  }}
                    onClick={() => handleDownloadClick(info?.resumeDocUrl)}>
                    Download
                  </Button>
                </>}
            </Typography>

          </Grid >
          <Grid item xs={4} md={4} lg={1}>

          </Grid >
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="RATE" />
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Hourly Rate</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.hourlyRate || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Half Day Rate(4 hours)</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.halfDayRate || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Full Day Rate(8 hours)</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.fullDayRate || "_ _"}</Typography>

          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Monthly Rate</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.monthlyRate || "_ _"}</Typography>

          </Grid >
        </Grid>

        <Grid container>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Any Extra (Please Specify)</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.anyExtraRate || "_ _"}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="Payment" />
        </Grid>

        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Account Type</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{paymentInfo?.accountType || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Account Title</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{paymentInfo?.accountTitle || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Benificiary's Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}> {getName(paymentInfo?.beneficiaryFirstName, paymentInfo?.beneficiaryMiddleName, paymentInfo?.beneficiaryLastName) || "_ _"} </Typography>

          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Benificiary's Address</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{paymentInfo?.beneficiaryAddress || "_ _"}</Typography>
          </Grid >
        </Grid>

        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Account Number</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{paymentInfo?.accountNumber || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>IBAN</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{paymentInfo?.iban || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>BC/Swift</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{paymentInfo?.swiftCode || "_ _"}</Typography>

          </Grid >
          <Grid item xs={4} md={4} lg={3}>

          </Grid >
        </Grid>

        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Bank Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{paymentInfo?.bankName || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Branch Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{paymentInfo?.branchName || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Bank Address</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{paymentInfo?.bankAddress || "_ _"}</Typography>

          </Grid >
          <Grid item xs={4} md={4} lg={3}>

          </Grid >
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="MOBILITY AND TRANSPORT" />
        </Grid>

        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Mode of Transportation</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.transport || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Availability</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.availability || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Mobility (km)</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.mobility || "_ _"}</Typography>

          </Grid >
          <Grid item xs={4} md={4} lg={3}>

          </Grid >
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="CONTRACT STATUS" />
        </Grid>

        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Contract Documents</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.contractDocuments ? "TRUE" : "FALSE" || "_ _"}</Typography>
          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Onboarderd By</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{getName(info?.onboardedBy?.firstName, info?.onboardedBy?.middleName, info?.onboardedBy?.lastName) || "_ _"}</Typography>

          </Grid >
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Onboarderd Completed</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.isOnboarded ? "True" : "False"}</Typography>
          </Grid >
        </Grid>

        {/* Recent Deposits */}

      </Box>
    </Container>
  );
}
