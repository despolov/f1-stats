import React, { useState, useEffect } from 'react';
import {
  styled,
  useTheme,
  useMediaQuery,
  Typography,
  LinearProgress,
  Box,
  Button,
  Grid,
} from '@mui/material';
import moment from 'moment';
import { getAllGrandPrix } from '../../api';
import Layout from '../../components/Layout';
import getStyles from './Tyres.styles';
import getSessionTyreStats from '../../utils/getSessionTyreStats';
import getDriverColor from '../../utils/getDriverColor';
import TyresCircle from '../../components/TyresCircle/TyresCircle';
import RaceSelect from '../../components/RaceSelect';
import { IconContext } from 'react-icons';
import { IoIosPerson } from 'react-icons/io';

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
  const shouldRenderInitMessage = !tyresStatsLoading && tyresStats.length === 0;

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
            ? practiceUsedTyres[practiceDriver].usedTyres.SOFT
            : 0) + practice[practiceDriver].usedTyres.SOFT;
        const MEDIUM =
          (Object.hasOwn(practiceUsedTyres, practiceDriver)
            ? practiceUsedTyres[practiceDriver].usedTyres.MEDIUM
            : 0) + practice[practiceDriver].usedTyres.MEDIUM;
        const HARD =
          (Object.hasOwn(practiceUsedTyres, practiceDriver)
            ? practiceUsedTyres[practiceDriver].usedTyres.HARD
            : 0) + practice[practiceDriver].usedTyres.HARD;

        practiceUsedTyres[practiceDriver] = {
          driver: practice[practiceDriver].driver,
          usedTyres: {
            SOFT,
            MEDIUM,
            HARD,
          },
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

    // TODO: here we should add the other sessions aswell, but keep in track also the count from each session so we can display it later in a tooltip
    setTyresStats(practiceUsedTyres);
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

  // TODO: to be extracted as a component
  // TODO: extract the styles
  const renderDriverTyresCard = (stats) => {
    const { driver, usedTyres } = stats;
    const { SOFT, MEDIUM, HARD } = usedTyres;
    const {
      name_acronym,
      driver_number,
      headshot_url,
      team_name,
      team_colour,
      first_name,
      last_name,
    } = driver;

    return (
      <Box
        key={name_acronym}
        sx={{
          border: '1px solid grey',
          borderRadius: '8px',
          padding: '20px',
          minWidth: isDesktop ? '400px' : '100%',
        }}
      >
        <Grid
          container
          align="center"
          justifyContent="center"
          alignItems="center"
          gap="5px"
        >
          <Grid item xs align="left">
            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <Box
                sx={{
                  borderLeft: `5px solid #${
                    team_colour || getDriverColor(name_acronym)
                  }`,
                  marginRight: '5px',
                }}
              />

              <Typography component="span" sx={{ marginRight: '5px' }}>
                {first_name}
              </Typography>

              <Typography component="span" sx={{ fontWeight: 600 }}>
                {last_name}
              </Typography>
            </Box>

            <Typography sx={{ color: '#67676D', fontSize: '12px' }}>
              {team_name}
            </Typography>
          </Grid>

          <Grid item xs align="center">
            <Typography
              sx={{
                color: `#${team_colour}`,
                fontWeight: 600,
                fontSize: '28px',
              }}
            >
              {driver_number}
            </Typography>
          </Grid>

          <Grid item xs align="right">
            {headshot_url ? (
              <img
                src={`${headshot_url}?w=164&h=164&fit=crop&auto=format`}
                alt={name_acronym}
                loading="lazy"
              />
            ) : (
              <IconContext.Provider
                value={{ style: { width: '93px', height: '93px' } }}
              >
                <IoIosPerson />
              </IconContext.Provider>
            )}
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '0 0 10px 0',
          }}
        >
          <TyresCircle compound="SOFT" />

          <Typography>Used: {SOFT}</Typography>

          {/* TODO: this should be based if its a sprintweekend */}
          <Typography>New: {8 - SOFT}</Typography>
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

          <Typography>Used: {MEDIUM}</Typography>

          {/* TODO: this should be based if its a sprintweekend */}
          <Typography>New: {3 - MEDIUM}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '0 0 20px 0',
          }}
        >
          <TyresCircle compound="HARD" />

          <Typography>Used: {HARD}</Typography>

          {/* TODO: this should be based if its a sprintweekend */}
          <Typography>New: {2 - HARD}</Typography>
        </Box>

        <Button variant="contained" color="primary" fullWidth>
          {/* TODO - create a route and show the driver stints there - practices, quali, sprint and sprint quali */}
          All stints
        </Button>
      </Box>
    );
  };

  // TODO: extract styles
  const renderTyresStats = () => {
    if (!tyresStats) {
      return null;
    }

    return (
      <>
        <Typography sx={{ margin: '0 0 20px 0' }}>
          {/* TODO: this message should depend if the weekend is a sprint one */}
          Tyres count from practices, sprint quali, sprint and quali
        </Typography>

        <Typography sx={{ margin: '0 0 20px 0' }}>
          {/* TODO: remove this once other sessions are implemented */}
          currently: Pratices only
        </Typography>

        <Box sx={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {Object.keys(tyresStats).map((driverAcronym) =>
            renderDriverTyresCard(tyresStats[driverAcronym]),
          )}
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
          {/* TODO: to be removed once route is implemented */}
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
