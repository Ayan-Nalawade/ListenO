
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';

const Player: React.FC = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <IconButton color="inherit">
          <SkipPrevious />
        </IconButton>
        <IconButton color="inherit">
          <PlayArrow />
        </IconButton>
        <IconButton color="inherit">
          <SkipNext />
        </IconButton>
        <Typography variant="body1" color="inherit" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Now Playing: Song Title
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Player;
