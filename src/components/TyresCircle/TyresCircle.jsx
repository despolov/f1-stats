import React from 'react';
import { Box } from '@mui/material';
import softTyreImg from '../../assets/icons/soft.png';
import mediumTyreImg from '../../assets/icons/medium.png';
import hardTyreImg from '../../assets/icons/hard.png';
import intermediateTyreImg from '../../assets/icons/intermediate.png';
import wetTyreImg from '../../assets/icons/wet.png';
import defaultTyreImg from '../../assets/icons/defaultTyre.png';

const TyresCircle = (props) => {
  const { compound, size = 70 } = props;

  if (compound === 'SOFT') {
    return (
      <Box
        component="img"
        src={softTyreImg}
        alt="mediumTyre"
        sx={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  } else if (compound === 'MEDIUM') {
    return (
      <Box
        component="img"
        src={mediumTyreImg}
        alt="mediumTyre"
        sx={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  } else if (compound === 'HARD') {
    return (
      <Box
        component="img"
        src={hardTyreImg}
        alt="mediumTyre"
        sx={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  } else if (compound === 'INTERMEDIATE') {
    return (
      <Box
        component="img"
        src={intermediateTyreImg}
        alt="intermediateTyre"
        sx={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  } else if (compound === 'WET') {
    return (
      <Box
        component="img"
        src={wetTyreImg}
        alt="wetTyre"
        sx={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  } else {
    return (
      <Box
        component="img"
        src={defaultTyreImg}
        alt="defaultTyreImg"
        sx={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  }
};

export default TyresCircle;
