import React from 'react';
import { Typography, Box } from '@mui/material';

const Library: React.FC = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Your Library
      </Typography>
      <Typography variant="body1">
        This is where your saved music and playlists will appear.
      </Typography>
    </Box>
  );
};

export default Library;
