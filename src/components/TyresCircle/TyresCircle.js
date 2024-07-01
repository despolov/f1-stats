import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import getStyles from './TyresCircle.styles';

const styles = getStyles();

const TyresCircle = (props) => {
  const { compound } = props;
  // const theme = useTheme();
  // const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  let color = 'black';
  let letter = compound;

  if (compound === 'SOFT') {
    color = 'red';
    letter = 'S';
  } else if (compound === 'MEDIUM') {
    color = 'yellow';
    letter = 'M';
  } else if (compound === 'HARD') {
    color = 'white';
    letter = 'H';
  }

  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        backgroundColor: color,
        borderRadius: '50%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '4px solid black',
      }}
    >
      <Typography
        variant="h1"
        component="div"
        sx={{
          color: 'black',
          fontWeight: 'bold',
          zIndex: 1,
          fontSize: '25px',
        }}
      >
        {letter}
      </Typography>
    </Box>
  );
};

export default TyresCircle;
