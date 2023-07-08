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
import { GET_JOB_QUERY } from '../../../../graphql/admin';


export const JobsView = () => {

  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);


  const error =''
  const refetch = ''
    const { id } = useParams();
     const { data : jobData, loading: jobLoading } = useQuery(GET_JOB_QUERY, {
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
              <Typography sx={{fontWeight: 'bold'}}> job# {getName(jobData?.getJobsite?.id)} </Typography>
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
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.name || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Country</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.country || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>City</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.city || "_ _"}</Typography>
          </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>State</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.state || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Province</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.province || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Post Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.code || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Address</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.siteAddress || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Poc Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.pocName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Poc Contact Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.pocContactNumber || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Poc Email Adrress</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.pocEmailAdrress || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe1h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.ppe1h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe2h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.ppe2h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe3h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.ppe3h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe4h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.ppe4h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe5h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.ppe5h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe6h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.ppe6h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe7h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.ppe7h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe8h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.ppe8h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tandm30</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.tandm30 || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tandm1h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.tandm1h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Afth</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.afth || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Wknd</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.wknd || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ph</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.ph || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Sat</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.sat || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Sun</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.sun || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Timing</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.siteTiming || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Time Zone</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.timeZone || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Dispatch Agreed</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.dispatchAgreed || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Increment Time</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.incrementTime || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.serviceType || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Support Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.supportType || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service CatItem</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.serviceCatItem || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Agreed Sla</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.agreedSla || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Coverage</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.coverage || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Technology Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.technologyType || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Currency</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.currency || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Project Id</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{jobData?.getJobsite?.projectId || "_ _"}</Typography>
            </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
