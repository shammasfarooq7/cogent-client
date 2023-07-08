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
import { GET_PROJECT_QUERY } from '../../../../graphql/admin';


export const ProjectView = () => {

  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);


  const error =''
    const { id } = useParams();
 
     const { data : projectData, loading: projectLoading } = useQuery(GET_PROJECT_QUERY, {
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
              <Typography sx={{fontWeight: 'bold'}}> Project# {getName(projectData?.getProject.id)} </Typography>
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
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Start Date</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.startDate || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>End Date</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.endDate || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Id</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.customerId || "_ _"}</Typography>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Status</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.status || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.name || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Client Partner Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.clientPartnerName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.custSdmName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.custSdmEmail || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm ContNum</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.custSdmContNum || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.custSdmEmail || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm ContNum</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.custSdmContNum || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sdm Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cogSdmName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}> Cog Sdm Num</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cogSdmNum || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sdm Cont</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cogSdmCont || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sd Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cogSdEmail || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sd ContNum</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cogSdContNum || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Agreed Sla</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Coverage</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Technology Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Support Model</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Talent Level</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cancel Policy</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cancelPolicy || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Dispatch Agreed</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.dispatchAgreed || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Increment Time</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.incrementTime || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Sow</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.sow || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Sow Desc</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.sowDesc || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>OwJd</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.owJd || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Delivery</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.serviceDeliv || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>SsInst</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.ssInst || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>AsInst</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.AsInst || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tools Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.toolsReq || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Named Worker</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.namedWorker || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Assigned Worker</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.assignedWorker || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Technical Skill</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.technicalSkill || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Beh Skills</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.behSkills || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Experience Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.experienceReq || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Lang Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.langReq || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Train Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.trainReq || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Train Doc</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.trainDoc || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Req Tools</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.reqTools || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Req Soft</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.reqSoft || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Spec Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.specReq || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl1ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cl1ee || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl1ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cl1ee || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl2ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cl2ee || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl2ec</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cl2ec || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cgl1ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cgl1ee || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cgl1ec</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cgl1ec || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cfl2ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cfl2ee || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cgl2ec</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.cgl2ec || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{projectData?.getProject?.code || "_ _"}</Typography>
            </Grid>
          </Grid>
          
        </Grid>
      </Box>
    </Container>
  );
}
