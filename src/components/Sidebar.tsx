
import React from 'react';
import { List, ListItemText, ListItemButton, ListItemIcon, Box, Typography } from '@mui/material';
import { Home, Search, LibraryMusic } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{
      width: '240px',
      height: '100vh',
      bgcolor: 'background.paper',
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'none', // Remove shadow, rely on overall app background
      borderRight: '1px solid', // Subtle separator
      borderColor: 'divider',
    }}>
      <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: 'text.primary', fontWeight: 700 }}>
        ListenO
      </Typography>
      <List sx={{ width: '100%' }}>
        <ListItemButton component={Link} to="/" selected={location.pathname === '/'}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/search" selected={location.pathname === '/search'}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <Search />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton>
        <ListItemButton component={Link} to="/library" selected={location.pathname === '/library'}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <LibraryMusic />
          </ListItemIcon>
          <ListItemText primary="Your Library" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
