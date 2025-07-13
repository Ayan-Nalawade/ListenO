import React, { useRef, useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Slider, Box, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';
import YouTube from 'react-youtube';

interface PlayerProps {
  currentTrack: any;
}

const Player: React.FC<PlayerProps> = ({ currentTrack }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const youtubePlayerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const onYouTubeReady = (event: any) => {
    youtubePlayerRef.current = event.target;
    setDuration(event.target.getDuration());
    // Play video immediately after it's ready
    event.target.playVideo();
    setIsPlaying(true);
  };

  const onYouTubeStateChange = (event: any) => {
    // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    if (event.data === 1) { // Playing
      setIsPlaying(true);
    } else if (event.data === 2 || event.data === 0) { // Paused or Ended
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (currentTrack) {
      if (currentTrack.type === 'youtube') {
        // YouTube player is handled by react-youtube component
        setIsPlaying(true);
      } else if (audioRef.current) {
        audioRef.current.src = currentTrack.audio;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack && currentTrack.type !== 'youtube') {
      interval = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 1000);
    } else if (isPlaying && currentTrack && currentTrack.type === 'youtube' && youtubePlayerRef.current) {
      interval = setInterval(() => {
        setCurrentTime(youtubePlayerRef.current.getCurrentTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const togglePlayPause = () => {
    if (currentTrack && currentTrack.type === 'youtube' && youtubePlayerRef.current) {
      if (isPlaying) {
        youtubePlayerRef.current.pauseVideo();
      } else {
        youtubePlayerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      if (currentTrack && currentTrack.type === 'youtube' && youtubePlayerRef.current) {
        youtubePlayerRef.current.seekTo(newValue, true);
      } else if (audioRef.current) {
        audioRef.current.currentTime = newValue;
      }
      setCurrentTime(newValue);
    }
  };

  const handlePlaybackRateChange = (event: SelectChangeEvent<number>) => {
    const newRate = Number(event.target.value);
    setPlaybackRate(newRate);
    if (currentTrack && currentTrack.type === 'youtube' && youtubePlayerRef.current) {
      youtubePlayerRef.current.setPlaybackRate(newRate);
    } else if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
    },
  };

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: '#181818' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
          {currentTrack && currentTrack.type === 'youtube' && (
            <Box sx={{ width: '80px', height: '45px', overflow: 'hidden', mr: 2 }}>
              <YouTube videoId={currentTrack.videoId} opts={{ ...opts, height: '45', width: '80' }} onReady={onYouTubeReady} onStateChange={onYouTubeStateChange} />
            </Box>
          )}
          <Typography variant="body1" color="inherit">
            {currentTrack ? currentTrack.name : 'Not Playing'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', width: '60%', justifyContent: 'center' }}>
          <IconButton color="inherit" onClick={() => {
            if (currentTrack && currentTrack.type === 'youtube' && youtubePlayerRef.current) {
              youtubePlayerRef.current.seekTo(currentTime - 10, true);
            } else if (audioRef.current) {
              audioRef.current.currentTime -= 10;
            }
          }}>
            <SkipPrevious />
          </IconButton>
          <IconButton color="inherit" onClick={togglePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton color="inherit" onClick={() => {
            if (currentTrack && currentTrack.type === 'youtube' && youtubePlayerRef.current) {
              youtubePlayerRef.current.seekTo(currentTime + 10, true);
            } else if (audioRef.current) {
              audioRef.current.currentTime += 10;
            }
          }}>
            <SkipNext />
          </IconButton>
          <Box sx={{ width: '70%', ml: 2, mr: 2 }}>
            <Slider
              value={currentTime}
              max={duration}
              onChange={handleSeek}
              sx={{ color: '#fff' }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Typography>
        </Box>

        <Box sx={{ width: '20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mr: 1 }}>
            Speed:
          </Typography>
          <Select
            value={playbackRate}
            onChange={handlePlaybackRateChange}
            sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#fff' } }}
            size="small"
          >
            <MenuItem value={0.5}>0.5x</MenuItem>
            <MenuItem value={0.75}>0.75x</MenuItem>
            <MenuItem value={1}>1x</MenuItem>
            <MenuItem value={1.25}>1.25x</MenuItem>
            <MenuItem value={1.5}>1.5x</MenuItem>
            <MenuItem value={2}>2x</MenuItem>
          </Select>
        </Box>
      </Toolbar>
      {currentTrack && currentTrack.type !== 'youtube' && (
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
    </AppBar>
  );
};

export default Player;