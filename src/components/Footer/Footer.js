import React from 'react';
import { styled, Box, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import getStyles from './Footer.styles';
import MainLogo from '../MainLogo';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const styles = getStyles();

const StyledLink = styled(Link)(() => styles.link);

const Footer = () => (
  <Box component="footer" sx={styles.footer}>
    <Grid container align="center" justifyContent="center" alignItems="center">
      <Grid item xs align="left">
        <MainLogo />

        <Box sx={styles.linkContainer}>
          <StyledLink to="/practiceStats">
            <Button sx={styles.linkButton}>
              <Typography component="span" sx={styles.mainButton}>
                Practice stats
              </Typography>
            </Button>
          </StyledLink>

          <StyledLink to="/tyres">
            <Button sx={styles.linkButton}>
              <Typography component="span" sx={styles.mainButton}>
                Tyres
              </Typography>
            </Button>
          </StyledLink>
        </Box>
      </Grid>

      <Grid item xs align="right">
        <IconContext.Provider value={{ style: styles.icons }}>
          <Box
            component="a"
            href="https://github.com/despolov/f1-stats"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </Box>
        </IconContext.Provider>
      </Grid>

      <Grid item xs={12} align="center">
        <Box sx={styles.divider} />
      </Grid>

      <Grid item xs={12} align="center" sx={styles.bottomItem}>
        <Typography sx={styles.rightsText}>2024 - Georgi Despolov</Typography>
      </Grid>
    </Grid>

    <Grid
      container
      align="center"
      justifyContent="center"
      alignItems="center"
      sx={styles.footerGrid}
    ></Grid>
  </Box>
);

export default Footer;
