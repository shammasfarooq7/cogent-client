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
import CloseIcon from '@mui/icons-material/Close';
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

export const JobsView = ({openModal, setOpenModal, info}) => {

  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);


  const error =''
  const refetch = ''
    const { id } = useParams();

  const handleClose = () => setOpenModal(false);

  if (error)
    return (
      <Box padding={"30px"} sx={{ margin: "30px", border: "1px solid gray", borderRadius: "8px", background: "white" }}>
        {error?.message || "Something went wrong"}
      </Box>
    )

  return (
    <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
     <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
       >


      <Box sx={style}>

        <Box  sx={{ mb: 2, display:'flex', justifyContent:'space-between' }}>
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography sx={{fontWeight: 'bold'}}> job# {getName(info?.id)} </Typography>
            </Box>
          <Box sx={{cursor:'pointer'}}>
                            <CloseIcon onClick={handleClose} />
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
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.name || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Country</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.country || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>City</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.city || "_ _"}</Typography>
          </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>State</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.state || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Province</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.province || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Post Code</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.code || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Address</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.siteAddress || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Poc Name</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.pocName || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Poc Contact Number</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.pocContactNumber || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Poc Email Adrress</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.pocEmailAdrress || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe1h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ppe1h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe2h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ppe2h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe3h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ppe3h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe4h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ppe4h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe5h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ppe5h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe6h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ppe6h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe7h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ppe7h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ppe8h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ppe8h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tandm30</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.tandm30 || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Tandm1h</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.tandm1h || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Afth</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.afth || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Wknd</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.wknd || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Ph</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.ph || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Sat</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.sat || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Sun</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.sun || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Site Timing</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.siteTiming || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Time Zone</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.timeZone || "_ _"}</Typography>
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
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.serviceType || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Support Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.supportType || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Service CatItem</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.serviceCatItem || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Agreed Sla</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.agreedSla || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Coverage</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.coverage || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Technology Type</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.technologyType || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Currency</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.currency || "_ _"}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3} sx={{marginTop:'10px'}}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>Project Id</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{info?.projectId || "_ _"}</Typography>
            </Grid>
        </Grid>
      </Box>
      </Modal>
    </Container>
  );
}
