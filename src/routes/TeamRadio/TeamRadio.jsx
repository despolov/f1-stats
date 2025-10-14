import React, { useState, useEffect, useContext } from 'react';
import ReactGA from 'react-ga4';
import { useIntl } from 'react-intl';
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
import getStyles from './TeamRadio.styles';
import { getAllGrandPrix, getDrivers } from '../../api';
import Layout from '../../components/Layout';
import getSessionTeamRadio from '../../utils/getSessionTeamRadio';
import DriverBigCard from '../../components/DriverBigCard';
import SessionTeamRadio from '../../components/SessionTeamRadio';
import { ColorModeContext } from '../../components/ColorMode';
import LinearProgressBar from '../../components/LinearProgressBar';
import RaceSelect from '../../components/RaceSelect';
import { STATS_START_YEAR } from '../../constants/globalConsts';
import { getLocaleFromUrl, defaultLocale } from '../../i18n';

const TeamRadio = () => {
  const intl = useIntl();
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({
      hitType: 'pageview',
      page: '/teamRadio',
      title: 'Team Radio',
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
  const [driverData, setDriverData] = useState();
  const [teamRadioLoading, setTeamRadioLoading] = useState(false);
  const [error, setStateError] = useState('');
  const [teamRadio, setTeamRadio] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { practice1, practice2, practice3, sprintQuali, sprint, quali, race } =
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

    setYears(availableYears.reverse());

    if (paramYear) {
      const isParamYearValid = availableYears.some(
        (availableYear) => availableYear === Number(paramYear),
      );

      if (isParamYearValid) {
        handleYearChange({ target: { value: paramYear } });
      } else {
        resetData();
        const currentLocale = getLocaleFromUrl() || defaultLocale;
        navigate(`/${currentLocale}/teamRadio`);
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
      (d) =>
        `${
          d.team_name || intl.formatMessage({ id: 'teamRadio.notAvailable' })
        } - ${d.full_name} | ${d.driver_number}`,
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
        const currentLocale = getLocaleFromUrl() || defaultLocale;
        navigate(`/${currentLocale}/teamRadio`);
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
        const currentLocale = getLocaleFromUrl() || defaultLocale;
        navigate(`/${currentLocale}/teamRadio`);
      }
    }
  };

  const getTeamRadio = async () => {
    const countryKey = country.split(' - ')[0];
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    setProgress(15);

    await delay(800);

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
    setProgress(30);

    await delay(800);

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
    setProgress(45);

    await delay(800);

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
    setProgress(60);

    await delay(800);

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
    setProgress(75);

    await delay(800);

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
    setProgress(90);

    await delay(800);

    const race = await getSessionTeamRadio(
      'Race',
      year,
      countryKey,
      driverNumber,
      meetingKey,
      setError,
      false,
      setProgress,
    );
    setProgress(100);

    let sessionsTeamRadio = {
      practice1: practice1.stints,
      practice2: Array.isArray(practice2) ? practice2 : practice2?.stints,
      practice3,
      sprint,
      quali,
      sprintQuali,
      race,
    };

    setDriverData(practice1.driver || practice2.driver);
    setTeamRadio(sessionsTeamRadio);
    setTeamRadioLoading(false);
  };

  const renderLoading = () => {
    if (!teamRadioLoading) {
      return null;
    }

    return (
      <LinearProgressBar
        title={intl.formatMessage({ id: 'teamRadio.loadingTeamRadio' })}
        value={progress}
      />
    );
  };

  const renderDriverInfo = () => {
    if (!driverData) {
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
            ...(isDesktop
              ? styles.parentContainerError
              : styles.parentContainerMobileError),
          }}
        >
          <Typography component="h3" sx={styles.titleError}>
            {intl.formatMessage({ id: 'teamRadio.errorTitle' })}
          </Typography>

          <Typography
            component="h3"
            sx={{ ...styles.title, ...styles.errorMessage }}
          >
            "{error}"
          </Typography>

          <Box sx={styles.refreshContainerError}>
            <Typography sx={styles.refreshLabelError}>
              {intl.formatMessage({ id: 'teamRadio.refreshLabel' })}
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
            {intl.formatMessage({ id: 'teamRadio.description' })}
          </Box>
        )}

        {renderLoading()}

        {renderDriverInfo()}

        {practice1 && (
          <SessionTeamRadio
            session={practice1}
            title={intl.formatMessage({ id: 'sessionTeamRadio.practice1' })}
            teamColour={driverData?.team_colour}
          />
        )}

        {practice2 && (
          <SessionTeamRadio
            session={practice2}
            title={intl.formatMessage({ id: 'sessionTeamRadio.practice2' })}
            teamColour={driverData?.team_colour}
          />
        )}

        {practice3 && (
          <SessionTeamRadio
            session={practice3}
            title={intl.formatMessage({ id: 'sessionTeamRadio.practice3' })}
            teamColour={driverData?.team_colour}
          />
        )}

        {sprintQuali && (
          <SessionTeamRadio
            session={sprintQuali}
            title={intl.formatMessage({
              id: 'sessionTeamRadio.sprintQualifying',
            })}
            teamColour={driverData?.team_colour}
          />
        )}

        {sprint && (
          <SessionTeamRadio
            session={sprint}
            title={intl.formatMessage({ id: 'sessionTeamRadio.sprint' })}
            teamColour={driverData?.team_colour}
          />
        )}

        {quali && (
          <SessionTeamRadio
            session={quali}
            title={intl.formatMessage({ id: 'sessionTeamRadio.qualifying' })}
            teamColour={driverData?.team_colour}
          />
        )}

        {race && (
          <SessionTeamRadio
            session={race}
            title={intl.formatMessage({ id: 'sessionTeamRadio.race' })}
            teamColour={driverData?.team_colour}
          />
        )}
      </Box>
    </Layout>
  );
};

export default TeamRadio;
