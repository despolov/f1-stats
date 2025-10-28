import React, { useContext } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import TyresCircle from '../TyresCircle';
import getStyles from './HomeHero.styles';
import logo512 from '../../assets/icons/logo-512x512.png';
import logoDetailedBlack from '../../assets/icons/logo-detailed-black.png';
import logoDetailedWhite from '../../assets/icons/logo-detailed-white.png';
import logoPlainBlack from '../../assets/icons/logo-plain-black.png';
import logoPlainWhite from '../../assets/icons/logo-plain-white.png';
import { IconContext } from 'react-icons';
import { GiTireTracks } from 'react-icons/gi';
import { ColorModeContext } from '../ColorMode';
import { keyframes } from '@emotion/react';

const spinFrontTyreLogo = keyframes`0% { transform: translate(503px, -143px) rotate(0deg); } 100% { transform: translate(503px, -143px) rotate(360deg); }`;
const spinFrontTyreArLogo = keyframes`0% { transform: translate(525px, -193px) rotate(0deg); } 100% { transform: translate(525px, -193px) rotate(360deg); }`;
const spinBackTyreLogo = keyframes`0% { transform: translate(87px, -143px) rotate(0deg); } 100% { transform: translate(87px, -143px) rotate(360deg); }`;
const spinBackTyreArLogo = keyframes`0% { transform: translate(105px, -194px) rotate(0deg); } 100% { transform: translate(105px, -194px) rotate(360deg); }`;
const spinBackTyreMobile = keyframes`0% { transform: translate(43px, -213px) rotate(0deg); } 100% { transform: translate(43px, -213px) rotate(360deg); }`;
const spinFrontTyreMobile = keyframes`0% { transform: translate(240px, -213px) rotate(0deg); } 100% { transform: translate(240px, -213px) rotate(360deg); }`;

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
        {/* <Box
          sx={{ width: '512px' }}
          component="img"
          alt="logo image"
          src={logo512}
        />

        <Box sx={styles.backTyreContainer}>
          <TyresCircle compound="SOFT" size="120" />
        </Box>

        <Box sx={styles.frontTyreContainer}>
          <TyresCircle compound="SOFT" size="120" />
        </Box>

        <IconContext.Provider value={{ style: styles.tracksIcon }}>
          <GiTireTracks />
        </IconContext.Provider> */}

        <Box
          sx={{ width: '700px' }}
          component="img"
          alt="logo image"
          src={mode === 'light' ? logoDetailedBlack : logoDetailedWhite}
        />

        <Box
          sx={{
            position: 'fixed',
            borderRadius: '50%',
            width: '90px',
            height: '90px',
            animation: `${spinBackTyreLogo} 3s linear infinite`,
          }}
        >
          <TyresCircle compound="SOFT" size="90" />
        </Box>

        <Box
          sx={{
            position: 'fixed',
            borderRadius: '50%',
            width: '90px',
            height: '90px',
            animation: `${spinFrontTyreLogo} 3s linear infinite`,
          }}
        >
          <TyresCircle compound="SOFT" size="90" />
        </Box>
      </Box>

      <Box sx={styles.imageContainer}>
        <Box
          sx={{ width: '780px' }}
          component="img"
          alt="logo image"
          src={mode === 'light' ? logoPlainBlack : logoPlainWhite}
        />

        <Box
          sx={{
            position: 'fixed',
            borderRadius: '50%',
            width: '90px',
            height: '90px',
            animation: `${spinBackTyreArLogo} 3s linear infinite`,
          }}
        >
          <TyresCircle compound="SOFT" size="90" />
        </Box>

        <Box
          sx={{
            position: 'fixed',
            borderRadius: '50%',
            width: '90px',
            height: '90px',
            animation: `${spinFrontTyreArLogo} 3s linear infinite`,
          }}
        >
          <TyresCircle compound="SOFT" size="90" />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box sx={styles.containerMobile}>
      <Typography component="h1" sx={styles.titleMobile}>
        F1 Stats
      </Typography>

      {/* <Box sx={styles.imageContainerMobile}>
        <Box
          component="img"
          alt="logo image"
          src={logo512}
          sx={styles.imageMobile}
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
      </Box> */}

      <Box sx={styles.imageContainerMobile}>
        <Box
          component="img"
          alt="logo image"
          src={mode === 'light' ? logoPlainBlack : logoPlainWhite}
          sx={{ width: '100%', margin: ' 35px 0 0 0' }}
        />

        <Box
          sx={{
            position: 'fixed',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            transform: 'translate(55px, -105px)',
            // animation: `${spinBackTyreMobile} 3s linear infinite`,
          }}
        >
          <TyresCircle compound="SOFT" size="48" />
        </Box>

        <Box
          sx={{
            position: 'fixed',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            transform: 'translate(275px, -105px)',
            // animation: `${spinFrontTyreMobile} 3s linear infinite`,
          }}
        >
          <TyresCircle compound="SOFT" size="48" />
        </Box>
      </Box>
    </Box>
  );
};

export default HomeHero;
