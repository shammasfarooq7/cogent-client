import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { HeaderResource } from '../../components/common/HeaderResource';
import { getName, getUrlNameforDwnload } from '../../helper';
import { Alert } from '../../components/common/Alert';
import { downloadFile } from '../../services/rest-apis';


const mdTheme = createTheme();

export const CustomerProfile = () => {
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
          <Grid item xs={4} md={12} lg={12} sx={{  }}>
            <Box sx={{ paddingLeft: "5px",display: "flex", justifyContent:'space-between', alignItems:'center' }}>
              <Typography sx={{fontWeight:'600', fontSize:'19px'}}> {"Customer Form"} </Typography>
              <Button sx={{background:'#00A3FF', padding:'5px 20px', textTransform:'capitalize', color:'white', borderRadius:'6px','&:hover': {
                backgroundColor: '#00A3FF'
              }}} onClick={handleUpdateClick}>Update</Button>
            </Box>
          </Grid>
        </Grid>
        <Divider />

        <Grid item xs={12} md={12} lg={12}>
          <HeaderResource heading="COMPANY OVERVIEW" />
        </Grid>
        <Grid container >

          <Grid item xs={4} md={3} lg={3} >
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{getName(info?.firstName, info?.middleName, info?.lastName) || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Vendor Reference</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.idCardType || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Website</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Established Year</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Number of Employees on LinkedIn</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company LinkedIn URL</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Number of Employees</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Phone</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Email</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Dispatch Group Email</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Country</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company State/Province</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company City</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Postal Code</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Address</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Annual Revenue US($) Total</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue (Hardware Sales)%</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue(Software & Development)%</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue(Professional & Consultancy)%</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue (Technical Support Services)%</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue (Logistics Services)%</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Revenue(Others)%</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>         
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
          </Grid>

          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Industry</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}></Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}></Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}></Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Overview</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.anyExtraRate || "_ _"}</Typography>
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Overview</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.anyExtraRate || "_ _"}</Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Overview(Key Field Services Customers Supported)</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.anyExtraRate || "_ _"}</Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Overview(Key Customer Support)</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.anyExtraRate || "_ _"}</Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Languages Supported</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.anyExtraRate || "_ _"}</Typography>
          </Grid>

          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Supported Countries</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}></Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}></Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}></Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   
          
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Company Certifications</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}></Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}></Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>   
          <Grid item xs={4} md={3} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}></Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.taxNumber || "_ _"}</Typography>
          </Grid>  
          </Grid>

        {/* Recent Deposits */}

      </Box>
    </Container>
  );
}
