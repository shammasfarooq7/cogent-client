import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DashboardCard } from '../../components/common/Card';
import { useQuery } from "@apollo/client";
import { handleLogout } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { TaskBox } from '../../components/common/CustomTaskBox';
import CurvedChart from './CurvedChart';
import SplineChart from './CurvedChart';
import Calendar from '../../components/common/Calendar';
import Incidents from '../../components/common/Calendar';
import { useContext } from 'react';
import { UserContext } from '../../context/user-context';
import { GET_RESOURCE_TICKET_QUERY } from '../../../graphql/tickets';


export const ResourcesDashboard = () => {

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [ticketTableRefetch, setTicketTabelRefetch] = useState(null)
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);


  const queryTodaysVariables = {
      today : true
  };

  const queryFututeVariables = {
    page,
    limit,
    future:true
};

  
  const { data, loading } = useQuery(GET_RESOURCE_TICKET_QUERY, {
    variables: {
          getResourceTicketInput: {
              ...queryTodaysVariables,
            },
          }
  });

  const { data:futureTicket, loading:futureLoading } = useQuery(GET_RESOURCE_TICKET_QUERY, {
    variables: {
          getResourceTicketInput: {
              ...queryFututeVariables,
            },
          }
  });


  const handleOpen = () => setOpenModal(true);


  return (
    <Box padding={"30px"}>

      <Grid container spacing={"30px"}>

        <Grid item xs={12} md={6} lg={6}>
          <DashboardCard hiring={data && data?.getResourceTickets.count} text={"Today's Task"} color="#56A0C2" today={true} />
        </Grid>
        
        <Grid item xs={12} md={6} lg={6}>
          <DashboardCard hiring={futureTicket && futureTicket.getResourceTickets.count } text={"Upcomming Incidents"} future={true} color="#212121" />
        </Grid>

        <Grid item xs={12} md={6}>
            <TaskBox taskName="Today's Task" todays={true} type="resource" />
        </Grid>
{/*          
        <Grid item xs={12} md={6}>
         <Incidents future={true} />
        </Grid> */}
       
        <Grid item xs={12} md={6}>
            <TaskBox taskName="Tasks History" type="resource"  />
        </Grid>

        {/* <Grid item xs={12} md={6}>
           <SplineChart />
        </Grid> */}
       
      </Grid>
    </Box>
  );
}
