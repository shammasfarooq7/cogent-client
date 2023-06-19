import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DashboardCard } from '../../components/common/Card';
import { useQuery } from "@apollo/client";
import { handleLogout } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { TaskBox } from '../../components/common/CustomTaskBox';
import { Calendar } from '../../components/common/Calendar';
import CurvedChart from './CurvedChart';
import SplineChart from './CurvedChart';


export const ResourcesDashboard = () => {

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(false);
  const [dashboardStat, setDashboardStat] = useState(null)
  const [ticketTableRefetch, setTicketTabelRefetch] = useState(null)

  const [todaysIncidentCount, setTodaysIncidentCount] = useState(4)
  const [inProgressCount, setInProgressCount] = useState(10)
  const [upcommingIncidentsCount, setUpcommingIncidentsCount] = useState(15)




  // useEffect(() => {
  //   if (data) {
  //     setDashboardStat(data.getDashboardStats);
  //   }
  // }, [data]);

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

        <Grid item xs={4} md={4} lg={4}>
          <DashboardCard hiring={todaysIncidentCount} text={"Today's Incidents"} color="#56A0C2" />
        </Grid>
        
        <Grid item xs={4} md={4} lg={4}>
          <DashboardCard hiring={inProgressCount} text={"Inprogress"} color="#242D60" />
        </Grid>
        
        <Grid item xs={4} md={4} lg={4}>
          <DashboardCard hiring={upcommingIncidentsCount} text={"Upcomming Incidents"} color="#212121" />
        </Grid>

        <Grid item xs={12} md={6}>
            <TaskBox taskName="Today's Task" />
        </Grid>
         
        <Grid item xs={12} md={6}>
            <Calendar />
        </Grid>
       
        <Grid item xs={12} md={6}>
            <TaskBox taskName="Tasks History" />
        </Grid>

        <Grid item xs={12} md={6}>
           <SplineChart />
        </Grid>
       
      </Grid>
    </Box>
  );
}
