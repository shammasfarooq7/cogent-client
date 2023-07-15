import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Avatar, Typography, Button, Modal } from "@mui/material"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { getName, getNameFromUrl, getUrlNameforDwnload } from '../../../helper';
import DeleteAlert from '../../../components/common/DeleteAlert';
import { Alert } from '../../../components/common/Alert';
import { downloadFile } from '../../../services/rest-apis';
import { DELETE_TICKET_MUTATION } from '../../../../graphql/tickets';

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

export const ProjectView = ({openModal, setOpenModal, info}) => {

  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);


  const error =''
    const { id } = useParams();
 
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
  const handleClose = () => setOpenModal(false);

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
          <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
       >

     <Box  sx={style}>
        <Box  sx={{ mb: 2, display:'flex', justifyContent:'space-between' }}>
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography sx={{fontWeight: 'bold'}}> Project# {getName(info.id)} </Typography>
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
        <Grid container>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Start Date</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.startDate || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>End Date</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.endDate || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Customer Id</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.customerId || "_ _"}</Typography>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Status</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.status || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.name || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Client Partner Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.clientPartnerName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.custSdmName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.custSdmEmail || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm ContNum</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.custSdmContNum || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.custSdmEmail || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cust Sdm ContNum</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.custSdmContNum || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sdm Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogSdmName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}> Cog Sdm Num</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogSdmNum || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sdm Cont</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogSdmCont || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sd Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogSdEmail || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cog Sd ContNum</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cogSdContNum || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Agreed Sla</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Coverage</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Technology Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Support Model</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Talent Level</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cancel Policy</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cancelPolicy || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Dispatch Agreed</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.dispatchAgreed || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Increment Time</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.incrementTime || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Sow</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.sow || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Sow Desc</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.sowDesc || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>OwJd</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.owJd || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Delivery</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.serviceDeliv || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>SsInst</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ssInst || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>AsInst</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.AsInst || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tools Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.toolsReq || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Named Worker</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.namedWorker || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Assigned Worker</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.assignedWorker || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Technical Skill</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.technicalSkill || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Beh Skills</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.behSkills || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Experience Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.experienceReq || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Lang Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.langReq || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Train Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.trainReq || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Train Doc</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.trainDoc || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Req Tools</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.reqTools || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Req Soft</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.reqSoft || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Spec Req</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.specReq || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl1ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cl1ee || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl1ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cl1ee || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl2ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cl2ee || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cl2ec</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cl2ec || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cgl1ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cgl1ee || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cgl1ec</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cgl1ec || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cfl2ee</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cfl2ee || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Cgl2ec</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.cgl2ec || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.code || "_ _"}</Typography>
            </Grid>
          </Grid>
          
        </Grid>
      </Box>
      </Modal>
    </Container>
  );
}
