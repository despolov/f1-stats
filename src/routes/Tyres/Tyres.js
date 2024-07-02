import React, { useState, useEffect } from 'react';
import {
  styled,
  useTheme,
  useMediaQuery,
  Typography,
  LinearProgress,
  Box,
} from '@mui/material';
import moment from 'moment';
import { getAllGrandPrix } from '../../api';
import Layout from '../../components/Layout';
import getStyles from './Tyres.styles';
import getSessionTyreStats from '../../utils/getSessionTyreStats';
import RaceSelect from '../../components/RaceSelect';
import checkIsSprintWeekend from '../../utils/checkIsSprintWeekend';
import DriverTyresCard from '../../components/DriverTyresCard/DriverTyresCard';
import TyresLegend from '../../components/TyresLegend/TyresLegend';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const Title = styled('h3')(() => styles.title);

const Divider = styled('div')(() => styles.divider);

const Tyres = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [years, setYears] = useState([]);
  const [year, setYear] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [countrieLoading, setCountriesLoading] = useState(false);
  const [tyresStatsLoading, setTyresStatsLoading] = useState(false);
  const [error, setStateError] = useState('');
  const [tyresStats, setTyresStats] = useState({});
  const [isSprintWeekend, setIsSprintWeekend] = useState(false);
  const shouldRenderInitMessage =
    !tyresStatsLoading && Object.keys(tyresStats).length === 0;

  useEffect(() => {
    const startYear = 2023;
    const currentYear = moment().year();
    const availableYears = [];

    for (let index = startYear; index <= currentYear; index++) {
      availableYears.push(index);
    }

    setYears(availableYears);
  }, []);

  useEffect(() => {
    if (year) {
      getCountries(year);
      setCountriesLoading(true);
    }
  }, [year]);

  useEffect(() => {
    if (country) {
      setTyresStatsLoading(true);
      getTyresStats(year, country.split(' - ')[0]);

      const isSprint = checkIsSprintWeekend(year, country);

      setIsSprintWeekend(isSprint);
    }
  }, [country]);

  const resetData = () => {
    setStateError('');
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
  };

  const getCountries = async (selectedYear) => {
    const allGrandPrix = await getAllGrandPrix(selectedYear);

    if (allGrandPrix.hasError) {
      setError(allGrandPrix.message);
      return;
    }

    setCountries(
      allGrandPrix.map(
        (granPrix) => `${granPrix.country_name} - ${granPrix.meeting_name}`,
      ),
    );
    setCountriesLoading(false);
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

  const getTyresStats = async (selectedYear, selectedCountry) => {
    const practice1 = await getSessionTyreStats(
      'Practice 1',
      selectedYear,
      selectedCountry,
      setError,
    );
    const practice2 = await getSessionTyreStats(
      'Practice 2',
      selectedYear,
      selectedCountry,
      setError,
    );
    const practice3 = await getSessionTyreStats(
      'Practice 3',
      selectedYear,
      selectedCountry,
      setError,
    );
    const sprint = await getSessionTyreStats(
      'Sprint',
      selectedYear,
      selectedCountry,
      setError,
    );
    const quali = await getSessionTyreStats(
      'Qualifying',
      selectedYear,
      selectedCountry,
      setError,
    );
    // const sprintQuali = await getSessionTyreStats( endpoint doesnt work for now
    //   'Sprint',
    //   selectedYear,
    //   selectedCountry,
    //   setError,
    // );
    let sessionsUsedTyres = {};

    addSessionTyresStats(practice1, sessionsUsedTyres, 'practice1');
    addSessionTyresStats(practice2, sessionsUsedTyres, 'practice2');
    addSessionTyresStats(practice3, sessionsUsedTyres, 'practice3');
    addSessionTyresStats(sprint, sessionsUsedTyres, 'sprint');
    addSessionTyresStats(quali, sessionsUsedTyres, 'quali');
    setTyresStats(sessionsUsedTyres);
    setTyresStatsLoading(false);
  };

  const renderLoading = () => {
    if (!tyresStatsLoading) {
      return null;
    }

    return (
      <>
        <Title>Loading tyre stats...</Title>

        <LinearProgress color="secondary" sx={styles.progressLoader} />
      </>
    );
  };

  const renderTyresStats = () => {
    if (Object.keys(tyresStats).length === 0 || tyresStatsLoading) {
      return null;
    }

    return (
      <>
        <Typography sx={styles.subTitle}>
          {isSprintWeekend
            ? 'New and used tyres from practices, sprint and quali'
            : 'New and used tyres from practices and quali'}
        </Typography>

        <TyresLegend isSprintWeekend={isSprintWeekend} component="inline" />

        <Box sx={styles.statsContainer}>
          {Object.keys(tyresStats).map((driverAcronym) => (
            <DriverTyresCard
              stats={tyresStats[driverAcronym]}
              isSprintWeekend={isSprintWeekend}
            />
          ))}
        </Box>
      </>
    );
  };

  if (error) {
    return (
      <Layout>
        <ParentContainer sx={isDesktop ? {} : styles.parentContainerMobile}>
          <RaceSelect
            year={year}
            handleYearChange={handleYearChange}
            years={years}
            country={country}
            handleCountryChange={handleCountryChange}
            countries={countries}
            countrieLoading={countrieLoading}
          />

          <Divider />

          <Title>{error}</Title>
        </ParentContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <ParentContainer>
        <Typography sx={{ margin: '0 0 20px auto' }}>
          🚧 Work in progress 🚧
        </Typography>

        <RaceSelect
          year={year}
          handleYearChange={handleYearChange}
          years={years}
          country={country}
          handleCountryChange={handleCountryChange}
          countries={countries}
          countrieLoading={countrieLoading}
        />

        <Divider />

        {shouldRenderInitMessage && (
          <Box component="p">
            Select year and country in order to see tyre stats
          </Box>
        )}

        {renderLoading()}

        {renderTyresStats()}
      </ParentContainer>
    </Layout>
  );
};

export default Tyres;
