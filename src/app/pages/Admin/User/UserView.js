import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { getName } from '../../../helper';
import { UserContext } from '../../../context/user-context';
import { UpdatePassword } from '../../../components/common/UpdatePassword';


export const UserView = () => {

  const navigate = useNavigate();

  const [openSDForm, setOpenSDForm] = useState(false);
  const { user } = useContext(UserContext);
 


  return (
    <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
    {openSDForm && <UpdatePassword openModal={openSDForm} setOpenModal={setOpenSDForm}  />}

      <Box sx={{ backgroundColor: "white", p: 1.5}}>

        <Box  sx={{ mb: 2, display:'flex', justifyContent:'space-between' }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ paddingLeft: "5px" }}>
              <Typography sx={{fontWeight: 'bold'}}> User# {getName(user?.id)} </Typography>
            </Box>
          </Box>
          <Box>
          </Box>
        </Box>
    
        <Grid container>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>User ID</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{user?.id || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>User First Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{user?.firstName || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>User Middle Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{user?.middleName || "_ _"}</Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>User Last Name</Typography>
            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{user?.lastName || "_ _"}</Typography>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>User Email</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{user?.email}</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{ fontSize: "10px", color: "#7E8299" }}>User Role</Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>{user?.userRole.toUpperCase()}</Typography>
            </Grid>

          </Grid>
          
        </Grid>
      </Box>
      <Box sx={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
        <Box></Box>
        <Button variant='contained' onClick={()=> setOpenSDForm(true)}>Update Password</Button>
      </Box>
    </Container>
  );
}
