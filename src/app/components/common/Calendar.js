import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AirplaneTicketRounded } from '@mui/icons-material';
import { GET_TODAY_TICKET_QUERY } from '../../../graphql/tickets';
import { useQuery } from '@apollo/client';

const UpcomingIncidents = () => {
  // Simulated data for upcoming incidents
  const upcomingIncidents = [
    { id: 1, title: 'Su', date: '22' },
    { id: 2, title: 'Mo', date: '23' },
    { id: 3, title: 'Tu', date: '24' },
    { id: 4, title: 'We', date: '25' },
    { id: 5, title: 'Th', date: '26' },
    { id: 6, title: 'Fri', date: '27' },
    { id: 7, title: 'Sa', date: '28' },
    { id: 8, title: 'Su', date: '29' },
    { id: 9, title: 'Mo', date: '30' },
  ];

  const [selected, setSelected] = useState(null);

  const handleBoxClick = (id) => {
    setSelected(id);
  };

  return (
    <Box sx={{background:'#FFFFFF', padding:'15px', height:'449px', overflowY:'auto'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
      <Typography sx={{marginBottom:'0px'}} variant="h6" gutterBottom>
        Upcoming Incidents
      </Typography>
      <Typography sx={{fontSize:'14px', color:'#B5B5C3'}}>Total 482 Participants</Typography>
        </Box>
      <Box>
        <Button sx={{color:'#B5B5C3', bracground:'transparent', textTransform:'capitalize','&:hover': {color:'#FFFFFF', background: '#242D60', }}}>
          Month</Button>
        <Button sx={{color:'#B5B5C3', bracground:'transparent', textTransform:'capitalize','&:hover': {color:'#FFFFFF', background: '#242D60', }}}>Week</Button>
        <Button sx={{color:'#B5B5C3', bracground:'transparent', textTransform:'capitalize','&:hover': {color:'#FFFFFF', background: '#242D60', }}}>Day</Button>
      </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {upcomingIncidents.map((incident) => (
          <Box
            key={incident.id}
            sx={{
              marginRight: '10px',
              marginTop:'15px',
              cursor: 'pointer',
              paddingTop: '10px',
              color: '#FFFFFF',
              background: incident.id === selected ? '#56A0C2' : '',
              borderRadius: '50px',
              textAlign: 'center',
              width: '40px',
              height: '66px',
            }}
            onClick={() => handleBoxClick(incident.id)}
          >
            <Typography sx={{color: incident.id === selected ? '#FFFFFF' :' #B5B5C3', fontSize:'12px'}}>{incident.title}</Typography>
            <Typography sx={{color: incident.id === selected ? '#FFFFFF' :' #3F4254', fontSize:'14px', fontWeight:'600'}}>{incident.date}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
      <Box>
        <Typography sx={{fontWeight: '600' ,fontSize: '20px'}}>10:20 - 11:00 <span style={{fontSize:'14px', color:'#B5B5C3'}}>AM</span></Typography>
        <Typography sx={{color: ' #5E6278' ,fontSize: '14px'}}>Ticket Number #1234566</Typography>
        <Typography sx={{color: ' #56A0C2' ,fontSize: '12px'}}>Lahore,Pakistan</Typography>
      </Box>
      <Box>
        <Button sx={{background:" #F5F8FA", borderRadius:'6px', color:'#A1A5B7'}}>View</Button>
        </Box>
      </Box>
      <Box sx={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
      <Box>
        <Typography sx={{fontWeight: '600' ,fontSize: '20px'}}>10:20 - 11:00 <span style={{fontSize:'14px', color:'#B5B5C3'}}>AM</span></Typography>
        <Typography sx={{color: ' #5E6278' ,fontSize: '14px'}}>Ticket Number #1234566</Typography>
        <Typography sx={{color: ' #56A0C2' ,fontSize: '12px'}}>Lahore,Pakistan</Typography>
      </Box>
      <Box>
        <Button sx={{background:" #F5F8FA", borderRadius:'6px', color:'#A1A5B7'}}>View</Button>
        </Box>
      </Box>
      <Box sx={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
      <Box>
        <Typography sx={{fontWeight: '600' ,fontSize: '20px'}}>10:20 - 11:00 <span style={{fontSize:'14px', color:'#B5B5C3'}}>AM</span></Typography>
        <Typography sx={{color: ' #5E6278' ,fontSize: '14px'}}>Ticket Number #1234566</Typography>
        <Typography sx={{color: ' #56A0C2' ,fontSize: '12px'}}>Lahore,Pakistan</Typography>
      </Box>
      <Box>
        <Button sx={{background:" #F5F8FA", borderRadius:'6px', color:'#A1A5B7'}}>View</Button>
        </Box>
      </Box>
    </Box>
  );
};

const Incidents = ({future}) => {

  return (
    <Box display="flex" justifyContent="space-between">
      <UpcomingIncidents />
    </Box>
  );
};

export default Incidents;
