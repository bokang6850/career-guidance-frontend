import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
  School,
  BusinessCenter,
  Dashboard,
  Person,
  Group,
  Work
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Home', path: '/', icon: <Dashboard /> },
    { text: 'For Students', path: '/student', icon: <School /> },
    { text: 'For Institutions', path: '/institute', icon: <Person /> },
    { text: 'For Companies', path: '/company', icon: <BusinessCenter /> },
    { text: 'Admin', path: '/admin', icon: <Group /> }  // Fixed: now points to /admin
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Fix for active route highlighting
  const isActiveRoute = (menuPath, currentPath) => {
    if (menuPath === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(menuPath);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <Toolbar>
        <Typography variant="h6" color="primary" fontWeight="bold">
          CareerGuide
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={Link} 
            to={item.path}
            sx={{
              backgroundColor: isActiveRoute(item.path, location.pathname) ? theme.palette.primary.main : 'transparent',
              color: isActiveRoute(item.path, location.pathname) ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: 'white'
              }
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="static" 
        elevation={2}
        sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <School sx={{ mr: 2 }} />
          
          <Typography 
            variant="h6" 
            component={Link}
            to="/"
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            Career Guidance Platform
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    fontWeight: isActiveRoute(item.path, location.pathname) ? 'bold' : 'normal',
                    borderBottom: isActiveRoute(item.path, location.pathname) ? '2px solid white' : 'none',
                    borderRadius: 0
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            {user ? (
              <>
                <Chip
                  icon={<Work />}
                  label={user.role}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                />
                <IconButton color="inherit" onClick={onLogout}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'white', color: 'primary.main' }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  color="inherit" 
                  variant="outlined"
                  component={Link}
                  to="/student/login"
                  sx={{ 
                    borderColor: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Login
                </Button>
                <Button 
                  color="primary" 
                  variant="contained"
                  component={Link}
                  to="/student/register"
                  sx={{ 
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;