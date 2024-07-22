import React from 'react';
import { Box, Typography } from '@mui/material';
import TyresCircle from '../TyresCircle';
import getStyles from './HomeHero.styles';
import logo512 from '../../assets/icons/logo-512x512.png';
import { IconContext } from 'react-icons';
import { GiTireTracks } from 'react-icons/gi';

const styles = getStyles();

const HomeHero = (props) => (
  <Box sx={styles.container}>
    <Typography component="h1" sx={styles.title}>
      F1 Statistics
    </Typography>

    <Box sx={styles.imageContainer}>
      <Box component="img" alt="logo image" src={logo512} />

      <Box sx={styles.backTyreContainer}>
        <TyresCircle compound="SOFT" size="120" />
      </Box>

      <Box sx={styles.frontTyreContainer}>
        <TyresCircle compound="SOFT" size="120" />
      </Box>

      <IconContext.Provider value={{ style: styles.tracksIcon }}>
        <GiTireTracks />
      </IconContext.Provider>
    </Box>
  </Box>
);

export default HomeHero;
