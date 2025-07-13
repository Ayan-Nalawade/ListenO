
import React from 'react';
import { List, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import { Home, Search, LibraryMusic } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div style={{ height: '100vh', backgroundColor: '#040404' }}>
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/search">
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton>
        <ListItemButton component={Link} to="/library">
          <ListItemIcon>
            <LibraryMusic />
          </ListItemIcon>
          <ListItemText primary="Your Library" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default Sidebar;
