import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DashboardCard } from '../../components/common/Card';
import { useQuery } from "@apollo/client";
import { handleLogout } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { TaskBox } from '../../components/common/CustomTaskBox';
import { CustomerTable } from './CustomerTable';
import { GET_DASHBOARD_CUSTOMERS_STATS } from '../../../graphql/resources';


export const CustomerDashboard = () => {

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(false);
  const [dashboardStat, setDashboardStat] = useState(null)
  const [ticketTableRefetch, setTicketTabelRefetch] = useState(null)



  const { data, loading, error } = useQuery(GET_DASHBOARD_CUSTOMERS_STATS, {

    fetchPolicy: "network-only"
  });
  
     useEffect(() => {
    if(data){
      const {getDashboardStatsCustomerTicket} = data && data
      setDashboardStat(data.getDashboardStatsCustomerTicket);
     }
  }, [data]);

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
          <DashboardCard hiring={dashboardStat?.projectCount} text={"Today's Incidents"} color="#56A0C2" />
        </Grid>
        
        <Grid item xs={4} md={4} lg={4}>
          <DashboardCard hiring={dashboardStat?.inProgressCount} text={"Inprogress"} color="#242D60" />
        </Grid>
        
        <Grid item xs={4} md={4} lg={4}>
          <DashboardCard hiring={dashboardStat?.futureCount} text={"Upcomming Incidents"} color="#212121" />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
          <CustomerTable tableName="All Project" buttonText=""  {...{ ticketTableRefetch, setTicketTabelRefetch, todays:true}} />
          </Paper>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid xs={6}>
          </Grid>
          <Grid xs={4}></Grid>
          <Grid xs={2}>

          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TaskBox taskName="All Tickets" buttonText="Create" />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <TaskBox taskName="Today's Tickets" todays= {true} />
        </Grid>
      </Grid>
    </Box>
  );
}
