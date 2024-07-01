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
import Select from '../../components/Select';
import getStyles from './Tyres.styles';
import getSessionTyreStats from '../../utils/getSessionTyreStats';
import TyresCircle from '../../components/TyresCircle/TyresCircle';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const SelectFieldsContainer = styled('div')(() => styles.selectFieldsContainer);

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
  const [practiceTyresStats, setPracticeTyresStats] = useState({});
  const shouldRenderInitMessage =
    !tyresStatsLoading && practiceTyresStats.length === 0; // &&
  // qualiTyresStats.length === 0 &&
  // sprintQualiTyresStats.length === 0 &&
  // sprintTyresStats.length === 0;

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

  const addPracticeTyresStats = (practice, practiceUsedTyres) => {
    if (practice && Object.keys(practice).length > 0) {
      Object.keys(practice).forEach((practiceDriver) => {
        const SOFT =
          (Object.hasOwn(practiceUsedTyres, practiceDriver)
            ? practiceUsedTyres[practiceDriver].SOFT
            : 0) + practice[practiceDriver].SOFT;
        const MEDIUM =
          (Object.hasOwn(practiceUsedTyres, practiceDriver)
            ? practiceUsedTyres[practiceDriver].MEDIUM
            : 0) + practice[practiceDriver].MEDIUM;
        const HARD =
          (Object.hasOwn(practiceUsedTyres, practiceDriver)
            ? practiceUsedTyres[practiceDriver].HARD
            : 0) + practice[practiceDriver].HARD;

        practiceUsedTyres[practiceDriver] = {
          SOFT,
          MEDIUM,
          HARD,
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
    // TODO: get for qualifying
    // TODO: get for spirnt quali if it has
    // TODO: get for sprint if it has

    let practiceUsedTyres = {};

    if (Object.keys(practice1).length > 0) {
      practiceUsedTyres = { ...practice1 };

      addPracticeTyresStats(practice2, practiceUsedTyres);
      addPracticeTyresStats(practice3, practiceUsedTyres);
    }

    setPracticeTyresStats(practiceUsedTyres);
    setTyresStatsLoading(false);

    // const usedTyresInPractices =

    // each driver gets 13 sets of dry weather tyres 8 softs, 3 mediums, and 2 hards
    // 12 sets when its a sprint weekend
    // this will get all of the stints for each driver
    // return data of a single stint
    // {
    // compound: "MEDIUM"
    // driver_number: 31
    // lap_end: 4
    // lap_start: 1
    // meeting_key: 1230
    // session_key: 9473
    // stint_number: 1
    // tyre_age_at_start: 0
    // }
    // this needs to be separated by driver
    // after that separate it by compound and save the lap start and end so we can check later if the same tyres are used again or check for the stintNumber
    // const meeting = await getMeeting(selectedCountry, selectedYear);
    // const stints = await getStints(meeting[0].meeting_key);
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

  const renderSelect = () => (
    <SelectFieldsContainer
      sx={isDesktop ? {} : styles.selectFieldsContainerMobile}
    >
      <Select
        value={year}
        onChange={handleYearChange}
        label="Select year"
        data={years}
      />

      <Select
        value={country}
        onChange={handleCountryChange}
        label="Select country"
        data={countries}
        disabled={countries.length === 0}
        loading={countrieLoading}
      />
    </SelectFieldsContainer>
  );

  const renderPracticeTyres = () => {
    if (!practiceTyresStats) {
      return null;
    }

    const practiceTyres = [];

    Object.keys(practiceTyresStats).forEach((driver) => {
      return (
        <Box>
          <Typography>{driver}</Typography>
        </Box>
      );
    });

    return (
      <>
        <Typography sx={{ margin: '0 0 20px 0' }}>
          Practice tyres count
        </Typography>

        {/* each driver gets 13 sets of dry weather tyres 8 softs, 3 mediums, and 2 hards */}

        {Object.keys(practiceTyresStats).map((driver) => {
          return (
            <Box sx={{ margin: '0 0 40px 0' }}>
              <Typography sx={{ margin: '0 0 10px 0' }}>{driver}</Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  margin: '0 0 10px 0',
                }}
              >
                <TyresCircle compound="SOFT" />

                <Typography>used: {practiceTyresStats[driver].SOFT}</Typography>

                <Typography>
                  new: {8 - practiceTyresStats[driver].SOFT}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  margin: '0 0 10px 0',
                }}
              >
                <TyresCircle compound="MEDIUM" />

                <Typography>
                  used: {practiceTyresStats[driver].MEDIUM}
                </Typography>

                <Typography>
                  new: {3 - practiceTyresStats[driver].MEDIUM}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  margin: '0 0 10px 0',
                }}
              >
                <TyresCircle compound="HARD" />

                <Typography>used: {practiceTyresStats[driver].HARD}</Typography>

                <Typography>
                  new: {2 - practiceTyresStats[driver].HARD}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </>
    );
  };

  if (error) {
    return (
      <Layout>
        <ParentContainer sx={isDesktop ? {} : styles.parentContainerMobile}>
          {renderSelect()}

          <Divider />

          <Title>{error}</Title>
        </ParentContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <ParentContainer>
        <Typography sx={{ margin: '0 0 10px 0' }}>
          🚧 Work in progress 🚧{' '}
        </Typography>

        {renderSelect()}

        <Divider />

        {shouldRenderInitMessage && (
          <Box component="p">
            Select year and country in order to see tyre stats
          </Box>
        )}

        {renderLoading()}

        {renderPracticeTyres()}
      </ParentContainer>
    </Layout>
  );
};

export default Tyres;
