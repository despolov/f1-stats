import React from 'react';
import { Box, IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import shadeAColor from '../../utils/shadeAColor';

const PlayButton = (props) => {
  const { handlePlay, teamColour, isPlaying } = props;

  return (
    <Box>
      <IconButton
        onClick={handlePlay}
        color="primary"
        sx={{
          '&:hover': {
            backgroundColor: teamColour
              ? shadeAColor(`#${teamColour}`, -30)
              : '#ea514d',
          },
          backgroundColor: teamColour ? `#${teamColour}` : '#f08380',
        }}
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
    </Box>
  );
};

export default PlayButton;
