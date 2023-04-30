import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, MenuItem, Typography, Menu, Button } from "@mui/material"
import { MainListItems } from '../common/ListItems';
import { Drawer } from '../common/Drawer';
import { AppBar } from '../common/AppBar';
import { handleLogout } from '../../utils';
import { useNavigate } from 'react-router-dom';
import cogentLogo from '../../assets/images/Cogent Logo.png';
import cogentTextLogo from '../../assets/images/Cogent Text Logo.png';


const mdTheme = createTheme();

export const MainLayout = ({ children }) => {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [openModal, setOpenModal] = React.useState(false);
    const [profileAnchor, setProfileAnchor] = React.useState(false);

    const getPageTitle = () => {
        return window.location.pathname.includes("resource")
            ? "Resource"
            : "Dashboard"
    }

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
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flListItemsex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                                color: "white"
                            }}
                        >
                            <MenuIcon sx={{ color: "white" }} />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {getPageTitle()}
                        </Typography>

                        <Box display={"flex"} justifyContent={"space-between"} >

                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>

                            <Box marginLeft={1}>
                                <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" />
                                </IconButton>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={profileAnchor}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(profileAnchor)}
                                    onClose={handleProfileClose}
                                >
                                    <MenuItem onClick={handleProfileClose}>
                                        <Button textAlign="center" variant="text" color='error' size='small'
                                            onClick={handleSignOut}>Sign Out</Button>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Box>

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} >
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: [2.5],
                        }}
                    >
                        <img width={40} height={32} src={cogentLogo} />
                        <img src={cogentTextLogo} />
                    </Toolbar>
                    <Divider sx={{ background: "#2D2D43", height: "1px" }} />
                    <List component="nav" sx={{ background: "#1E1E2D", color: "white" }}>
                        <MainListItems />
                        {/* <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    {/* <Container sx={{ mt: 4, mb: 4 }}> */}
                    {children}

                    {/* </Container> */}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
