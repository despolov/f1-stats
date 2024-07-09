import React, { useState, useEffect } from 'react';
import {
  styled,
  useTheme,
  useMediaQuery,
  Typography,
  LinearProgress,
  Box,
  Button,
} from '@mui/material';
import Layout from '../../components/Layout';
import getStyles from './Stints.styles';
import getSessionStints from '../../utils/getSessionStints';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TyresCircle from '../../components/TyresCircle';
import DriverCard from '../../components/DriverCard/DriverCard';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const Title = styled('h3')(() => styles.title);

const Divider = styled('div')(() => styles.divider);

const Stints = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [year, setYear] = useState('');
  const [country, setCountry] = useState('');
  const [driverNumber, setDriverNumber] = useState([]);
  const [driver, setDriver] = useState();
  const [stintsLoading, setStintsLoading] = useState(false);
  const [error, setStateError] = useState('');
  const [stints, setStints] = useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { practice1, practice2, practice3, sprint, quali } = stints;

  useEffect(() => {
    const paramYear = searchParams.get('year');
    const paramCountry = searchParams.get('country');
    const paramDriver = searchParams.get('driverNumber');

    if (paramYear && paramCountry && paramDriver) {
      setYear(paramYear);
      setCountry(paramCountry);
      setDriverNumber(paramDriver);
    } else {
      setError(
        'It seems that year, country and driver number were not provided correctly, please check the link!',
      );
    }
  }, []);

  useEffect(() => {
    if (year && country && driverNumber) {
      setStintsLoading(true);
      getStints();
    }
  }, [year, country, driverNumber]);

  const setError = (errorMessage) => {
    setStintsLoading(false);
    setYear('');
    setCountry('');
    setDriverNumber('');
    setStateError(errorMessage);
  };

  const getStints = async () => {
    const practice1 = await getSessionStints(
      'Practice 1',
      year,
      country,
      driverNumber,
      setError,
    );
    const practice2 = await getSessionStints(
      'Practice 2',
      year,
      country,
      driverNumber,
      setError,
    );
    const practice3 = await getSessionStints(
      'Practice 3',
      year,
      country,
      driverNumber,
      setError,
    );
    const sprint = await getSessionStints(
      'Sprint',
      year,
      country,
      driverNumber,
      setError,
    );
    const quali = await getSessionStints(
      'Qualifying',
      year,
      country,
      driverNumber,
      setError,
    );
    // const sprintQuali = await getSessionStints( endpoint doesnt work for now
    //   'Sprint Qualifying',
    //   year,
    //   country,
    //   driverNumber,
    //   setError,
    // );
    let sessionsStints = { practice1, practice2, practice3, sprint, quali };

    setStints(sessionsStints);
    setStintsLoading(false);
  };

  const renderLoading = () => {
    if (!stintsLoading) {
      return null;
    }

    return (
      <>
        <Title>Loading stints...</Title>

        <LinearProgress color="secondary" sx={styles.progressLoader} />
      </>
    );
  };

  const renderDriverInfo = () => {
    if (!driver) {
      return null;
    }

    return <DriverCard driver={driver} />;
  };

  const renderStintGraph = (sessionStint, totalLaps) => {
    const {
      compound,
      // driver_number,
      lap_start,
      lap_end,
      stint_number,
      // tyre_age_at_start,
    } = sessionStint;
    let stintColor;
    const currentStintLaps = lap_end - lap_start + 1;
    const currentStintPercentage = (100 * currentStintLaps) / totalLaps;

    if (compound === 'SOFT') {
      stintColor = 'rgba(249, 0, 33, 1)';
    } else if (compound === 'MEDIUM') {
      stintColor = 'rgba(243,195,2,1)';
    } else if (compound === 'HARD') {
      stintColor = 'rgba(0,0,0,1)';
    } else if (compound === 'INTERMEDIATE') {
      stintColor = 'rgba(1,157,46,1)';
    } else if (compound === 'WET') {
      stintColor = 'rgba(47,98,161,1)';
    }

    return (
      <Box
        key={`${driverNumber}-stint-${stint_number}`}
        sx={{
          display: 'flex',
          width: `${currentStintPercentage}%`,
          height: '26px',
        }}
      >
        <Box
          sx={{
            zIndex: 1,
            height: '26px',
            width: '26px',
            backgroundColor: 'white',
            borderRadius: '50%',
          }}
        >
          <TyresCircle compound={compound} size="26" />
        </Box>

        <Box
          sx={{
            width: 'calc(100% - 24px)',
            margin: '0 0 0 -13px',
            backgroundColor: stintColor,
          }}
        />

        <Box
          sx={{
            height: '26px',
            width: '26px',
            textAlign: 'center',
            color: 'white',
            backgroundColor: stintColor,
            borderRadius: '50%',
            margin: '0 0 0 -13px',
          }}
        >
          {currentStintLaps}
        </Box>
      </Box>
    );
  };

  const renderStintsForSession = (session, title) => {
    const totalLaps = session[session.length - 1].lap_end;

    return (
      <>
        <Title>{title}</Title>

        <Typography>total laps: {totalLaps}</Typography>

        <Box
          sx={{ display: 'flex', width: '100%', margin: '40px 0', gap: '2px' }}
        >
          {session.map((sessionStint) => {
            return renderStintGraph(sessionStint, totalLaps);
          })}
        </Box>

        {session.map((sessionStint) => {
          const {
            compound,
            lap_start,
            lap_end,
            stint_number,
            tyre_age_at_start,
          } = sessionStint;
          const totalLaps = session[session.length - 1].lap_end;
          const currentStintLaps = lap_end - lap_start + 1;

          return (
            <Box
              sx={{ width: '100%', margin: '20px 0' }}
              key={`${driverNumber}-${stint_number}`}
            >
              <Typography>compound={compound}</Typography>

              <Typography>lap_start={lap_start}</Typography>

              <Typography>lap_end={lap_end}</Typography>

              <Typography>laps count={currentStintLaps}</Typography>

              <Typography>stint_number={stint_number}</Typography>

              <Typography>tyre_age_at_start={tyre_age_at_start}</Typography>

              {renderStintGraph(sessionStint, totalLaps)}
            </Box>
          );
        })}
      </>
    );
  };

  if (error) {
    return (
      <Layout>
        <ParentContainer
          sx={
            isDesktop
              ? styles.parentContainerError
              : styles.parentContainerMobileError
          }
        >
          <Title sx={styles.errorMessage}>{error}</Title>

          <Button
            onClick={() => {
              navigate('/tyres');
            }}
            variant="contained"
            color="primary"
            sx={styles.goBackButton}
          >
            GO BACK
          </Button>
        </ParentContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <ParentContainer sx={isDesktop ? {} : styles.parentContainerMobile}>
        {renderLoading()}

        {renderDriverInfo()}

        {practice1 && (
          <>
            {renderStintsForSession(practice1, 'Practice 1')}

            <Divider />
          </>
        )}

        {practice2 && (
          <>
            {renderStintsForSession(practice2, 'Practice 2')}

            <Divider />
          </>
        )}

        {practice3 && (
          <>
            {renderStintsForSession(practice3, 'Practice 3')}

            <Divider />
          </>
        )}

        {sprint && (
          <>
            {renderStintsForSession(sprint, 'Sprint')}

            <Divider />
          </>
        )}

        {quali && renderStintsForSession(quali, 'Qualifying')}
      </ParentContainer>
    </Layout>
  );
};

export default Stints;
