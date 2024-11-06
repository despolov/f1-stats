import React, { useContext } from 'react';
import { Box, IconButton, Slider } from '@mui/material';
import {
  VolumeUp,
  VolumeDown,
  VolumeMute,
  VolumeOff,
} from '@mui/icons-material';
import getStyles from './AudioPlayer.styles';
import { ColorModeContext } from '../ColorMode';

const VolumeSlider = (props) => {
  const { toggleMute, isMuted, volume, handleVolumeChange } = props;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Box sx={styles.volumeContainer}>
      <IconButton onClick={toggleMute}>
        {isMuted ? <VolumeOff /> : null}

        {!isMuted && volume > 0 && volume <= 35 ? <VolumeMute /> : null}

        {!isMuted && volume > 35 && volume < 75 ? <VolumeDown /> : null}

        {!isMuted && volume >= 75 ? <VolumeUp /> : null}
      </IconButton>

      <Slider
        value={volume}
        onChange={handleVolumeChange}
        sx={styles.volumeSlider}
      />
    </Box>
  );
};

export default VolumeSlider;
