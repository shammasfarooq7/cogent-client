import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DashboardCard } from '../../components/common/Card';
import { useNavigate } from 'react-router-dom';
import { FeopsTable } from './FeopsTable';


export const FeopsDashboard = () => {

  const navigate = useNavigate();

  const [ticketTableRefetch, setTicketTabelRefetch] = useState(null)

  const [todaysIncidentCount, setTodaysIncidentCount] = useState(4)
  const [inProgressCount, setInProgressCount] = useState(10)
  const [upcommingIncidentsCount, setUpcommingIncidentsCount] = useState(15)


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
            <FeopsTable tableName="Today's Dispatch"  {...{ ticketTableRefetch, setTicketTabelRefetch, todays: true }} />
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
            <FeopsTable tableName="All Tickets"  {...{ ticketTableRefetch, setTicketTabelRefetch }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
