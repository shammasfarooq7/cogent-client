import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DashboardCard } from '../../components/common/Card';
import { useQuery } from "@apollo/client";
import { handleLogout } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { ServiceDeskTable } from './serviceDesk-table';
import { GET_SD_DASHBOARD_STATS } from '../../../graphql/tickets';


export const ServiceDesk = () => {

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(false);
  const [ticketTableRefetch, setTicketTabelRefetch] = useState(null)


  const { data, loading, error } = useQuery(GET_SD_DASHBOARD_STATS, {
    fetchPolicy: "network-only"
  });

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
          <DashboardCard hiring={data?.getDashboardStatsTicket?.todayCount} text={"Today's Incidents"} color="#56A0C2" />
        </Grid>

        <Grid item xs={4} md={4} lg={4}>
          <DashboardCard hiring={data?.getDashboardStatsTicket?.inProgressCount} text={"Inprogress"} color="#242D60" />
        </Grid>

        <Grid item xs={4} md={4} lg={4}>
          <DashboardCard hiring={data?.getDashboardStatsTicket?.futureCount} text={"Upcomming Incidents"} color="#212121" />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ServiceDeskTable  {...{ ticketTableRefetch, setTicketTabelRefetch, todays: true, label: "Today's Tickets", hideAddTicketButton: true }} />
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
            <ServiceDeskTable  {...{ ticketTableRefetch, setTicketTabelRefetch, external: true, label: 'Customer Tickets', hideAddTicketButton: true }} />
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ServiceDeskTable  {...{ ticketTableRefetch, setTicketTabelRefetch, label: "Tickets Received", customer:true, approved:false,  hideAddTicketButton: true }} />
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ServiceDeskTable  {...{ ticketTableRefetch, setTicketTabelRefetch, label: "All Tickets" }} />
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}
