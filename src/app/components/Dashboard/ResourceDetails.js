import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, MenuItem, Typography, Menu, Button } from "@mui/material"
import { mainListItems, secondaryListItems } from '../common/ListItems';
import { Drawer } from '../common/Drawer';
import { AppBar } from '../common/AppBar';
import { Chart } from '../common/Chart';
import { Deposits } from '../common/Calendar';
import { Orders } from '../common/TableSchduel';
import { DashboardCard } from '../common/Card';
import { useQuery } from "@apollo/client";
import { ResourceForm } from './ResouceForm';
import { handleLogout } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { HeaderResource } from '../common/HeaderResource';


const mdTheme = createTheme();

export const ResourceDetails = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [openModal, setOpenModal] = React.useState(false);
  const [profileAnchor, setProfileAnchor] = React.useState(false);

  const handleOpen = () => setOpenModal(true);

  const handleProfileClick = (e) => {
    setProfileAnchor(e.currentTarget)
  }
  const handleProfileClose = () => {
    setProfileAnchor(null)
  }

  const handleSignOut = () => {
    handleLogout();
    navigate("/login")
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flListItemsex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
                color: "white"
              }}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>

            <Box display={"flex"} justifyContent={"space-between"} >

              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Box marginLeft={1}>
                <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={profileAnchor}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(profileAnchor)}
                  onClose={handleProfileClose}
                >
                  <MenuItem onClick={handleProfileClose}>
                    <Button textAlign="center" variant="text" color='error' size='small'
                      onClick={handleSignOut}>Sign Out</Button>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],

            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" sx={{ background: "#1E1E2D", color: "white" }}>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 , paddingLeft:"10px"}}>
            <Box  sx={{backgroundColor:"white" , p:2}}>
              {/* Chart */}
              <Grid container sx={{mb:2}}>
              <Grid item xs={4} md={4} lg={4} sx={{display: "flex", flexDirection:"row"}}>
                <Avatar  src="/static/images/avatar/1.jpg" variant="rounded" /> 
               <Box sx={{paddingLeft:"5px"}}>
               <Typography>Bad Dennis</Typography> 
               <Typography sx={{fontSize:"9px"}}>#11122222222</Typography> 
                </Box>           
              </Grid>
              <Grid item xs={4} md={4} lg={5}>
               
              </Grid>
              <Grid item xs={4} md={4} lg={3}>
              <Button sx={{color:"#7E8299", backgroundColor:"#F5F8FA" , marginRight:"10px"}}>Delete</Button>
              <Button variant="contained">Update</Button>
              </Grid>
              </Grid>
              <Divider />
              <Grid item xs={12} md={12} lg={12}>
              <HeaderResource heading="General Information" />
              </Grid>
              <Grid item xs={4} md={4} lg={12} sx={{display:"flex", justifyContent:"space-between"}}>
                <Box>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Status</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Box>
                <Box>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Vendor Name</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Box>
                <Box>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>RPOC Name</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Box>
                <Box>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>RPOC Email</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Box>
                <Box>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>RPOC Contact Number</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
              <HeaderResource heading="Personal Details" />
              </Grid>
              <Grid container >
             
                <Grid item xs={4} md={4} lg={3} >
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Name</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>ID Card Number</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>TaxNumber</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Nationality</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid>
                    
                <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Region</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Country</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>State</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>City</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                </Grid>
          
                <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3} >
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Postal Code</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Address Line 1</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Address Line 2</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Email Address</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
               </Grid>
            

                <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Mobile Number</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Contact Number</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>WhatsApp Number</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{fontSize:"10px", color :"#7E8299"}}>WhatsApp Group</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
             </Grid>

              <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>whatsapp Group Link</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Cogent Email Id</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Work Permit Status</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                
                </Grid >
                </Grid>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
              <HeaderResource heading="Skill SET & TOOLS" />
              </Grid>
              <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Mobile Number</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Contact Number</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Attachment</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                    
                </Grid >
                <Grid item xs={4} md={4} lg={1}>
              
                </Grid >
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
              <HeaderResource heading="Skill SET & TOOLS" />
              </Grid>
              <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Hourly Rate</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Half Day Rate(4 hours)</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Half Day Rate(8 hours)</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                    
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Monthly Rate</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                    
                </Grid >
                </Grid>

                <Grid container>
             <Grid item xs={12} md={12} lg={12} sx={{mt:2}}>
             <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Any Extra (Please Specify)</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.</Typography>
             </Grid>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
              <HeaderResource heading="Payment" />
              </Grid>

              <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Account Type</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Account Title</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Benificiary's Name</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                    
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Benificiary's Address</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>     
                </Grid >
                </Grid>

                <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Account Number</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>IBAN</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>BC/Swift</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                    
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
               
                </Grid >
                </Grid>

                <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Bank Name</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Branch Name</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Bank Address</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                    
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
               
                </Grid >
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
              <HeaderResource heading="MOBILITY AND TRANSPORT" />
              </Grid>

              <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Mode of Transportation</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Availability</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Mobility (km)</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                    
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                   
                </Grid >
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
              <HeaderResource heading="CONTRACT STATUS" />
              </Grid>

              <Grid container sx={{mt:2}}>
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>NDA Status</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>B2b Status</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                    <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Onboarderd By</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                    
                </Grid >
                <Grid item xs={4} md={4} lg={3}>
                <Typography sx={{fontSize:"10px", color :"#7E8299"}}>Onboarderd Completed</Typography>
                    <Typography sx={{fontSize:"10px", fontWeight:"600"}}>lorem ipsum</Typography>
                </Grid >
                </Grid>
            
              {/* Recent Deposits */}
            
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
