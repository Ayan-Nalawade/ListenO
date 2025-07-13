
import React from 'react';
import { List, ListItem, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import { Home, Search, LibraryMusic } from '@mui/icons-material';

const Sidebar: React.FC = () => {
  return (
    <div style={{ height: '100vh', backgroundColor: '#040404' }}>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton>
        <ListItemButton>
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
