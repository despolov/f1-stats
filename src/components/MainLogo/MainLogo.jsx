import {
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router';
import getStyles from './MainLogo.styles';
import logoDetailedWhite from '../../assets/icons/logo-detailed-white.png';
import { ColorModeContext } from '../ColorMode';
import { getLocaleFromUrl, defaultLocale } from '../../i18n';

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
}));

const MainLogo = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const currentLocale = getLocaleFromUrl() || defaultLocale;

  return (
    <Box sx={styles.logoContainer}>
      <StyledLink to={`/${currentLocale}`}>
        <Typography component="span" sx={styles.appLabel}>
          F1 S
        </Typography>

        <Typography component="span" sx={styles.appLabelLogoSmall}>
          tats
        </Typography>

        <Box
          component="img"
          sx={isDesktop ? styles.logoImg : styles.logoImgMobile}
          alt="logo image"
          src={logoDetailedWhite}
        />
      </StyledLink>
    </Box>
  );
};

export default MainLogo;
