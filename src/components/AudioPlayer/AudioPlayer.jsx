import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import moment from 'moment';
import getStyles from './AudioPlayer.styles';
import { ColorModeContext } from '../ColorMode';
import AudioControls from './AudioControls';
import PlayButton from './PlayButton';
import VolumeSlider from './VolumeSlider';

const AudioPlayer = (props) => {
  const { audioUrl, audioDate, teamColour } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [repeatMode, setRepeatMode] = useState('off');
  const [anchorEl, setAnchorEl] = useState(null);
  const [rateMenuAnchor, setRateMenuAnchor] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleMetadataLoaded = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === 'off') {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleMetadataLoaded);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleMetadataLoaded);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeatMode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (!isPlaying) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const seekTime =
        (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * duration;
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (_, newValue) => {
    setVolume(newValue);
    setIsMuted(newValue === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleOpenMore = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const handleOpenExternal = () => {
    window.open(audioUrl, '_blank');
    handleCloseMore();
  };

  const handlePlaybackRateChange = (rate) => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = rate;
      setPlaybackRate(rate);
      setRateMenuAnchor(null);
    }
  };

  const handleRepeatModeChange = () => {
    const modes = ['off', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={isDesktop ? styles.titleContainer : styles.titleContainerMobile}>
        <Typography sx={isDesktop ? styles.title : styles.titleMobile}>
          {moment(audioDate).format('MMM D, HH:mm:ss')}
        </Typography>
      </Box>

      {isDesktop ? (
        <Box sx={styles.controlsContainer}>
          <AudioControls
            handleRepeatModeChange={handleRepeatModeChange}
            repeatMode={repeatMode}
            setRateMenuAnchor={setRateMenuAnchor}
            playbackRate={playbackRate}
            handleOpenMore={handleOpenMore}
          />

          <PlayButton
            handlePlay={handlePlay}
            teamColour={teamColour}
            isPlaying={isPlaying}
          />

          <VolumeSlider
            toggleMute={toggleMute}
            isMuted={isMuted}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
          />
        </Box>
      ) : (
        <Box sx={styles.controlsContainer}>
          <Box>
            <AudioControls
              handleRepeatModeChange={handleRepeatModeChange}
              repeatMode={repeatMode}
              setRateMenuAnchor={setRateMenuAnchor}
              playbackRate={playbackRate}
              handleOpenMore={handleOpenMore}
            />

            <VolumeSlider
              toggleMute={toggleMute}
              isMuted={isMuted}
              volume={volume}
              handleVolumeChange={handleVolumeChange}
            />
          </Box>

          <Box>
            <PlayButton
              handlePlay={handlePlay}
              teamColour={teamColour}
              isPlaying={isPlaying}
            />
          </Box>
        </Box>
      )}

      <Box sx={styles.durationContainer}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={styles.durationCurrentTime}
        >
          {formatTime(currentTime)}
        </Typography>

        <Box sx={styles.seekContainer} onClick={handleSeek}>
          <Box
            sx={{
              width: `${(currentTime / duration) * 100}%`,
              ...styles.seek,
            }}
          />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={styles.durationTime}
        >
          {formatTime(duration)}
        </Typography>
      </Box>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <Menu
        anchorEl={rateMenuAnchor}
        open={Boolean(rateMenuAnchor)}
        onClose={() => setRateMenuAnchor(null)}
      >
        {[0.5, 1, 1.5, 2].map((rate) => (
          <MenuItem
            key={rate}
            onClick={() => handlePlaybackRateChange(rate)}
            selected={playbackRate === rate}
          >
            {rate}x
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMore}
      >
        <MenuItem onClick={handleOpenExternal}>
          <OpenInNew sx={styles.openExternalButton} /> Open in New Tab
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AudioPlayer;
