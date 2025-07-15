import React, { useState, useRef } from 'react';
import { Typography, Box, Card, CardContent, CardMedia, TextField, Button, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

interface MainContentProps {
  onPlayTrack: (track: any) => void;
  setPlayableTracks: (tracks: any[]) => void;
  playlists: any[];
  addSongToPlaylist: (playlistId: number, track: any) => void;
}

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const MainContent: React.FC<MainContentProps> = ({ onPlayTrack, setPlayableTracks, playlists, addSongToPlaylist }) => {
  const [youtubeSearchQuery, setYoutubeSearchQuery] = useState('');
  const [youtubeSearchResults, setYoutubeSearchResults] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTrackForPlaylist, setSelectedTrackForPlaylist] = useState<any>(null);

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
      setPlayableTracks(videos);
    } catch (error) {
      console.error('Error searching YouTube:', error);
      setYoutubeSearchResults([]);
      setPlayableTracks([]);
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

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>, track: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrackForPlaylist(track);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTrackForPlaylist(null);
  };

  const handleAddToPlaylist = (playlistId: number) => {
    if (selectedTrackForPlaylist) {
      addSongToPlaylist(playlistId, selectedTrackForPlaylist);
      handleMenuClose();
    }
  };

  const suggestedVideos = React.useMemo(() => [
    { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', channelTitle: 'RickAstleyVEVO', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' },
    { id: 'kJQP7kiw5Fk', title: 'Luis Fonsi - Despacito ft. Daddy Yankee', channelTitle: 'LuisFonsiVEVO', thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg' },
    { id: 'JGwWNGJdvx8', title: 'Ed Sheeran - Shape of You [Official Video]', channelTitle: 'EdSheeran', thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg' },
    { id: 'fJ9rUzIMcZQ', title: 'Charlie Puth - Attention [Official Video]', channelTitle: 'Charlie Puth', thumbnail: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg' },
    { id: 'kXYiU_JWPXQ', title: 'Maroon 5 - Girls Like You ft. Cardi B', channelTitle: 'Maroon5VEVO', thumbnail: 'https://i.ytimg.com/vi/kXYiU_JWPXQ/hqdefault.jpg' },
  ], []);

  // Set suggested videos as playable tracks on initial load
  React.useEffect(() => {
    setPlayableTracks(suggestedVideos);
  }, [setPlayableTracks, suggestedVideos]);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
        Welcome to ListenO
      </Typography>

      <Box sx={{ display: 'flex', gap: '16px', mb: 4 }}>
        <TextField
          label="Search ListenO"
          variant="outlined"
          fullWidth
          value={youtubeSearchQuery}
          onChange={(e) => setYoutubeSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" onClick={handleYouTubeSearch} sx={{ px: 4 }}>
          Search
        </Button>
      </Box>

      {youtubeSearchResults.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
            YouTube Search Results
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            {youtubeSearchResults.map((video) => (
              <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)', lg: 'calc(25% - 18px)' } }} key={video.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div" noWrap sx={{ color: 'text.primary' }}>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {video.channelTitle}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Button variant="contained" size="small" onClick={() => handlePlayYoutubeVideo(video.id, video.title, video.channelTitle, video.thumbnail)}>
                        Play
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={(event) => handleAddClick(event, { ...video, type: 'youtube' })}
                      >
                        Add
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
            Suggested Videos
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            {suggestedVideos.map((video) => (
              <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)', lg: 'calc(25% - 18px)' } }} key={video.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div" noWrap sx={{ color: 'text.primary' }}>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {video.channelTitle}
                    </Typography>
                    <Button variant="contained" size="small" onClick={() => handlePlayYoutubeVideo(video.id, video.title, video.channelTitle, video.thumbnail)} sx={{ mt: 1 }}>
                      Play
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {playlists.length === 0 ? (
          <MenuItem onClick={handleMenuClose} disabled>
            No playlists. Go to Library to create one.
          </MenuItem>
        ) : (
          playlists.map((playlist: any) => (
            <MenuItem key={playlist.id} onClick={() => handleAddToPlaylist(playlist.id)}>
              {playlist.name}
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default MainContent;