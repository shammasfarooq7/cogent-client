import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import "./style.css"
import { useNavigate } from 'react-router-dom';

export const MainListItems = () => {

  const navigate = useNavigate();

  return (
    <React.Fragment >
      <ListItemButton onClick={() => navigate("/dashboard")}>
        <ListItemIcon className='white'>
          <DashboardIcon className='white' />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("/all-resource")}>
        <ListItemIcon className='white'>
          <DashboardIcon className='white' />
        </ListItemIcon>
        <ListItemText primary="Resources" />
      </ListItemButton>

    </React.Fragment >

  )
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset sx={{ background: "#1E1E2D", color: "white" }}>
      Saved reports
    </ListSubheader>
    <ListItemButton >
      <ListItemIcon className='white'>
        <AssignmentIcon className='white' />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon className='white'>
        <AssignmentIcon className='white' />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon className='white'>
        <AssignmentIcon className='white' />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
