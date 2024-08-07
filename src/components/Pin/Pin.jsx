import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import getStyles from './Pin.styles';
import { ColorModeContext } from '../ColorMode';

const Pin = (props) => {
  const {
    color,
    colorRgba,
    number,
    translate,
    rotate,
    translateText = '32px, -17px',
    rotateText,
    lineWidth = 32,
  } = props;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Box
      sx={{
        ...styles.container,
        transform: `translate(${translate}) rotate(${rotate}deg)`,
      }}
    >
      <Box
        sx={{
          border: `1px solid ${color}`,
          backgroundColor: color,
          width: `${lineWidth}px`,
        }}
      />

      <Box
        sx={{
          ...styles.circle,
          border: `2px solid ${color}`,
          transform: `translate(${translateText}) rotate(${rotateText}deg)`,
          backgroundColor: colorRgba,
        }}
      >
        <Typography sx={styles.number}>{number}</Typography>
      </Box>
    </Box>
  );
};

export default Pin;
