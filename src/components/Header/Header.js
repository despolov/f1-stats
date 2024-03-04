import { styled, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import getStyles from './Header.styles';

const styles = getStyles();

const MainContainer = styled('header')(() => styles.header);

const StyledLink = styled(Link)(() => styles.link);

const Header = () => (
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
            {/* TODO: add the logo over the S'tats' letters here, move it with css positivion fixed  */}
            F1 Stats
          </Typography>
        </StyledLink>

        <StyledLink to="/" sx={styles.buttonLink}>
          {/* TODO: add style here when this is the selected route */}
          <Typography component="span" sx={styles.mainButton}>
            Practice stats
          </Typography>
        </StyledLink>

        <StyledLink to="/" sx={styles.buttonLink}>
          <Typography component="span" sx={styles.mainButton}>
            Drivers
          </Typography>
        </StyledLink>

        <StyledLink to="/" sx={styles.buttonLink}>
          <Typography component="span" sx={styles.mainButton}>
            Teams
          </Typography>
        </StyledLink>
      </Grid>
    </Grid>
  </MainContainer>
);

export default Header;
