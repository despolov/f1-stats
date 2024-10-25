import React, { useRef, useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useTheme, useMediaQuery, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import getStyles from './Home.styles';
import Layout from '../../components/Layout';
import { GiSpeedometer } from 'react-icons/gi';
import { ImStatsDots } from 'react-icons/im';
import { PiTire } from 'react-icons/pi';
import useDimensions from '../../hooks/useDimensions';
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
  const [contianerHeight, setContianerHeight] = useState(0);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const { height: headerHeight } = useDimensions(headerRef);
  const { height: footerHeight } = useDimensions(footerRef);

  useEffect(() => {
    if (headerHeight > 0 && footerHeight > 0) {
      setContianerHeight(
        `calc(100vh - (${headerHeight}px + ${footerHeight}px))`,
      );
    }
  }, [headerHeight, footerHeight]);

  return (
    <Layout fullScreen headerRef={headerRef} footerRef={footerRef}>
      <Box sx={isDesktop ? { height: contianerHeight } : {}}>
        <HomeHero />

        <Box
          sx={
            isDesktop
              ? styles.exploreItemsContainer
              : styles.exploreItemsContainerMobile
          }
        >
          <HomeExploreItem
            title="PRACTICE STATS"
            icon={<ImStatsDots />}
            onClick={() => navigate('/practiceStats')}
            description="Aggregated lap time based on the best sectors of each driver from every
        Practice session and the actual standings for comparison"
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
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
