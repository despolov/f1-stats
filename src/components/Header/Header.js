import { styled, Grid, Typography, Avatar, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import getStyles from './Header.styles';

const styles = getStyles();

const MainContainer = styled('div')(() => styles.header);

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
          <Typography component="span" sx={styles.companyLabelPrimary}>
            F1
          </Typography>{' '}
          <Typography component="span" sx={styles.companyLabelSecondary}>
            Stats
          </Typography>
        </StyledLink>

        <StyledLink to="/" sx={styles.buttonLink}>
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
