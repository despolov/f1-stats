import React, { useEffect, useState, useContext } from 'react';
import ReactGA from 'react-ga4';
import Layout from '../../components/Layout';
import getStyles from './PracticeStats.styles';
import {
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { getAllGrandPrix } from '../../api';
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
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../../components/ColorMode';

const PracticeStats = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: '/practiceStats',
    title: 'Practice Stats',
  });

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
  const [practice1TimePeriod, setPractice1TimePeriod] = useState({});
  const [practice2TimePeriod, setPractice2TimePeriod] = useState({});
  const [practice3TimePeriod, setPractice3TimePeriod] = useState({});
  const [practiceStatsLoading, setPracticeStatsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setStateError] = useState('');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const shouldRenderPracticeResults =
    !practiceStatsLoading &&
    (practice1Stats.length > 0 ||
      practice2Stats.length > 0 ||
      practice3Stats.length > 0);
  const shouldRenderInitMessage =
    !practiceStatsLoading &&
    practice1Stats.length === 0 &&
    practice2Stats.length === 0 &&
    practice3Stats.length === 0;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  useEffect(() => {
    const startYear = 2023;
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
        navigate('/practiceStats');
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
      setPracticeStatsLoading(true);
      getAllPracticesStats(year, country.split(' - ')[0]);
    }
  }, [country]);

  const setError = (errorMessage) => {
    setPracticeStatsLoading(false);
    setCountriesLoading(false);
    setYear('');
    setCountry('');
    setCountries([]);
    setStateError(errorMessage);
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
    setPractice1TimePeriod({});
    setPractice2TimePeriod({});
    setPractice3TimePeriod({});
    setStateError('');
    setProgress(0);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    resetData();
  };

  const getCountries = async (selectedYear) => {
    const allGrandPrix = await getAllGrandPrix(selectedYear);

    if (allGrandPrix.hasError) {
      setError(allGrandPrix.message);
      return;
    }

    const mappedCountries = allGrandPrix.map(
      (granPrix) => `${granPrix.country_name} - ${granPrix.meeting_name}`,
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

  const getAllPracticesStats = async (selectedYear, selectedCountry) => {
    const practice1 = await getSinglePracticeStats(
      'Practice 1',
      selectedYear,
      selectedCountry,
      setError,
      setProgress,
    );
    setProgress(35);

    const practice2 = await getSinglePracticeStats(
      'Practice 2',
      selectedYear,
      selectedCountry,
      setError,
      setProgress,
    );
    setProgress(70);

    const practice3 = await getSinglePracticeStats(
      'Practice 3',
      selectedYear,
      selectedCountry,
      setError,
      setProgress,
    );
    setProgress(100);

    const practice1WithGap = addGapBetweenDrivers(
      orderBy(practice1.bestSectorsPerDriver, ['aggregatedLap']),
      'aggregatedLap',
    );
    const practice2WithGap = addGapBetweenDrivers(
      orderBy(practice2.bestSectorsPerDriver, ['aggregatedLap']),
      'aggregatedLap',
    );
    const practice3WithGap = addGapBetweenDrivers(
      orderBy(practice3.bestSectorsPerDriver, ['aggregatedLap']),
      'aggregatedLap',
    );
    const practice1ActualWithGap = addGapBetweenDrivers(
      orderBy(practice1.bestLapPerDriver, ['lapDuration']),
      'lapDuration',
    );
    const practice2ActualWithGap = addGapBetweenDrivers(
      orderBy(practice2.bestLapPerDriver, ['lapDuration']),
      'lapDuration',
    );
    const practice3ActualWithGap = addGapBetweenDrivers(
      orderBy(practice3.bestLapPerDriver, ['lapDuration']),
      'lapDuration',
    );

    setPractice1Stats(practice1WithGap);
    setPractice2Stats(practice2WithGap);
    setPractice3Stats(practice3WithGap);
    setPractice1ActualStats(practice1ActualWithGap);
    setPractice2ActualStats(practice2ActualWithGap);
    setPractice3ActualStats(practice3ActualWithGap);
    setPractice1Weather(practice1.weather);
    setPractice2Weather(practice2.weather);
    setPractice3Weather(practice3.weather);
    setPractice1TimePeriod(practice1.timePeriod);
    setPractice2TimePeriod(practice2.timePeriod);
    setPractice3TimePeriod(practice3.timePeriod);
    setPracticeStatsLoading(false);
    setProgress(0);
  };

  const renderPractice = (title, stats, actualStats, weather, timePeriod) => {
    if (stats.length === 0) {
      return null;
    }

    return (
      <Box sx={styles.practiceContainer}>
        <Typography component="h3" sx={styles.title}>
          {title}
        </Typography>

        {Object.keys(timePeriod).length > 0 && (
          <PracticeTimeSlot practiceTimePeriod={timePeriod} />
        )}

        {weather.length > 0 && <PracticeWeather practiceWeather={weather} />}

        <Box
          sx={{
            ...styles.tableContainer,
            ...(isDesktop ? {} : styles.tableContainerMobile),
          }}
        >
          {isDesktop ? (
            <>
              <AggregatedPracticeTable
                title="Aggregated positions"
                data={stats}
              />

              <ActualPracticeTable
                title="Actual positions"
                data={actualStats}
              />
            </>
          ) : (
            <>
              <AggregatedPracticeMobileTable
                title="Aggregated pos"
                data={stats}
              />

              <ActualPracticeMobileTable
                title="Actual pos"
                data={actualStats}
              />
            </>
          )}
        </Box>
      </Box>
    );
  };

  const renderPractices = () => {
    if (!shouldRenderPracticeResults) {
      return null;
    }

    return (
      <>
        {renderPractice(
          'Practice 1',
          practice1Stats,
          practice1ActualStats,
          practice1Weather,
          practice1TimePeriod,
        )}

        {renderPractice(
          'Practice 2',
          practice2Stats,
          practice2ActualStats,
          practice2Weather,
          practice2TimePeriod,
        )}

        {renderPractice(
          'Practice 3',
          practice3Stats,
          practice3ActualStats,
          practice3Weather,
          practice3TimePeriod,
        )}
      </>
    );
  };

  const renderLoading = () => {
    if (!practiceStatsLoading) {
      return null;
    }

    return (
      <LinearProgressBar title="Loading practice stats..." value={progress} />
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
        />

        <Box sx={styles.divider} />

        {shouldRenderInitMessage && (
          <Box component="p" sx={styles.description}>
            Select year and country in order to see practice actual and
            aggregated results
          </Box>
        )}

        {renderLoading()}

        {renderPractices()}
      </Box>
    </Layout>
  );
};

export default PracticeStats;
