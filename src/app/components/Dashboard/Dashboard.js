import { useState } from 'react';
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
import cogentLogo from '../../assets/images/Cogent Logo.png';
import cogentTextLogo from '../../assets/images/Cogent Text Logo.png';
import { ResourceTable } from '../resources/resource-table';
import { useEffect } from 'react';
import { Get_RMS_Dashboard_Stats } from '../../../graphql/resources';
import { RequestUsersTable } from '../requestUsers/request-users-table';


const mdTheme = createTheme();

export const DashboardContent = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [openModal, setOpenModal] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(false);
  const [dashboardStat, setDashboardStat] = useState(null)
  const [resourceTableRefetch, setResourceTabelRefetch] = useState(null)

  const { data, loading, error } = useQuery(Get_RMS_Dashboard_Stats, {

    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if (data) {
      setDashboardStat(data.getRMSDashboardStats);
    }
  }, [data]);

  let newHiringCount = 0;
  let newRequestCount = 0;
  let totalResourceCount = 0;

  if (dashboardStat) {
    newHiringCount = dashboardStat.newHiringCount < 10 && dashboardStat.newHiringCount > 0 ? `0${dashboardStat.newHiringCount}` : dashboardStat.newHiringCount;
    newRequestCount = dashboardStat.newRequestCount < 10 && dashboardStat.newRequestCount > 0 ? `0${dashboardStat.newRequestCount}` : dashboardStat.newRequestCount;
    totalResourceCount = dashboardStat.totalResourceCount < 10 && dashboardStat.totalResourceCount > 0 ? `0${dashboardStat.totalResourceCount}` : dashboardStat.totalResourceCount;
  }

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
    <Box padding={"30px"}>

      <Grid container spacing={"30px"}>
        {/* Chart */}
        <Grid item xs={4} md={4} lg={4}>
          <DashboardCard hiring={newHiringCount} text={"New Hiring"} color="#56A0C2" />
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <DashboardCard hiring={newRequestCount} text={"New Requests"} color="#242D60" />
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <DashboardCard hiring={totalResourceCount} text={"Total Resources"} color="#212121" />
        </Grid>
        {/* <Grid item xs={12} md={6} lg={6}>
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
        </Grid> */}
        {/* Recent Deposits */}
        {/* <Grid item xs={12} md={6} lg={6}>
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
        </Grid> */}
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {/* <Orders tableName="Active Incidents" /> */}
            <RequestUsersTable {...{ resourceTableRefetch }} />
          </Paper>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid xs={6}>
          </Grid>
          <Grid xs={4}></Grid>
          <Grid xs={2}>

          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {/* <Orders tableName="Add Resources" /> */}
            <ResourceTable  {...{ resourceTableRefetch, setResourceTabelRefetch }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
