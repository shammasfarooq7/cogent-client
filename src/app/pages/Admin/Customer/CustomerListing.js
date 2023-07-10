import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DashboardCard } from '../../../components/common/Card';
import { useQuery } from "@apollo/client";
import { handleLogout } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { CustomerTable } from './CustomerTable';


export const CustomerListing = () => {

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(false);
  const [dashboardStat, setDashboardStat] = useState(null)
  const [ticketTableRefetch, setTicketTabelRefetch] = useState(null)
  const [openTicketForm, setOpenTicketForm] = useState(false);
  const [openViewForm, setOpenViewForm] = useState(false);
  const [ticket, setTicket]= useState({})
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


  const handleSignOut = () => {
    handleLogout();
    navigate("/login")
  }

  return (
    <Box padding={"30px"}>

      <Grid container spacing={"30px"}>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
          <CustomerTable tableName="User's Listing"  {...{ ticketTableRefetch, setTicketTabelRefetch, todays:true}} />
          </Paper>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid xs={6}>
          </Grid>
          <Grid xs={4}></Grid>
          <Grid xs={2}>

          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <UserTable tableName="All Tickets"  {...{ ticketTableRefetch, setTicketTabelRefetch }} />
          </Paper>
        </Grid> */}
      </Grid>
    </Box>
  );
}
