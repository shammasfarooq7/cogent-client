import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DashboardCard } from '../../components/common/Card';
import { useQuery } from "@apollo/client";
import { handleLogout } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { ServiceDeskTable } from './serviceDesk-table';
import { Get_RESOURCE_Dashboard_Stats } from '../../../graphql/resources';


export const ServiceDesk = () => {

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(false);
  const [dashboardStat, setDashboardStat] = useState(null)
  const [ticketTableRefetch, setTicketTabelRefetch] = useState(null)

  const [todaysIncidentCount, setTodaysIncidentCount] = useState(4)
  const [inProgressCount, setInProgressCount] = useState(10)
  const [upcommingIncidentsCount, setUpcommingIncidentsCount] = useState(15)

  // const { data, loading, error } = useQuery(Get_Dashboard_Stats, {
  //   fetchPolicy: "network-only"
  // });

  //   const { data, loading, refetch } = useQuery(GET_ALL_TICKETS_QUERY, {
  //     variables: {
  //         getAllTicketsInput: {
  //             page,
  //             limit,
  //             ...(searchQuery && { searchQuery }),
  //             external:true,
  //         }
  //     },
  //     fetchPolicy: "network-only"
  // });


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

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ServiceDeskTable  {...{ ticketTableRefetch, setTicketTabelRefetch, todays: true, label: "Today's Tickets" }} />
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
            <ServiceDeskTable  {...{ ticketTableRefetch, setTicketTabelRefetch, external: true, label: 'External Tickets', hideAddTicketButton: true }} />
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ServiceDeskTable  {...{ ticketTableRefetch, setTicketTabelRefetch, label: "Customer Tickets", customer:true, approved:true,  hideAddTicketButton: true }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
