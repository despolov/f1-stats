import React, { useState, useEffect, useContext } from 'react';
import ReactGA from 'react-ga4';
import {
  useTheme,
  useMediaQuery,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import getStyles from './Stints.styles';
import Layout from '../../components/Layout';
import getSessionStints from '../../utils/getSessionStints';
import DriverStintsCard from '../../components/DriverStintsCard';
import SessionStints from '../../components/SessionStints';
import { ColorModeContext } from '../../components/ColorMode';
import LinearProgressBar from '../../components/LinearProgressBar';

const Stints = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: '/stints',
    title: 'Stints',
  });

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
  const { practice1, practice2, practice3, sprintQuali, sprint, quali } =
    stints;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const [progress, setProgress] = useState(0);

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
    setProgress(0);
  };

  const getStints = async () => {
    const practice1 = await getSessionStints(
      'Practice 1',
      year,
      country,
      driverNumber,
      setError,
      true,
      setProgress,
    );
    setProgress(20);

    const practice2 = await getSessionStints(
      'Practice 2',
      year,
      country,
      driverNumber,
      setError,
      false,
      setProgress,
    );
    setProgress(35);

    const practice3 = await getSessionStints(
      'Practice 3',
      year,
      country,
      driverNumber,
      setError,
      false,
      setProgress,
    );
    setProgress(50);

    const sprintQuali = await getSessionStints(
      'Sprint Qualifying',
      year,
      country,
      driverNumber,
      setError,
      false,
      setProgress,
    );
    setProgress(70);

    const sprint = await getSessionStints(
      'Sprint',
      year,
      country,
      driverNumber,
      setError,
      false,
      setProgress,
    );
    setProgress(85);

    const quali = await getSessionStints(
      'Qualifying',
      year,
      country,
      driverNumber,
      setError,
      false,
      setProgress,
    );
    setProgress(100);

    let sessionsStints = {
      practice1: practice1.stints,
      practice2,
      practice3,
      sprint,
      quali,
      sprintQuali,
    };

    setDriver(practice1.driver);
    setStints(sessionsStints);
    setStintsLoading(false);
  };

  const renderLoading = () => {
    if (!stintsLoading) {
      return null;
    }

    return <LinearProgressBar title="Loading stints..." value={progress} />;
  };

  const renderDriverInfo = () => {
    if (!driver) {
      return null;
    }

    return <DriverStintsCard driver={driver} />;
  };

  if (error) {
    return (
      <Layout>
        <Box
          sx={{
            ...styles.parentContainer,
            ...(isDesktop
              ? styles.parentContainerError
              : styles.parentContainerMobileError),
          }}
        >
          <Typography component="h3" sx={styles.titleError}>
            There seems to be a problem!
          </Typography>

          <Typography
            component="h3"
            sx={{ ...styles.title, ...styles.errorMessage }}
          >
            "{error}"
          </Typography>

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
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          ...styles.parentContainer,
          ...(isDesktop ? {} : styles.parentContainerMobile),
        }}
      >
        {renderLoading()}

        {renderDriverInfo()}

        {practice1 && (
          <SessionStints
            session={practice1}
            title="Practice 1"
            driverNumber={driverNumber}
          />
        )}

        {practice2 && (
          <SessionStints
            session={practice2}
            title="Practice 2"
            driverNumber={driverNumber}
          />
        )}

        {practice3 && (
          <SessionStints
            session={practice3}
            title="Practice 3"
            driverNumber={driverNumber}
          />
        )}

        {sprintQuali && (
          <SessionStints
            session={sprintQuali}
            title="Sprint Qualifying"
            driverNumber={driverNumber}
          />
        )}

        {sprint && (
          <SessionStints
            session={sprint}
            title="Sprint"
            driverNumber={driverNumber}
          />
        )}

        {quali && (
          <SessionStints
            session={quali}
            title="Qualifying"
            driverNumber={driverNumber}
          />
        )}
      </Box>
    </Layout>
  );
};

export default Stints;
