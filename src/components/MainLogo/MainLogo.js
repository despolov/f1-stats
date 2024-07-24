import {
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import getStyles from './MainLogo.styles';
import logo512 from '../../assets/icons/logo-512x512.png';
import { ColorModeContext } from '../ColorMode';

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

  return (
    <Box sx={styles.logoContainer}>
      <StyledLink to="/">
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
          src={logo512}
        />
      </StyledLink>
    </Box>
  );
};

export default MainLogo;
