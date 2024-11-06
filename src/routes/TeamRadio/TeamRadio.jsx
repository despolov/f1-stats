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
import { useSearchParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { orderBy } from 'lodash';
import getStyles from './TeamRadio.styles';
import { getAllGrandPrix, getDrivers } from '../../api';
import Layout from '../../components/Layout';
import getSessionTeamRadio from '../../utils/getSessionTeamRadio';
import DriverStintsCard from '../../components/DriverStintsCard';
import SessionTeamRadio from '../../components/SessionTeamRadio';
import { ColorModeContext } from '../../components/ColorMode';
import LinearProgressBar from '../../components/LinearProgressBar';
import RaceSelect from '../../components/RaceSelect';
import { STATS_START_YEAR } from '../../constants/globalConsts';

const TeamRadio = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: '/teamRadio',
    title: 'Team Radio',
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

  const [teamRadioLoading, setTeamRadioLoading] = useState(false);
  const [error, setStateError] = useState('');
  const [teamRadio, setTeamRadio] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { practice1, practice2, practice3, sprintQuali, sprint, quali } =
    teamRadio;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const [progress, setProgress] = useState(0);
  const shouldRenderInitMessage =
    !teamRadioLoading && Object.keys(teamRadio).length === 0;

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
        navigate('/teamRadio');
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

      setTeamRadioLoading(true);
      getTeamRadio();
    }
  }, [driver, driverNumber]);

  const setError = (errorMessage) => {
    setTeamRadioLoading(false);
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
    setTeamRadio({});
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
        navigate('/teamRadio');
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
        navigate('/teamRadio');
      }
    }
  };

  const getTeamRadio = async () => {
    const countryKey = country.split(' - ')[0];

    const practice1 = await getSessionTeamRadio(
      'Practice 1',
      year,
      countryKey,
      driverNumber,
      meetingKey,
      setError,
      true,
      setProgress,
    );
    setProgress(20);

    const practice2 = await getSessionTeamRadio(
      'Practice 2',
      year,
      countryKey,
      driverNumber,
      meetingKey,
      setError,
      !Boolean(practice1.driver),
      setProgress,
    );
    setProgress(35);

    const practice3 = await getSessionTeamRadio(
      'Practice 3',
      year,
      countryKey,
      driverNumber,
      meetingKey,
      setError,
      false,
      setProgress,
    );
    setProgress(50);

    const sprintQuali = await getSessionTeamRadio(
      'Sprint Qualifying',
      year,
      countryKey,
      driverNumber,
      meetingKey,
      setError,
      false,
      setProgress,
    );
    setProgress(70);

    const sprint = await getSessionTeamRadio(
      'Sprint',
      year,
      countryKey,
      driverNumber,
      meetingKey,
      setError,
      false,
      setProgress,
    );
    setProgress(85);

    const quali = await getSessionTeamRadio(
      'Qualifying',
      year,
      countryKey,
      driverNumber,
      meetingKey,
      setError,
      false,
      setProgress,
    );
    setProgress(100);

    // TODO: add here also the race and change the increment of the progress bar

    let sessionsTeamRadio = {
      practice1: practice1.stints,
      practice2: Array.isArray(practice2) ? practice2 : practice2?.stints,
      practice3,
      sprint,
      quali,
      sprintQuali,
    };

    setDriverData(practice1.driver || practice2.driver);
    setTeamRadio(sessionsTeamRadio);
    setTeamRadioLoading(false);
  };

  const renderLoading = () => {
    if (!teamRadioLoading) {
      return null;
    }

    return <LinearProgressBar title="Loading team radio..." value={progress} />;
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
            Select year, country and driver in order to see team radio
          </Box>
        )}

        {renderLoading()}

        {renderDriverInfo()}

        {practice1 && (
          <SessionTeamRadio
            session={practice1}
            title="Practice 1"
            teamColour={driverData?.team_colour}
          />
        )}

        {practice2 && (
          <SessionTeamRadio
            session={practice2}
            title="Practice 2"
            teamColour={driverData?.team_colour}
          />
        )}

        {practice3 && (
          <SessionTeamRadio
            session={practice3}
            title="Practice 3"
            teamColour={driverData?.team_colour}
          />
        )}

        {sprintQuali && (
          <SessionTeamRadio
            session={sprintQuali}
            title="Sprint Qualifying"
            teamColour={driverData?.team_colour}
          />
        )}

        {sprint && (
          <SessionTeamRadio
            session={sprint}
            title="Sprint"
            teamColour={driverData?.team_colour}
          />
        )}

        {quali && (
          <SessionTeamRadio
            session={quali}
            title="Qualifying"
            teamColour={driverData?.team_colour}
          />
        )}

        {/* TODO: add team radio for the race here */}
      </Box>
    </Layout>
  );
};

export default TeamRadio;
