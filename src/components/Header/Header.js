import { styled, Grid, Typography, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import getStyles from './Header.styles';
import logo512 from '../../assets/icons/logo-512x512.png';
import { useLocation } from 'react-router-dom';

const styles = getStyles();

const MainContainer = styled('header')(() => styles.header);

const StyledLink = styled(Link)(() => styles.link);

const Header = () => {
  const { pathname } = useLocation();

  return (
    <MainContainer>
      <Grid
        container
        align="center"
        justifyContent="center"
        alignItems="center"
        sx={styles.headerGrid}
      >
        <Grid item xs align="left">
          <StyledLink to="/" sx={styles.companyButtonLink}>
            <Typography component="span" sx={styles.appLabel}>
              F1 S
            </Typography>

            <Typography component="span" sx={styles.appLabelLogoSmall}>
              tats
            </Typography>

            <Box
              component="img"
              sx={styles.logoImg}
              alt="logo image"
              src={logo512}
            />
          </StyledLink>

          <StyledLink to="/practiceStats" sx={styles.buttonLink}>
            <Typography
              component="span"
              sx={
                pathname === '/practiceStats'
                  ? styles.mainButtonActive
                  : styles.mainButton
              }
            >
              Practice stats
            </Typography>
          </StyledLink>

          <StyledLink to="/tyres" sx={[styles.buttonLink, { marginRight: 0 }]}>
            <Typography
              component="span"
              sx={
                pathname === '/tyres'
                  ? styles.mainButtonActive
                  : styles.mainButton
              }
            >
              Tyres
            </Typography>
          </StyledLink>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Header;
