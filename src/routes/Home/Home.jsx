import React from 'react';
import ReactGA from 'react-ga4';
import { useTheme, useMediaQuery, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import getStyles from './Home.styles';
import Layout from '../../components/Layout';
import { GiSpeedometer, GiCarWheel } from 'react-icons/gi';
import { TbCar4Wd } from 'react-icons/tb';
import { IoIosRadio } from 'react-icons/io';
import { IoStatsChart } from 'react-icons/io5';
import HomeHero from '../../components/HomeHero';
import HomeExploreItem from '../../components/HomeExploreItem';

const styles = getStyles();

const Home = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: '/',
    title: 'Home',
  });

  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

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
                title="PRACTICE STATS"
                icon={<IoStatsChart />}
                onClick={() => navigate('/practiceStats')}
                description="Aggregated lap times based on best sectors from Practice sessions with actual standings comparison"
              />

              <HomeExploreItem
                title="TYRE STRATEGY"
                icon={<GiCarWheel />}
                onClick={() => navigate('/tyres')}
                description="Tire usage analytics showing new and used compound counts across all practice sessions"
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
                title="STINT ANALYSIS"
                icon={<GiSpeedometer />}
                onClick={() => navigate('/stints')}
                description="Detailed stint breakdowns including lap times, tire compounds, and performance metrics per driver"
              />

              <HomeExploreItem
                title="TEAM RADIO"
                icon={<IoIosRadio />}
                onClick={() => navigate('/teamRadio')}
                description="Complete team radio communications from practice, qualifying, and race sessions"
              />
            </Box>
          </Box>
        ) : (
          <Box sx={styles.exploreItemsContainerMobile}>
            <HomeExploreItem
              title="PRACTICE STATS"
              icon={<IoStatsChart />}
              onClick={() => navigate('/practiceStats')}
              description="Aggregated lap times based on best sectors from Practice sessions with actual standings comparison"
            />

            <HomeExploreItem
              title="TYRE STRATEGY"
              icon={<GiCarWheel />}
              onClick={() => navigate('/tyres')}
              description="Tire usage analytics showing new and used compound counts across all practice sessions"
            />

            <HomeExploreItem
              title="STINT ANALYSIS"
              icon={<GiSpeedometer />}
              onClick={() => navigate('/stints')}
              description="Detailed stint breakdowns including lap times, tire compounds, and performance metrics per driver"
            />

            <HomeExploreItem
              title="TEAM RADIO"
              icon={<IoIosRadio />}
              onClick={() => navigate('/teamRadio')}
              description="Complete team radio communications from practice, qualifying, and race sessions"
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Home;
