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
import { MainListItems, secondaryListItems } from '../common/ListItems';
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
import { ResourceCard } from '../common/ResourceCard';
import { Search } from '../common/Search';
import { ResourceTable } from '../resources/resource-table';



const mdTheme = createTheme();

export const AllResource = () => {
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        {/* Chart */}
        <Grid item xs={4} md={4} lg={3}>
          <ResourceCard />
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <ResourceCard />
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <ResourceCard />
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <ResourceCard />
        </Grid>

        {/* Recent Deposits */}

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', position: "relative" }}>
            {/* <Orders tableName="All Resources" search="search" /> */}
            <ResourceTable search="search"/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
