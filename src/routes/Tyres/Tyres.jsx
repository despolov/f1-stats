import React, { useState, useEffect, useContext } from 'react';
import ReactGA from 'react-ga4';
import {
  useTheme,
  useMediaQuery,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import moment from 'moment';
import { getAllGrandPrix } from '../../api';
import Layout from '../../components/Layout';
import getStyles from './Tyres.styles';
import getSessionTyreStats from '../../utils/getSessionTyreStats';
import RaceSelect from '../../components/RaceSelect';
import checkIsSprintWeekend from '../../utils/checkIsSprintWeekend';
import DriverTyresCard from '../../components/DriverTyresCard';
import TyresLegend from '../../components/TyresLegend';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router';
import { ColorModeContext } from '../../components/ColorMode';
import LinearProgressBar from '../../components/LinearProgressBar';
import { STATS_START_YEAR } from '../../constants/globalConsts';

const Tyres = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({
      hitType: 'pageview',
      page: '/tyres',
      title: 'Tyres',
    });
  }

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [years, setYears] = useState([]);
  const [year, setYear] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [tyresStatsLoading, setTyresStatsLoading] = useState(false);
  const [error, setStateError] = useState('');
  const [tyresStats, setTyresStats] = useState({});
  const [isSprintWeekend, setIsSprintWeekend] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const shouldRenderInitMessage =
    !tyresStatsLoading && Object.keys(tyresStats).length === 0;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  useEffect(() => {
    const startYear = STATS_START_YEAR;
    const currentYear = moment().year();
    const availableYears = [];

    for (let index = startYear; index <= currentYear; index++) {
      availableYears.push(index);
    }

    setYears(availableYears);

    const paramYear = searchParams.get('year');

    if (paramYear) {
      const isParamYearValid = availableYears.some(
        (availableYear) => availableYear === Number(paramYear),
      );

      if (isParamYearValid) {
        handleYearChange({ target: { value: paramYear } });
      } else {
        resetData();
        navigate('/tyres');
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
      const countrySplittedByMeetingDelimiter = country.split(' | ');

      setSearchParams((params) => {
        params.set('country', country);
        return params;
      });
      setTyresStatsLoading(true);
      getTyresStats(
        year,
        country.split(' - ')[0],
        countrySplittedByMeetingDelimiter[1],
      );
      const isSprint = checkIsSprintWeekend(
        Number(year),
        countrySplittedByMeetingDelimiter[0],
      );

      setIsSprintWeekend(isSprint);
    }
  }, [country]);

  const resetData = () => {
    setTyresStats({});
    setIsSprintWeekend(false);
    setStateError('');
    setProgress(0);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setCountry('');
    setCountries([]);
    resetData();
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    resetData();
  };

  const setError = (errorMessage) => {
    setTyresStatsLoading(false);
    setCountriesLoading(false);
    setYear('');
    setCountry('');
    setCountries([]);
    setStateError(errorMessage);
    setProgress(0);
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
        navigate('/tyres');
      }
    }
  };

  const addSessionTyresStats = (session, sessionUsedTyres, sessionType) => {
    if (session && Object.keys(session).length > 0) {
      const sessionKey = `${sessionType}UsedTyres`;

      Object.keys(session).forEach((practiceDriver) => {
        const SOFT =
          (Object.hasOwn(sessionUsedTyres, practiceDriver)
            ? sessionUsedTyres[practiceDriver].usedTyres.SOFT
            : 0) + session[practiceDriver].usedTyres.SOFT;
        const MEDIUM =
          (Object.hasOwn(sessionUsedTyres, practiceDriver)
            ? sessionUsedTyres[practiceDriver].usedTyres.MEDIUM
            : 0) + session[practiceDriver].usedTyres.MEDIUM;
        const HARD =
          (Object.hasOwn(sessionUsedTyres, practiceDriver)
            ? sessionUsedTyres[practiceDriver].usedTyres.HARD
            : 0) + session[practiceDriver].usedTyres.HARD;
        const INTERMEDIATE =
          (Object.hasOwn(sessionUsedTyres, practiceDriver)
            ? sessionUsedTyres[practiceDriver].usedTyres.INTERMEDIATE
            : 0) + session[practiceDriver].usedTyres.INTERMEDIATE;
        const WET =
          (Object.hasOwn(sessionUsedTyres, practiceDriver)
            ? sessionUsedTyres[practiceDriver].usedTyres.WET
            : 0) + session[practiceDriver].usedTyres.WET;

        sessionUsedTyres[practiceDriver] = {
          ...sessionUsedTyres[practiceDriver],
          driver: session[practiceDriver].driver,
          usedTyres: {
            SOFT,
            MEDIUM,
            HARD,
            INTERMEDIATE,
            WET,
          },
          [sessionKey]: session[practiceDriver].usedTyres,
        };
      });
    }
  };

  const getTyresStats = async (selectedYear, selectedCountry, meetingKey) => {
    const practice1 = await getSessionTyreStats(
      'Practice 1',
      selectedYear,
      selectedCountry,
      meetingKey,
      setError,
      setProgress,
    );
    setProgress(20);

    const practice2 = await getSessionTyreStats(
      'Practice 2',
      selectedYear,
      selectedCountry,
      meetingKey,
      setError,
      setProgress,
    );
    setProgress(35);

    const practice3 = await getSessionTyreStats(
      'Practice 3',
      selectedYear,
      selectedCountry,
      meetingKey,
      setError,
      setProgress,
    );
    setProgress(50);

    const sprintQuali = await getSessionTyreStats(
      'Sprint Qualifying',
      selectedYear,
      selectedCountry,
      meetingKey,
      setError,
      setProgress,
    );
    setProgress(70);

    const sprint = await getSessionTyreStats(
      'Sprint',
      selectedYear,
      selectedCountry,
      meetingKey,
      setError,
      setProgress,
    );
    setProgress(85);

    const quali = await getSessionTyreStats(
      'Qualifying',
      selectedYear,
      selectedCountry,
      meetingKey,
      setError,
      setProgress,
    );
    setProgress(100);

    let sessionsUsedTyres = {};

    addSessionTyresStats(practice1, sessionsUsedTyres, 'practice1');
    addSessionTyresStats(practice2, sessionsUsedTyres, 'practice2');
    addSessionTyresStats(practice3, sessionsUsedTyres, 'practice3');
    addSessionTyresStats(sprintQuali, sessionsUsedTyres, 'sprintQuali');
    addSessionTyresStats(sprint, sessionsUsedTyres, 'sprint');
    addSessionTyresStats(quali, sessionsUsedTyres, 'quali');
    setTyresStats(sessionsUsedTyres);
    setTyresStatsLoading(false);
  };

  const renderLoading = () => {
    if (!tyresStatsLoading) {
      return null;
    }

    return <LinearProgressBar title="Loading tyre stats..." value={progress} />;
  };

  const renderTyresStats = () => {
    if (Object.keys(tyresStats).length === 0 || tyresStatsLoading) {
      return null;
    }

    return (
      <>
        <Typography component="h4" sx={styles.subTitle}>
          {isSprintWeekend
            ? 'New and used tyres from practices, sprint and qualifying'
            : 'New and used tyres from practices and qualifying'}
        </Typography>

        <TyresLegend isSprintWeekend={isSprintWeekend} component="image" />

        <Box
          sx={isDesktop ? styles.statsContainer : styles.statsContainerMobile}
        >
          {Object.keys(tyresStats).map((driverAcronym) => (
            <DriverTyresCard
              key={`driver_tyres_card_${driverAcronym}`}
              stats={tyresStats[driverAcronym]}
              isSprintWeekend={isSprintWeekend}
              onAllStintsClick={() => {
                const { team_name, full_name, driver_number } =
                  tyresStats[driverAcronym].driver;
                navigate({
                  pathname: '/stints',
                  search: createSearchParams({
                    year,
                    country: country,
                    driver: `${
                      team_name || 'n/a'
                    } - ${full_name} | ${driver_number}`,
                  }).toString(),
                });
              }}
            />
          ))}
        </Box>
      </>
    );
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
          />

          <Box sx={styles.divider} />

          <Typography component="h3" sx={styles.titleError}>
            There seems to be a problem!
          </Typography>

          <Typography component="h3" sx={styles.subTitleError}>
            "{error}"
          </Typography>

          <Box sx={styles.refreshContainerError}>
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
        />

        <Box sx={styles.divider} />

        {shouldRenderInitMessage && (
          <Box component="p" sx={styles.description}>
            Select year and country in order to see tyre stats
          </Box>
        )}

        {renderLoading()}

        {renderTyresStats()}
      </Box>
    </Layout>
  );
};

export default Tyres;
