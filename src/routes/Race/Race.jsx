import React, { useState, useEffect, useContext } from 'react';
import ReactGA from 'react-ga4';
import { useIntl } from 'react-intl';
import {
  useTheme,
  useMediaQuery,
  IconButton,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router';
import moment from 'moment';
import { orderBy } from 'lodash';
import getStyles from './Race.styles';
import {
  getAllGrandPrix,
  getDrivers,
  getSessionByMeetingAndName,
  getIntervals,
  getPosition,
} from '../../api';
import Layout from '../../components/Layout';
import DriverBigCard from '../../components/DriverBigCard';
import RaceIntervals from '../../components/RaceIntervals';
import RaceOverview from '../../components/RaceOverview';
import { ColorModeContext } from '../../components/ColorMode';
import LinearProgressBar from '../../components/LinearProgressBar';
import RaceSelect from '../../components/RaceSelect';
import { STATS_START_YEAR } from '../../constants/globalConsts';

const Race = () => {
  const intl = useIntl();

  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({
      hitType: 'pageview',
      page: '/race',
      title: 'Race',
    });
  }

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
  const [allDriverData, setAllDriverData] = useState();
  const [driverData, setDriverData] = useState();
  const [intervalsLoading, setIntervalsLoading] = useState(false);
  const [error, setStateError] = useState('');
  const [isSessionInProgress, setIsSessionInProgress] = useState(false);
  const [intervals, setIntervals] = useState([]);
  const [positions, setPositions] = useState([]);
  const [allPositions, setAllPositions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const [progress, setProgress] = useState(0);
  const shouldRenderInitMessage = !intervalsLoading && intervals.length === 0;

  useEffect(() => {
    const paramYear = searchParams.get('year');
    const startYear = STATS_START_YEAR;
    const currentYear = moment().year();
    const availableYears = [];

    for (let index = startYear; index <= currentYear; index++) {
      availableYears.push(index);
    }

    setYears(availableYears.reverse());

    if (paramYear) {
      const isParamYearValid = availableYears.some(
        (availableYear) => availableYear === Number(paramYear),
      );

      if (isParamYearValid) {
        handleYearChange({ target: { value: paramYear } });
      } else {
        resetData();
        navigate('/race');
      }
    }
  }, []);

  useEffect(() => {
    setSearchParams((params) => {
      params.set('year', year);
      return params;
    });

    if (year) {
      getCountries(year);
      setCountriesLoading(true);
    }
  }, [year]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set('country', country);
      return params;
    });

    if (country && meetingKey) {
      setDriversLoading(true);
      getAllDrivers(meetingKey);
      getAllPositionsData();
    }
  }, [country, meetingKey]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set('driver', driver);
      return params;
    });

    if (driver && driverNumber) {
      setIntervalsLoading(true);
      getIntervalsData();
    } else if (meetingKey && !driver) {
      setDriversLoading(true);
      getAllDrivers(meetingKey);
      getAllPositionsData();
    }
  }, [driver, driverNumber]);

  useEffect(() => {
    if (allDriverData && driverNumber) {
      setDriverData(
        allDriverData?.find((d) => d.driver_number === Number(driverNumber)),
      );
    }
  }, [driverNumber, allDriverData]);

  const setError = (errorMessage, sessionInProgress = false) => {
    setIntervalsLoading(false);
    setCountriesLoading(false);
    setDriversLoading(false);
    setStateError(errorMessage);
    setIsSessionInProgress(sessionInProgress);
    setProgress(0);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setCountry('');
    setCountries([]);
    setDriverNumber('');
    setDriver('');
    setAllDriverData();
    resetData();
  };

  const resetData = () => {
    setIntervals([]);
    setPositions([]);
    setAllPositions([]);
    setDriverData();
    setStateError('');
    setIsSessionInProgress(false);
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
      (d) =>
        `${d.team_name || intl.formatMessage({ id: 'race.notAvailable' })} - ${
          d.full_name
        } | ${d.driver_number}`,
    );

    if (drivers.hasError) {
      setError(drivers.message);
    } else {
      setDrivers(drivers);
      setAllDriverData(allDrivers);
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
        navigate('/race');
      }
    }
  };

  const handleCountryChange = (e) => {
    const selectedMeetingKey = e.target.value.split(' | ')[1];

    setCountry(e.target.value);
    setMeetingKey(selectedMeetingKey);
    setDriverNumber('');
    setDriver('');
    setAllDriverData();
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
      setError(allGrandPrix.message, allGrandPrix.isSessionInProgress);
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
        navigate('/race');
      }
    }
  };

  const getIntervalsData = async () => {
    setProgress(20);

    try {
      // First, get the session key for the race
      const sessionData = await getSessionByMeetingAndName(meetingKey, 'Race');
      setProgress(30);

      if (sessionData.hasError) {
        setError(sessionData.message);
        return;
      }

      if (sessionData.length === 0) {
        setError(intl.formatMessage({ id: 'race.noSessionFound' }));
        return;
      }

      const sessionKey = sessionData[0].session_key;
      setProgress(40);

      // Fetch intervals data
      const intervalsData = await getIntervals(sessionKey, driverNumber);
      setProgress(60);

      if (intervalsData.hasError) {
        setError(intervalsData.message);
        return;
      }

      // Fetch position data
      const positionData = await getPosition(sessionKey, driverNumber);
      setProgress(80);

      if (positionData.hasError) {
        setError(positionData.message);
        return;
      }

      if (intervalsData.length === 0 && positionData.length === 0) {
        setError(intl.formatMessage({ id: 'race.noDataAvailable' }));
        return;
      }

      setIntervals(intervalsData);
      setPositions(positionData);
      setProgress(100);
      setIntervalsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const getAllPositionsData = async () => {
    try {
      const sessionData = await getSessionByMeetingAndName(meetingKey, 'Race');

      if (sessionData.hasError || sessionData.length === 0) {
        return;
      }

      const sessionKey = sessionData[0].session_key;
      const allPositionsData = await getPosition(sessionKey);

      if (!allPositionsData.hasError && allPositionsData.length > 0) {
        setAllPositions(allPositionsData);
      }
    } catch (error) {
      console.error('Error fetching all positions:', error);
    }
  };

  const renderLoading = () => {
    if (!intervalsLoading) {
      return null;
    }

    return (
      <LinearProgressBar
        title={intl.formatMessage({ id: 'race.loadingIntervals' })}
        value={progress}
      />
    );
  };

  const renderDriverInfo = () => {
    if (!driverData || intervalsLoading) {
      return null;
    }

    return <DriverBigCard driver={driverData} />;
  };

  if (error) {
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
            allowEmptyDriver={true}
          />

          <Box sx={styles.divider} />

          {isSessionInProgress ? (
            <>
              <Box sx={styles.liveSessionContainer}>
                <Chip
                  label={intl.formatMessage({
                    id: 'race.liveSessionChip',
                  })}
                  sx={styles.liveChip}
                />
                <Typography component="h3" sx={styles.titleLiveSession}>
                  {intl.formatMessage({ id: 'race.liveSessionTitle' })}
                </Typography>
              </Box>

              <Typography component="h3" sx={styles.subTitleError}>
                {intl.formatMessage({
                  id: 'race.liveSessionMessage',
                })}
              </Typography>
            </>
          ) : (
            <>
              <Typography component="h3" sx={styles.titleError}>
                {intl.formatMessage({ id: 'race.errorTitle' })}
              </Typography>

              <Typography component="h3" sx={styles.subTitleError}>
                "{error}"
              </Typography>

              <Box sx={styles.refreshContainerError}>
                <Typography sx={styles.refreshLabelError}>
                  {intl.formatMessage({ id: 'race.refreshLabel' })}
                </Typography>

                <IconButton
                  sx={styles.refreshButtonError}
                  onClick={() => window.location.reload()}
                >
                  <RefreshIcon sx={styles.refreshIconError} />
                </IconButton>
              </Box>
            </>
          )}
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
          allowEmptyDriver={true}
        />

        <Box sx={styles.divider} />

        {shouldRenderInitMessage && !allPositions.length && (
          <Box component="p" sx={styles.description}>
            {intl.formatMessage({ id: 'race.description' })}
          </Box>
        )}

        {renderLoading()}

        {renderDriverInfo()}

        {!driver && allPositions.length > 0 && allDriverData && (
          <RaceOverview
            positions={allPositions}
            allDriverData={allDriverData}
          />
        )}

        {driver && (intervals.length > 0 || positions.length > 0) && (
          <RaceIntervals
            intervals={intervals}
            positions={positions}
            driverNumber={driverNumber}
            teamColour={driverData?.team_colour}
          />
        )}
      </Box>
    </Layout>
  );
};

export default Race;
