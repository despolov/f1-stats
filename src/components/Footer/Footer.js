import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import getStyles from './Footer.styles';
import MainLogo from '../MainLogo';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import moment from 'moment';

const styles = getStyles();

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box component="footer" sx={styles.footer}>
      <Grid
        container
        align="center"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs align="left">
          <MainLogo />

          <Box sx={styles.linkContainer}>
            <Button
              sx={styles.linkButton}
              onClick={() => {
                if (pathname === '/practiceStats') {
                  return;
                }

                navigate('/practiceStats');
              }}
            >
              <Typography component="span" sx={styles.mainButton}>
                Practice stats
              </Typography>
            </Button>

            <Button
              sx={styles.linkButton}
              onClick={() => {
                if (pathname === '/tyres') {
                  return;
                }

                navigate('/tyres');
              }}
            >
              <Typography component="span" sx={styles.mainButton}>
                Tyres
              </Typography>
            </Button>
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
          <Typography sx={styles.rightsText}>
            {moment().year()} - Georgi Despolov
          </Typography>
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
};

export default Footer;
