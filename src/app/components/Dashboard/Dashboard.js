import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
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
import { mainListItems , secondaryListItems } from '../common/ListItems';
import { Drawer } from '../common/Drawer';
import { AppBar } from '../common/AppBar';
import {Chart} from '../common/Chart';
import { Deposits } from '../common/Calendar';
import { Orders } from '../common/TableSchduel';
import { DashboardCard } from '../common/Card';
import { useQuery } from "@apollo/client";
import { Button } from '@mui/material';
import { ResourceForm } from './ResouceForm';

const mdTheme = createTheme();

export const DashboardContent = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);

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
                 color:"white"
                }}
              >
                <MenuIcon sx={{color:"white"}} />
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
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
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
                <ChevronLeftIcon sx={{color:"white"}} />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav" sx={{ background: "#1E1E2D",  color: "white"}}>
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={4} md={4} lg={4}>
                   <DashboardCard color="#3699FF" />
                </Grid>
                <Grid item xs={4} md={4} lg={4}>
                   <DashboardCard color="#242D60" />
                </Grid>
                <Grid item xs={4} md={4} lg={4}>
                   <DashboardCard color="#212121" />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 300,
                    }}
                  >
                    <Chart />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={6} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 300,
                    }}
                  >
                    <Deposits />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders tableName="Active Incidents" />
                  </Paper>
                </Grid>
               <Grid container spacing={2} sx={{mt:2}}>
               <Grid xs={6}>
              </Grid>
              <Grid xs={4}></Grid>
              <Grid xs={2}>              
                    <Button variant='contained' onClick={handleOpen} sx={{mt:2, paddingLeft:"35px", paddingRight:"35px", background:"#F64E60", color:"white", borderRadius:"12px"}}>Add</Button>
                    {openModal && 
                     <ResourceForm openModal={openModal} setOpenModal={setOpenModal} />
                     }
              </Grid>
                </Grid>  
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders tableName="Add Resources" />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
  