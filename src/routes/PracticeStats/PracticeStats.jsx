import React, { useEffect, useState, useContext } from 'react';
import ReactGA from 'react-ga4';
import { useIntl } from 'react-intl';
import Layout from '../../components/Layout';
import getStyles from './PracticeStats.styles';
import {
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { getAllGrandPrix, getWeather } from '../../api';
import AggregatedPracticeTable from '../../components/AggregatedPracticeTable';
import AggregatedPracticeMobileTable from '../../components/AggregatedPracticeMobileTable';
import ActualPracticeTable from '../../components/ActualPracticeTable';
import ActualPracticeMobileTable from '../../components/ActualPracticeMobileTable';
import { orderBy } from 'lodash';
import PracticeTimeSlot from '../../components/PracticeTimeSlot';
import PracticeWeather from '../../components/PracticeWeather';
import LinearProgressBar from '../../components/LinearProgressBar';
import getSinglePracticeStats from '../../utils/getSinglePracticeStats';
import addGapBetweenDrivers from '../../utils/addGapBetweenDrivers';
import moment from 'moment';
import RaceSelect from '../../components/RaceSelect';
import { useSearchParams, useNavigate } from 'react-router';
import { ColorModeContext } from '../../components/ColorMode';
import PracticeBarChart from '../../components/PracticeBarChart';
import { STATS_START_YEAR } from '../../constants/globalConsts';

const PracticeStats = () => {
  const intl = useIntl();

  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({
      hitType: 'pageview',
      page: '/practiceStats',
      title: 'Practice Stats',
    });
  }

  const [years, setYears] = useState([]);
  const [year, setYear] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [practice1Stats, setPractice1Stats] = useState([]);
  const [practice2Stats, setPractice2Stats] = useState([]);
  const [practice3Stats, setPractice3Stats] = useState([]);
  const [practice1ActualStats, setPractice1ActualStats] = useState([]);
  const [practice2ActualStats, setPractice2ActualStats] = useState([]);
  const [practice3ActualStats, setPractice3ActualStats] = useState([]);
  const [practice1Weather, setPractice1Weather] = useState([]);
  const [practice2Weather, setPractice2Weather] = useState([]);
  const [practice3Weather, setPractice3Weather] = useState([]);
  const [practice1WeatherLoading, setPractice1WeatherLoading] = useState(true);
  const [practice2WeatherLoading, setPractice2WeatherLoading] = useState(true);
  const [practice3WeatherLoading, setPractice3WeatherLoading] = useState(true);
  const [practice1Loading, setPractice1Loading] = useState(false);
  const [practice2Loading, setPractice2Loading] = useState(false);
  const [practice3Loading, setPractice3Loading] = useState(false);
  const [practice1TimePeriod, setPractice1TimePeriod] = useState({});
  const [practice2TimePeriod, setPractice2TimePeriod] = useState({});
  const [practice3TimePeriod, setPractice3TimePeriod] = useState({});
  const [practiceStatsLoading, setPracticeStatsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setStateError] = useState('');
  const [isSessionInProgress, setIsSessionInProgress] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const shouldRenderInitMessage =
    !practiceStatsLoading &&
    !practice1Loading &&
    !practice2Loading &&
    !practice3Loading &&
    practice1Stats.length === 0 &&
    practice2Stats.length === 0 &&
    practice3Stats.length === 0;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  useEffect(() => {
    const currentYear = moment().year();
    const availableYears = [];

    for (let index = STATS_START_YEAR; index <= currentYear; index++) {
      availableYears.push(index);
    }

    setYears(availableYears.reverse());

    const paramYear = searchParams.get('year');

    if (paramYear) {
      const isParamYearValid = availableYears.some(
        (availableYear) => availableYear === Number(paramYear),
      );

      if (isParamYearValid) {
        handleYearChange({ target: { value: paramYear } });
      } else {
        resetData();
        navigate('/practiceStats');
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

    if (country) {
      setPracticeStatsLoading(true);
      getAllPracticesStats(
        year,
        country.split(' - ')[0],
        country.split(' | ')[1],
      );
    }
  }, [country]);

  const setError = (errorMessage, sessionInProgress = false) => {
    setPracticeStatsLoading(false);
    setCountriesLoading(false);
    setStateError(errorMessage);
    setIsSessionInProgress(sessionInProgress);
    setProgress(0);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setCountry('');
    setCountries([]);
    resetData();
  };

  const resetData = () => {
    setPractice1Stats([]);
    setPractice2Stats([]);
    setPractice3Stats([]);
    setPractice1ActualStats([]);
    setPractice2ActualStats([]);
    setPractice3ActualStats([]);
    setPractice1Weather([]);
    setPractice2Weather([]);
    setPractice3Weather([]);
    setPractice1WeatherLoading(true);
    setPractice2WeatherLoading(true);
    setPractice3WeatherLoading(true);
    setPractice1Loading(false);
    setPractice2Loading(false);
    setPractice3Loading(false);
    setPractice1TimePeriod({});
    setPractice2TimePeriod({});
    setPractice3TimePeriod({});
    setStateError('');
    setIsSessionInProgress(false);
    setProgress(0);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    resetData();
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
        navigate('/practiceStats');
      }
    }
  };

  const getAllPracticesStats = async (
    selectedYear,
    selectedCountry,
    meetingKey,
  ) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    setPractice1Loading(true);
    const practice1 = await getSinglePracticeStats(
      'Practice 1',
      selectedYear,
      selectedCountry,
      meetingKey,
      setError,
      setProgress,
    );

    if (practice1) {
      const practice1WithGap = addGapBetweenDrivers(
        orderBy(practice1?.bestSectorsPerDriver || [], ['aggregatedLap']),
        'aggregatedLap',
      );
      const practice1ActualWithGap = addGapBetweenDrivers(
        orderBy(practice1?.bestLapPerDriver || [], ['lapDuration']),
        'lapDuration',
      );
      setPractice1Stats(practice1WithGap);
      setPractice1ActualStats(practice1ActualWithGap);
      setPractice1TimePeriod(practice1?.timePeriod || {});
    }
    setPractice1Loading(false);

    // Add 800ms delay before fetching Practice 2 (throttle API calls)
    await delay(800);

    setPractice2Loading(true);
    const practice2 = await getSinglePracticeStats(
      'Practice 2',
      selectedYear,
      selectedCountry,
      meetingKey,
      setError,
      setProgress,
    );

    if (practice2) {
      const practice2WithGap = addGapBetweenDrivers(
        orderBy(practice2?.bestSectorsPerDriver || [], ['aggregatedLap']),
        'aggregatedLap',
      );
      const practice2ActualWithGap = addGapBetweenDrivers(
        orderBy(practice2?.bestLapPerDriver || [], ['lapDuration']),
        'lapDuration',
      );
      setPractice2Stats(practice2WithGap);
      setPractice2ActualStats(practice2ActualWithGap);
      setPractice2TimePeriod(practice2?.timePeriod || {});
    }
    setPractice2Loading(false);

    // Add 800ms delay before fetching Practice 3 (throttle API calls)
    await delay(800);

    setPractice3Loading(true);
    const practice3 = await getSinglePracticeStats(
      'Practice 3',
      selectedYear,
      selectedCountry,
      meetingKey,
      setError,
      setProgress,
    );

    if (practice3) {
      const practice3WithGap = addGapBetweenDrivers(
        orderBy(practice3?.bestSectorsPerDriver || [], ['aggregatedLap']),
        'aggregatedLap',
      );
      const practice3ActualWithGap = addGapBetweenDrivers(
        orderBy(practice3?.bestLapPerDriver || [], ['lapDuration']),
        'lapDuration',
      );
      setPractice3Stats(practice3WithGap);
      setPractice3ActualStats(practice3ActualWithGap);
      setPractice3TimePeriod(practice3?.timePeriod || {});
    }
    setPractice3Loading(false);

    setPracticeStatsLoading(false);
    setProgress(0);

    // Fetch weather data AFTER displaying all practice results (deferred)
    // Add delays between weather calls to further throttle API requests
    if (practice1?.sessionKey) {
      const weather1 = await getWeather(
        practice1.sessionKey,
        practice1.dateStart,
        practice1.dateEnd,
      );
      setPractice1Weather(weather1.hasError ? [] : weather1);
      setPractice1WeatherLoading(false);

      await delay(600);
    }

    if (practice2?.sessionKey) {
      const weather2 = await getWeather(
        practice2.sessionKey,
        practice2.dateStart,
        practice2.dateEnd,
      );
      setPractice2Weather(weather2.hasError ? [] : weather2);
      setPractice2WeatherLoading(false);

      await delay(600);
    }

    if (practice3?.sessionKey) {
      const weather3 = await getWeather(
        practice3.sessionKey,
        practice3.dateStart,
        practice3.dateEnd,
      );
      setPractice3Weather(weather3.hasError ? [] : weather3);
      setPractice3WeatherLoading(false);
    }
  };

  const renderPractice = (
    title,
    stats,
    actualStats,
    weather,
    timePeriod,
    weatherLoading,
    practiceLoading,
  ) => {
    if (practiceLoading || (stats.length === 0 && practiceStatsLoading)) {
      return (
        <>
          <Box sx={styles.divider} />

          <LinearProgressBar
            title={`${intl.formatMessage({
              id: 'practiceStats.loadingStats',
            })} - ${title}`}
            value={progress}
          />
        </>
      );
    }

    if (stats.length === 0) {
      return null;
    }

    return (
      <Box sx={styles.practiceContainer}>
        <Box sx={styles.practiceDataContainer}>
          <Typography component="h3" sx={styles.title}>
            {title}
          </Typography>

          {Object.keys(timePeriod).length > 0 && (
            <PracticeTimeSlot practiceTimePeriod={timePeriod} />
          )}

          <PracticeWeather
            practiceWeather={weather}
            isLoading={weatherLoading}
          />
        </Box>

        <Box
          sx={{
            ...styles.tableContainer,
            ...(isDesktop ? {} : styles.tableContainerMobile),
          }}
        >
          {isDesktop ? (
            <>
              <AggregatedPracticeTable
                title={intl.formatMessage({
                  id: 'practiceStats.aggregatedPositions',
                })}
                data={stats}
              />

              <ActualPracticeTable
                title={intl.formatMessage({
                  id: 'practiceStats.actualPositions',
                })}
                data={actualStats}
              />
            </>
          ) : (
            <>
              <AggregatedPracticeMobileTable
                title={intl.formatMessage({
                  id: 'practiceStats.aggregatedPos',
                })}
                data={stats}
              />

              <ActualPracticeMobileTable
                title={intl.formatMessage({ id: 'practiceStats.actualPos' })}
                data={actualStats}
              />
            </>
          )}
        </Box>

        <Box
          sx={{
            ...styles.chartContainer,
            ...(isDesktop ? {} : styles.chartContainerMobile),
          }}
        >
          <PracticeBarChart
            data={stats}
            title={intl.formatMessage({
              id: 'practiceStats.aggregatedGapToFirst',
            })}
          />

          <PracticeBarChart
            data={actualStats}
            title={intl.formatMessage({ id: 'practiceStats.actualGapToFirst' })}
          />
        </Box>
      </Box>
    );
  };

  const renderPractices = () => (
    <>
      {renderPractice(
        intl.formatMessage({ id: 'practiceStats.practice1' }),
        practice1Stats,
        practice1ActualStats,
        practice1Weather,
        practice1TimePeriod,
        practice1WeatherLoading,
        practice1Loading,
      )}

      {renderPractice(
        intl.formatMessage({ id: 'practiceStats.practice2' }),
        practice2Stats,
        practice2ActualStats,
        practice2Weather,
        practice2TimePeriod,
        practice2WeatherLoading,
        practice2Loading,
      )}

      {renderPractice(
        intl.formatMessage({ id: 'practiceStats.practice3' }),
        practice3Stats,
        practice3ActualStats,
        practice3Weather,
        practice3TimePeriod,
        practice3WeatherLoading,
        practice3Loading,
      )}
    </>
  );

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

          {isSessionInProgress ? (
            <>
              <Box sx={styles.liveSessionContainer}>
                <Chip
                  label={intl.formatMessage({
                    id: 'practiceStats.liveSessionChip',
                  })}
                  sx={styles.liveChip}
                />
                <Typography component="h3" sx={styles.titleLiveSession}>
                  {intl.formatMessage({ id: 'practiceStats.liveSessionTitle' })}
                </Typography>
              </Box>

              <Typography component="h3" sx={styles.subTitleError}>
                {intl.formatMessage({
                  id: 'practiceStats.liveSessionMessage',
                })}
              </Typography>
            </>
          ) : (
            <>
              <Typography component="h3" sx={styles.titleError}>
                {intl.formatMessage({ id: 'practiceStats.errorTitle' })}
              </Typography>

              <Typography component="h3" sx={styles.subTitleError}>
                "{error}"
              </Typography>

              <Box sx={styles.refreshContainerError}>
                <Typography sx={styles.refreshLabelError}>
                  {intl.formatMessage({ id: 'practiceStats.refreshLabel' })}
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
        />

        {shouldRenderInitMessage && (
          <>
            <Box sx={styles.divider} />

            <Box component="p" sx={styles.description}>
              {intl.formatMessage({ id: 'practiceStats.description' })}
            </Box>
          </>
        )}

        {renderPractices()}
      </Box>
    </Layout>
  );
};

export default PracticeStats;
