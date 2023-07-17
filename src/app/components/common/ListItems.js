import { Fragment, useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import "./style.css"
import { useNavigate } from 'react-router-dom';
import { getSideBarLinks } from '../../constants';
import { UserContext } from '../../context/user-context';

export const MainListItems = () => {

  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const userRole = (user?.roles?.[0]?.role || "")?.toLowerCase();
  return (
    <Fragment >
      {userRole &&  getSideBarLinks(userRole).map(item => (
        <ListItemButton key={item.link} onClick={() => navigate(item.link)}>
          <ListItemIcon className='white'>
            <DashboardIcon className='white' />
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))
   
    }
    </Fragment >

  )
};

export const AdminListItems = () => {

  const navigate = useNavigate();
  // const { user } = useContext(UserContext)
  // const userRole = (user?.roles?.[0]?.role || "")?.toLowerCase();

  return (
    <Fragment >    
        <ListItemButton >
          <ListItemIcon className='white'>
            <DashboardIcon className='white' />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
    </Fragment >

  )
};

export const secondaryListItems = (
  <Fragment>
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
  </Fragment>
);
