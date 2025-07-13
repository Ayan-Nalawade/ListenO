
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Slider, Box } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';

const Player: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: '#181818' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
          <IconButton color="inherit">
            <SkipPrevious />
          </IconButton>
          <IconButton color="inherit">
            <PlayArrow />
          </IconButton>
          <IconButton color="inherit">
            <SkipNext />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '70%' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mr: 2 }}>
            0:00
          </Typography>
          <Slider defaultValue={30} sx={{ color: '#fff' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', ml: 2 }}>
            3:45
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Player;
