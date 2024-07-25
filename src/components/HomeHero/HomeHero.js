import React, { useContext } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import TyresCircle from '../TyresCircle';
import getStyles from './HomeHero.styles';
import logo512 from '../../assets/icons/logo-512x512.png';
import { IconContext } from 'react-icons';
import { GiTireTracks } from 'react-icons/gi';
import { ColorModeContext } from '../ColorMode';

const HomeHero = (props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return isDesktop ? (
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
  ) : (
    <Box sx={styles.containerMobile}>
      <Typography component="h1" sx={styles.titleMobile}>
        F1 Statistics
      </Typography>

      <Box sx={styles.imageContainerMobile}>
        <Box
          component="img"
          alt="logo image"
          src={logo512}
          sx={{
            height: '370px',
            width: '370px',
          }}
        />

        <Box sx={styles.backTyreContainerMobile}>
          <TyresCircle compound="SOFT" size="87" />
        </Box>

        <Box sx={styles.frontTyreContainerMobile}>
          <TyresCircle compound="SOFT" size="87" />
        </Box>

        <IconContext.Provider value={{ style: styles.tracksIconMobile }}>
          <GiTireTracks />
        </IconContext.Provider>
      </Box>
    </Box>
  );
};

export default HomeHero;
