import React, { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';
import Library from './components/Library';

function App() {
  const [currentTrack, setCurrentTrack] = useState<any>(null);

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '240px' }}>
          <Sidebar />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<MainContent onPlayTrack={handlePlayTrack} />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </Box>
        <Player currentTrack={currentTrack} />
      </Box>
    </Router>
  );
}

export default App;
