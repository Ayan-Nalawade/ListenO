import React, { useState, useRef } from 'react';
import { Typography, Box, Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import axios from 'axios';

interface MainContentProps {
  onPlayTrack: (track: any) => void;
}

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const MainContent: React.FC<MainContentProps> = ({ onPlayTrack }) => {
  const [youtubeSearchQuery, setYoutubeSearchQuery] = useState('');
  const [youtubeSearchResults, setYoutubeSearchResults] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleYouTubeSearch = async () => {
    if (!youtubeSearchQuery) return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${youtubeSearchQuery}&type=video&key=${YOUTUBE_API_KEY}`
      );
      const videos = response.data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high.url,
      }));
      setYoutubeSearchResults(videos);
    } catch (error) {
      console.error('Error searching YouTube:', error);
      setYoutubeSearchResults([]);
    }
  };

  const handlePlayYoutubeVideo = (videoId: string, title: string, channelTitle: string, thumbnail: string) => {
    onPlayTrack({
      id: videoId,
      type: 'youtube',
      videoId: videoId,
      name: title,
      artist_name: channelTitle,
      image: thumbnail,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileURL = URL.createObjectURL(file);
      onPlayTrack({
        id: file.name,
        type: 'local',
        name: file.name,
        artist_name: 'Local Artist',
        audio: fileURL,
        image: 'https://via.placeholder.com/140?text=Local+Music',
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to ListenO
      </Typography>

      <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Search YouTube videos"
          variant="outlined"
          fullWidth
          value={youtubeSearchQuery}
          onChange={(e) => setYoutubeSearchQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleYouTubeSearch}>
          Search YouTube
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="file"
          accept="audio/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button variant="contained" onClick={handleUploadClick}>
          Upload Local Music
        </Button>
      </Box>

      {youtubeSearchResults.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            YouTube Search Results
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {youtubeSearchResults.map((video) => (
              <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 10px)', md: 'calc(33.33% - 14px)', lg: 'calc(25% - 15px)' } }} key={video.id}>
                <Card sx={{ ':hover': { boxShadow: 20, transform: 'scale(1.05)' }, transition: 'transform 0.3s' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {video.channelTitle}
                    </Typography>
                    <Button variant="contained" size="small" onClick={() => handlePlayYoutubeVideo(video.id, video.title, video.channelTitle, video.thumbnail)}>
                      Play
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {youtubeSearchResults.length === 0 && (
        <Box>
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
      )}
    </Box>
  );
};

export default MainContent;