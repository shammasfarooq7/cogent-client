import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DashboardCard } from '../../components/common/Card';
import { useQuery } from "@apollo/client";
import { TaskBox } from '../../components/common/CustomTaskBox';
import { GET_RESOURCE_TICKET_COUNT_QUERY, } from '../../../graphql/tickets';

export const ResourcesDashboard = () => {

  const { data, loading } = useQuery(GET_RESOURCE_TICKET_COUNT_QUERY, {
    variables: {
      getResourceTicketInput: {
        today: true
      },
    }
  });

  const { data: futureTicket, loading: futureLoading } = useQuery(GET_RESOURCE_TICKET_COUNT_QUERY, {
    variables: {
      getResourceTicketInput: {
        future: true
      },
    }
  });

  return (
    <Box padding={"30px"}>

      <Grid container spacing={"30px"}>

        <Grid item xs={12} md={6} lg={6}>
          <DashboardCard hiring={data && data?.getResourceTickets.count} text={"Today's Task"} color="#56A0C2" today={true} />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <DashboardCard hiring={futureTicket && futureTicket.getResourceTickets.count} text={"Upcomming Incidents"} future={true} color="#212121" />
        </Grid>

        <Grid item xs={12} md={6}>
          <TaskBox taskName="Today's Task" todays={true} type="resource" />
        </Grid>
        {/*          
        <Grid item xs={12} md={6}>
         <Incidents future={true} />
        </Grid> */}

        <Grid item xs={12} md={6}>
          <TaskBox taskName="Tasks History" type="resource" />
        </Grid>

        {/* <Grid item xs={12} md={6}>
           <SplineChart />
        </Grid> */}

      </Grid>
    </Box>
  );
}
