import React, { useContext } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import TyresCircle from '../TyresCircle';
import getStyles from './HomeHero.styles';
import logoDetailedBlack from '../../assets/icons/logo-detailed-black.png';
import logoDetailedWhite from '../../assets/icons/logo-detailed-white.png';
import { ColorModeContext } from '../ColorMode';

const HomeHero = (props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return isDesktop ? (
    <Box sx={styles.container}>
      <Typography component="h1" sx={styles.title}>
        F1 Stats
      </Typography>

      <Box sx={styles.imageContainer}>
        <Box
          sx={styles.image}
          component="img"
          alt="logo image"
          src={mode === 'light' ? logoDetailedBlack : logoDetailedWhite}
        />

        <Box sx={styles.backTyreContainer}>
          <TyresCircle compound="SOFT" size="100" />
        </Box>

        <Box sx={styles.frontTyreContainer}>
          <TyresCircle compound="SOFT" size="100" />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box sx={styles.containerMobile}>
      <Typography component="h1" sx={styles.titleMobile}>
        F1 Stats
      </Typography>

      <Box sx={styles.imageContainerMobile}>
        <Box
          component="img"
          alt="logo image"
          src={mode === 'light' ? logoDetailedBlack : logoDetailedWhite}
          sx={styles.imageMobile}
        />

        <Box sx={styles.backTyreContainerMobile}>
          <TyresCircle compound="SOFT" size="59" />
        </Box>

        <Box sx={styles.frontTyreContainerMobile}>
          <TyresCircle compound="SOFT" size="59" />
        </Box>
      </Box>
    </Box>
  );
};

export default HomeHero;
