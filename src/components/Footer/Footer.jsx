import React from 'react';
import {
  useTheme,
  useMediaQuery,
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import getStyles from './Footer.styles';
import MainLogo from '../MainLogo';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import moment from 'moment';
import { version } from '../../../package.json';

const styles = getStyles();

const Footer = (props) => {
  const { footerRef } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const intl = useIntl();
  const features = [
    {
      key: 'practiceStats',
      title: intl.formatMessage({ id: 'home.practiceStats.title' }),
    },
    {
      key: 'raceAnalysis',
      title: intl.formatMessage({ id: 'home.raceAnalysis.title' }),
    },
    {
      key: 'tyreStrategy',
      title: intl.formatMessage({ id: 'home.tyreStrategy.title' }),
    },
    {
      key: 'stintAnalysis',
      title: intl.formatMessage({ id: 'home.stintAnalysis.title' }),
    },
    {
      key: 'teamRadio',
      title: intl.formatMessage({ id: 'home.teamRadio.title' }),
    },
  ];

  return (
    <Box ref={footerRef} component="footer" sx={styles.footer}>
      <Grid container spacing={4} sx={styles.mainContent}>
        {/* Left Section - Logo & About */}
        <Grid
          item
          xs={12}
          md={4}
          sx={isDesktop ? {} : styles.gridItemNoPadding}
        >
          <MainLogo />

          <Typography sx={styles.aboutText}>
            {intl.formatMessage({ id: 'footer.aboutDescription' })}
          </Typography>

          <Typography sx={styles.tagline}>
            {intl.formatMessage({ id: 'footer.tagline' })}
          </Typography>
        </Grid>

        {/* Middle Section - Features */}
        <Grid
          item
          xs={12}
          md={4}
          sx={isDesktop ? {} : styles.gridItemNoPadding}
        >
          <Typography sx={styles.sectionTitle}>
            {intl.formatMessage({ id: 'footer.featuresTitle' })}
          </Typography>

          <Box sx={styles.featuresList}>
            {features.map((feature) => (
              <Typography key={feature.key} sx={styles.featureItem}>
                • {feature.title}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Right Section - Connect */}
        <Grid
          item
          xs={12}
          md={4}
          sx={isDesktop ? {} : styles.gridItemNoPadding}
        >
          <Typography sx={styles.sectionTitle}>
            {intl.formatMessage({ id: 'footer.connectTitle' })}
          </Typography>

          <IconContext.Provider value={{ style: styles.icons }}>
            <Box
              component="a"
              href="https://github.com/despolov/f1-stats/discussions"
              target="_blank"
              rel="noopener noreferrer"
              sx={styles.githubLink}
            >
              <FaGithub />

              <Typography sx={styles.githubText}>
                {intl.formatMessage({ id: 'footer.githubDiscussions' })}
              </Typography>
            </Box>
          </IconContext.Provider>
        </Grid>
      </Grid>

      {/* Divider */}
      <Box sx={styles.divider} />

      {/* Disclaimer Section */}
      <Box sx={styles.disclaimerSection}>
        <Typography sx={styles.disclaimerText}>
          {intl.formatMessage({ id: 'footer.disclaimer' })}
        </Typography>
      </Box>

      {/* Bottom Section - Copyright & Version */}
      <Box sx={styles.bottomSection}>
        <Typography sx={styles.copyrightText}>
          © {moment().year()} Georgi Despolov
        </Typography>

        <Typography sx={styles.versionText}>
          {intl.formatMessage({ id: 'footer.version' })} {version}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
