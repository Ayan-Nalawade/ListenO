
import React from 'react';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';

const Sidebar: React.FC = () => {
  return (
    <div>
      <List>
        <ListItemButton>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Search" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Your Library" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default Sidebar;
