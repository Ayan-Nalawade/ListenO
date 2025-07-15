import React, { useState } from 'react';
import { Typography, Box, Button, TextField, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface LibraryProps {
  playlists: any[];
  addPlaylist: (name: string) => void;
  removePlaylist: (id: number) => void;
  onPlayTrack: (track: any) => void;
  setPlayableTracks: (tracks: any[]) => void;
}

const Library: React.FC<LibraryProps> = ({ playlists, addPlaylist, removePlaylist, onPlayTrack, setPlayableTracks }) => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      addPlaylist(newPlaylistName);
      setNewPlaylistName('');
    }
  };

  const handleOpenDialog = (playlist: any) => {
    setSelectedPlaylist(playlist);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlaylist(null);
  };

  const handlePlayPlaylist = (playlist: any) => {
    setPlayableTracks(playlist.tracks);
    if (playlist.tracks.length > 0) {
      onPlayTrack(playlist.tracks[0]);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
        Your Library
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
          Create New Playlist
        </Typography>
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <TextField
            label="Playlist Name"
            variant="outlined"
            fullWidth
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button variant="contained" onClick={handleCreatePlaylist} sx={{ px: 4 }}>
            Create
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
        Your Playlists
      </Typography>
      {playlists.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          You haven't created any playlists yet.
        </Typography>
      ) : (
        <List>
          {playlists.map((playlist) => (
            <ListItem
              key={playlist.id}
              secondaryAction={
                <Box>
                  <IconButton edge="end" aria-label="play" onClick={() => handlePlayPlaylist(playlist)}>
                    <PlayArrowIcon sx={{ color: 'text.secondary' }} />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => removePlaylist(playlist.id)}>
                    <DeleteIcon sx={{ color: 'text.secondary' }} />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={playlist.name}
                secondary={`${playlist.tracks.length} songs`}
                primaryTypographyProps={{ color: 'text.primary' }}
                secondaryTypographyProps={{ color: 'text.secondary' }}
                onClick={() => handleOpenDialog(playlist)}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ sx: { bgcolor: 'background.paper' } }}>
        <DialogTitle sx={{ color: 'text.primary' }}>{selectedPlaylist?.name}</DialogTitle>
        <DialogContent>
          {selectedPlaylist?.tracks.length === 0 ? (
            <Typography color="text.secondary">This playlist is empty.</Typography>
          ) : (
            <List>
              {selectedPlaylist?.tracks.map((track: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={track.name}
                    secondary={track.artist_name}
                    primaryTypographyProps={{ color: 'text.primary' }}
                    secondaryTypographyProps={{ color: 'text.secondary' }}
                  />
                  <IconButton edge="end" aria-label="play" onClick={() => onPlayTrack(track)}>
                    <PlayArrowIcon sx={{ color: 'text.secondary' }} />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Library;