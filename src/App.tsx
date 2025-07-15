import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';
import Library from './components/Library';

function App() {
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [playableTracks, setPlayableTracks] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const [playlists, setPlaylists] = useState<any[]>(() => {
    const savedPlaylists = localStorage.getItem('playlists');
    return savedPlaylists ? JSON.parse(savedPlaylists) : [];
  });

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  const addPlaylist = (name: string) => {
    setPlaylists((prev: any[]) => [...prev, { id: Date.now(), name, tracks: [] }]);
  };

  const removePlaylist = (id: number) => {
    setPlaylists((prev: any[]) => prev.filter(p => p.id !== id));
  };

  const addSongToPlaylist = (playlistId: number, track: any) => {
    setPlaylists((prev: any[]) =>
      prev.map(p =>
        p.id === playlistId ? { ...p, tracks: [...p.tracks, track] } : p
      )
    );
  };

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track);
    if (track.type === 'youtube') {
      const index = playableTracks.findIndex(t => t.id === track.id);
      if (index !== -1) {
        setCurrentTrackIndex(index);
      } else {
        setPlayableTracks([track]);
        setCurrentTrackIndex(0);
      }
    } else {
      setCurrentTrackIndex(-1);
    }
  };

  const handleSkipNext = () => {
    if (playableTracks.length > 0 && currentTrackIndex !== -1) {
      const nextIndex = (currentTrackIndex + 1) % playableTracks.length;
      setCurrentTrackIndex(nextIndex);
      setCurrentTrack(playableTracks[nextIndex]);
    }
  };

  const handleSkipPrevious = () => {
    if (playableTracks.length > 0 && currentTrackIndex !== -1) {
      const prevIndex = (currentTrackIndex - 1 + playableTracks.length) % playableTracks.length;
      setCurrentTrackIndex(prevIndex);
      setCurrentTrack(playableTracks[prevIndex]);
    }
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ width: '240px', flexShrink: 0 }}>
          <Sidebar />
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', pb: '80px' }}> {/* Add padding-bottom for player */}
            <Routes>
              <Route 
                path="/" 
                element={
                  <MainContent 
                    onPlayTrack={handlePlayTrack} 
                    setPlayableTracks={setPlayableTracks} 
                    playlists={playlists}
                    addSongToPlaylist={addSongToPlaylist}
                  />
                }
              />
              <Route 
                path="/library" 
                element={
                  <Library 
                    playlists={playlists} 
                    addPlaylist={addPlaylist} 
                    removePlaylist={removePlaylist} 
                    onPlayTrack={handlePlayTrack}
                    setPlayableTracks={setPlayableTracks}
                  />
                }
              />
            </Routes>
          </Box>
          <Player 
            currentTrack={currentTrack} 
            onSkipNext={handleSkipNext} 
            onSkipPrevious={handleSkipPrevious} 
          />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
