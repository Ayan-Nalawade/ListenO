
import React from 'react';
import { Typography, Box, Card, CardContent, CardMedia } from '@mui/material';

const MainContent: React.FC = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to ListenO
      </Typography>
      <Typography variant="h6" gutterBottom>
        Featured Playlists
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {[...Array(8)].map((_, index) => (
          <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 10px)', md: 'calc(33.33% - 14px)', lg: 'calc(25% - 15px)' } }} key={index}>
            <Card sx={{ ':hover': { boxShadow: 20, transform: 'scale(1.05)' }, transition: 'transform 0.3s' }}>
              <CardMedia
                component="img"
                height="140"
                image={`https://picsum.photos/seed/${index}/200/300`}
                alt="Playlist Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Playlist {index + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A short description of the playlist.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MainContent;
