import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '240px' }}>
        <Sidebar />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <MainContent />
      </Box>
      <Player />
    </Box>
  );
}

export default App;
