import React, { useState, useEffect } from 'react';
import {
  styled,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Button,
} from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import getStyles from './Stints.styles';
import Layout from '../../components/Layout';
import getSessionStints from '../../utils/getSessionStints';
import DriverStintsCard from '../../components/DriverStintsCard/DriverStintsCard';
import SessionStints from '../../components/SessionStints/SessionStints';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const Title = styled('h3')(() => styles.title);

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
  const { practice1, practice2, practice3, sprintQuali, sprint, quali } =
    stints;

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
      true,
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
    const sprintQuali = await getSessionStints(
      'Sprint Qualifying',
      year,
      country,
      driverNumber,
      setError,
    );
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

    return <DriverStintsCard driver={driver} />;
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
      </ParentContainer>
    </Layout>
  );
};

export default Stints;
