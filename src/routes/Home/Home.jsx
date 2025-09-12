import React from 'react';
import ReactGA from 'react-ga4';
import { useTheme, useMediaQuery, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import getStyles from './Home.styles';
import Layout from '../../components/Layout';
import { GiSpeedometer, GiCarWheel } from 'react-icons/gi';
import { TbCar4Wd } from 'react-icons/tb';
import { IoIosRadio } from 'react-icons/io';
import { IoStatsChart } from 'react-icons/io5';
import HomeHero from '../../components/HomeHero';
import HomeExploreItem from '../../components/HomeExploreItem';
import { getLocaleFromUrl } from '../../i18n';

const styles = getStyles();

const Home = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({
      hitType: 'pageview',
      page: '/',
      title: 'Home',
    });
  }

  const intl = useIntl();
  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const currentLocale = getLocaleFromUrl() || 'en';

  return (
    <Layout fullScreen>
      <Box>
        <HomeHero />

        {isDesktop ? (
          <Box sx={styles.exploreItemsContainer}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              <HomeExploreItem
                title={intl.formatMessage({ id: 'home.practiceStats.title' })}
                icon={<IoStatsChart />}
                onClick={() => navigate(`/${currentLocale}/practiceStats`)}
                description={intl.formatMessage({
                  id: 'home.practiceStats.description',
                })}
              />

              <HomeExploreItem
                title={intl.formatMessage({ id: 'home.raceAnalysis.title' })}
                icon={<TbCar4Wd />}
                onClick={() => navigate(`/${currentLocale}/race`)}
                description={intl.formatMessage({
                  id: 'home.raceAnalysis.description',
                })}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              <HomeExploreItem
                title={intl.formatMessage({ id: 'home.tyreStrategy.title' })}
                icon={<GiCarWheel />}
                onClick={() => navigate(`/${currentLocale}/tyres`)}
                description={intl.formatMessage({
                  id: 'home.tyreStrategy.description',
                })}
              />

              <HomeExploreItem
                title={intl.formatMessage({ id: 'home.stintAnalysis.title' })}
                icon={<GiSpeedometer />}
                onClick={() => navigate(`/${currentLocale}/stints`)}
                description={intl.formatMessage({
                  id: 'home.stintAnalysis.description',
                })}
              />

              <HomeExploreItem
                title={intl.formatMessage({ id: 'home.teamRadio.title' })}
                icon={<IoIosRadio />}
                onClick={() => navigate(`/${currentLocale}/teamRadio`)}
                description={intl.formatMessage({
                  id: 'home.teamRadio.description',
                })}
              />
            </Box>
          </Box>
        ) : (
          <Box sx={styles.exploreItemsContainerMobile}>
            <HomeExploreItem
              title={intl.formatMessage({ id: 'home.practiceStats.title' })}
              icon={<IoStatsChart />}
              onClick={() => navigate('/practiceStats')}
              description={intl.formatMessage({
                id: 'home.practiceStats.description',
              })}
            />

            <HomeExploreItem
              title={intl.formatMessage({ id: 'home.raceAnalysis.title' })}
              icon={<TbCar4Wd />}
              onClick={() => navigate('/race')}
              description={intl.formatMessage({
                id: 'home.raceAnalysis.description',
              })}
            />

            <HomeExploreItem
              title={intl.formatMessage({ id: 'home.tyreStrategy.title' })}
              icon={<GiCarWheel />}
              onClick={() => navigate('/tyres')}
              description={intl.formatMessage({
                id: 'home.tyreStrategy.description',
              })}
            />

            <HomeExploreItem
              title={intl.formatMessage({ id: 'home.stintAnalysis.title' })}
              icon={<GiSpeedometer />}
              onClick={() => navigate('/stints')}
              description={intl.formatMessage({
                id: 'home.stintAnalysis.description',
              })}
            />

            <HomeExploreItem
              title={intl.formatMessage({ id: 'home.teamRadio.title' })}
              icon={<IoIosRadio />}
              onClick={() => navigate('/teamRadio')}
              description={intl.formatMessage({
                id: 'home.teamRadio.description',
              })}
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Home;
