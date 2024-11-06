import React, { useContext } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { MoreVert, Repeat, RepeatOne } from '@mui/icons-material';
import getStyles from './AudioPlayer.styles';
import { ColorModeContext } from '../ColorMode';

const AudioControls = (props) => {
  const {
    handleRepeatModeChange,
    repeatMode,
    setRateMenuAnchor,
    playbackRate,
    handleOpenMore,
  } = props;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Box sx={styles.controlButtonsContainer}>
      <IconButton
        onClick={handleRepeatModeChange}
        color={repeatMode !== 'off' ? 'primary' : 'default'}
        sx={{ '&:hover': { bgcolor: 'action.hover' } }}
      >
        {repeatMode === 'one' ? <RepeatOne /> : <Repeat />}
      </IconButton>

      <IconButton onClick={(e) => setRateMenuAnchor(e.currentTarget)}>
        <Typography variant="body2">{playbackRate}x</Typography>
      </IconButton>

      <IconButton onClick={handleOpenMore}>
        <MoreVert />
      </IconButton>
    </Box>
  );
};

export default AudioControls;
