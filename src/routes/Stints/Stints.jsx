import React, { useState, useEffect, useContext } from 'react';
import ReactGA from 'react-ga4';
import {
  useTheme,
  useMediaQuery,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router';
import moment from 'moment';
import { orderBy } from 'lodash';
import getStyles from './Stints.styles';
import { getAllGrandPrix, getDrivers } from '../../api';
import Layout from '../../components/Layout';
import getSessionStints from '../../utils/getSessionStints';
import DriverStintsCard from '../../components/DriverStintsCard';
import SessionStints from '../../components/SessionStints';
import { ColorModeContext } from '../../components/ColorMode';
import LinearProgressBar from '../../components/LinearProgressBar';
import RaceSelect from '../../components/RaceSelect';
import { STATS_START_YEAR } from '../../constants/globalConsts';

const Stints = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: '/stints',
    title: 'Stints',
  });

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [years, setYears] = useState([]);
  const [year, setYear] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [driverNumber, setDriverNumber] = useState('');
  const [driversLoading, setDriversLoading] = useState(false);
  const [meetingKey, setMeetingKey] = useState('');
  const [driver, setDriver] = useState('');
  const [driverData, setDriverData] = useState();
  const [stintsLoading, setStintsLoading] = useState(false);
  const [error, setStateError] = useState('');
  const [stints, setStints] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { practice1, practice2, practice3, sprintQuali, sprint, quali } =
    stints;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const [progress, setProgress] = useState(0);
  const shouldRenderInitMessage =
    !stintsLoading && Object.keys(stints).length === 0;

  useEffect(() => {
    const paramYear = searchParams.get('year');
    const startYear = STATS_START_YEAR;
    const currentYear = moment().year();
    const availableYears = [];

    for (let index = startYear; index <= currentYear; index++) {
      availableYears.push(index);
    }

    setYears(availableYears);

    if (paramYear) {
      const isParamYearValid = availableYears.some(
        (availableYear) => availableYear === Number(paramYear),
      );

      if (isParamYearValid) {
        handleYearChange({ target: { value: paramYear } });
      } else {
        resetData();
        navigate('/stints');
      }
    }
  }, []);

  useEffect(() => {
    if (year) {
      setSearchParams((params) => {
        params.set('year', year);
        return params;
      });
      getCountries(year);
      setCountriesLoading(true);
    }
  }, [year]);

  useEffect(() => {
    if (country) {
      setSearchParams((params) => {
        params.set('country', country);
        return params;
      });
      setDriversLoading(true);
      getAllDrivers(meetingKey);
    }
  }, [country]);

  useEffect(() => {
    if (driver && driverNumber) {
      setSearchParams((params) => {
        params.set('driver', driver);
        return params;
      });

      setStintsLoading(true);
      getStints();
    }
  }, [driver, driverNumber]);

  const setError = (errorMessage) => {
    setStintsLoading(false);
    setYear('');
    setCountry('');
    setDriverNumber('');
    setMeetingKey('');
    setStateError(errorMessage);
    setProgress(0);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setCountry('');
    setCountries([]);
    setDriverNumber('');
    setDriver('');
    resetData();
  };

  const resetData = () => {
    setStints({});
    setDriverData();
    setStateError('');
    setProgress(0);
  };

  const getAllDrivers = async (selectedMeetingKey) => {
    const allDrivers = await getDrivers(
      undefined,
      undefined,
      selectedMeetingKey,
    );
    let drivers = orderBy(allDrivers, ['team_name']);
    drivers = drivers.map(
      (d) => `${d.team_name || 'n/a'} - ${d.full_name} | ${d.driver_number}`,
    );

    if (drivers.hasError) {
      setError(drivers.message);
    } else {
      setDrivers(drivers);
    }

    setDriversLoading(false);

    const paramDriver = searchParams.get('driver');

    if (paramDriver) {
      const isParamDriverValid = drivers.some(
        (mappedDriver) => mappedDriver === paramDriver,
      );

      if (isParamDriverValid) {
        handleDriverChange({ target: { value: paramDriver } });
      } else {
        resetData();
        setYear('');
        setCountry('');
        setDriverNumber('');
        setDriver('');
        navigate('/stints');
      }
    }
  };

  const handleCountryChange = (e) => {
    const selectedMeetingKey = e.target.value.split(' | ')[1];

    setCountry(e.target.value);
    setMeetingKey(selectedMeetingKey);
    setDriverNumber('');
    setDriver('');
    resetData();
  };

  const handleDriverChange = (e) => {
    resetData();
    setDriver(e.target.value);
    setDriverNumber(e.target.value.split(' | ')[1]);
  };

  const getCountries = async (selectedYear) => {
    const allGrandPrix = await getAllGrandPrix(selectedYear);

    if (allGrandPrix.hasError) {
      setError(allGrandPrix.message);
      return;
    }

    const mappedCountries = allGrandPrix.map(
      (granPrix) =>
        `${granPrix.country_name} - ${granPrix.meeting_name} | ${granPrix.meeting_key}`,
    );

    setCountries(mappedCountries);
    setCountriesLoading(false);

    const paramCountry = searchParams.get('country');

    if (paramCountry) {
      const isParamCountryValid = mappedCountries.some(
        (mappedCountry) => mappedCountry === paramCountry,
      );

      if (isParamCountryValid) {
        handleCountryChange({ target: { value: paramCountry } });
      } else {
        resetData();
        setYear('');
        setCountry('');
        setDriverNumber('');
        setDriver('');
        navigate('/stints');
      }
    }
  };

  const getStints = async () => {
    const practice1 = await getSessionStints(
      'Practice 1',
      year,
      country.split(' - ')[0],
      driverNumber,
      meetingKey,
      setError,
      true,
      setProgress,
    );
    setProgress(20);

    const practice2 = await getSessionStints(
      'Practice 2',
      year,
      country.split(' - ')[0],
      driverNumber,
      meetingKey,
      setError,
      false,
      setProgress,
    );
    setProgress(35);

    const practice3 = await getSessionStints(
      'Practice 3',
      year,
      country.split(' - ')[0],
      driverNumber,
      meetingKey,
      setError,
      false,
      setProgress,
    );
    setProgress(50);

    const sprintQuali = await getSessionStints(
      'Sprint Qualifying',
      year,
      country.split(' - ')[0],
      driverNumber,
      meetingKey,
      setError,
      false,
      setProgress,
    );
    setProgress(70);

    const sprint = await getSessionStints(
      'Sprint',
      year,
      country.split(' - ')[0],
      driverNumber,
      meetingKey,
      setError,
      false,
      setProgress,
    );
    setProgress(85);

    const quali = await getSessionStints(
      'Qualifying',
      year,
      country.split(' - ')[0],
      driverNumber,
      meetingKey,
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

    setDriverData(practice1.driver);
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
    if (!driverData) {
      return null;
    }

    return <DriverStintsCard driver={driverData} />;
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

          <Box sx={styles.refreshContianerError}>
            <Typography sx={styles.refreshLabelError}>
              Try refreshing the page →
            </Typography>

            <IconButton
              sx={styles.refreshButtonError}
              onClick={() => window.location.reload()}
            >
              <RefreshIcon sx={styles.refreshIconError} />
            </IconButton>
          </Box>
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
        <RaceSelect
          year={year}
          handleYearChange={handleYearChange}
          years={years}
          country={country}
          handleCountryChange={handleCountryChange}
          countries={countries}
          countriesLoading={countriesLoading}
          isDriversVisible
          driver={driver}
          handleDriverChange={handleDriverChange}
          drivers={drivers}
          driversLoading={driversLoading}
        />

        <Box sx={styles.divider} />

        {shouldRenderInitMessage && (
          <Box component="p" sx={styles.description}>
            Select year, country and driver in order to see stint stats
          </Box>
        )}

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
