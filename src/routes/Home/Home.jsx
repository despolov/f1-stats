import React from 'react';
import ReactGA from 'react-ga4';
import { useTheme, useMediaQuery, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import getStyles from './Home.styles';
import Layout from '../../components/Layout';
import { GiSpeedometer } from 'react-icons/gi';
import { PiTire } from 'react-icons/pi';
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
                description="Aggregated lap time based on the best sectors of each driver from every Practice session and the actual standings for comparison"
              />

              <HomeExploreItem
                title="TYRE STATS"
                icon={<PiTire />}
                onClick={() => navigate('/tyres')}
                description="Used and New tyres count for each driver from every available session before the race"
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
                title="STINTS STATS"
                icon={<GiSpeedometer />}
                onClick={() => navigate('/stints')}
                description="All Stints for each driver from every available session before the race"
              />

              <HomeExploreItem
                title="TEAM RADIO"
                icon={<IoIosRadio />}
                onClick={() => navigate('/teamRadio')}
                description="Team radio for each driver from every available session, including the race"
              />
            </Box>
          </Box>
        ) : (
          <Box sx={styles.exploreItemsContainerMobile}>
            <HomeExploreItem
              title="PRACTICE STATS"
              icon={<IoStatsChart />}
              onClick={() => navigate('/practiceStats')}
              description="Aggregated lap time based on the best sectors of each driver from every Practice session and the actual standings for comparison"
            />

            <HomeExploreItem
              title="TYRE STATS"
              icon={<PiTire />}
              onClick={() => navigate('/tyres')}
              description="Used and New tyres count for each driver from every available session before the race"
            />
            <HomeExploreItem
              title="STINTS STATS"
              icon={<GiSpeedometer />}
              onClick={() => navigate('/stints')}
              description="All Stints for each driver from every available session before the race"
            />

            <HomeExploreItem
              title="TEAM RADIO"
              icon={<IoIosRadio />}
              onClick={() => navigate('/teamRadio')}
              description="Team radio for each driver from every available session, including the race"
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Home;
