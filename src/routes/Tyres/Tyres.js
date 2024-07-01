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
  Tooltip,
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
import { FaCircleInfo } from 'react-icons/fa6';
import checkIsSprintWeekend from '../../utils/checkIsSprintWeekend';

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

  // TODO: to be extracted as a component
  // TODO: extract the styles
  const renderDriverTyresCard = (stats) => {
    const {
      driver,
      usedTyres,
      practice1UsedTyres,
      practice2UsedTyres,
      practice3UsedTyres,
      qualiUsedTyres,
      sprintUsedTyres,
    } = stats;
    const { SOFT, MEDIUM, HARD, INTERMEDIATE, WET } = usedTyres;
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

          <Typography>New: {(isSprintWeekend ? 6 : 8) - SOFT}</Typography>

          <Tooltip
            title={
              <Box>
                {practice1UsedTyres ? (
                  <Typography>
                    Practice 1 - {practice1UsedTyres.SOFT} set/s
                  </Typography>
                ) : null}

                {practice2UsedTyres ? (
                  <Typography>
                    Practice 2 - {practice2UsedTyres.SOFT} set/s
                  </Typography>
                ) : null}

                {practice3UsedTyres ? (
                  <Typography>
                    Practice 3 - {practice3UsedTyres.SOFT} set/s
                  </Typography>
                ) : null}

                {sprintUsedTyres ? (
                  <Typography>Sprint - {sprintUsedTyres.SOFT} set/s</Typography>
                ) : null}

                {qualiUsedTyres ? (
                  <Typography>
                    Qualification - {qualiUsedTyres.SOFT} set/s
                  </Typography>
                ) : null}
              </Box>
            }
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={5000}
          >
            <Box sx={{ marginBottom: '-5px' }}>
              <IconContext.Provider
                value={{ style: { width: '20px', height: '20px' } }}
              >
                <FaCircleInfo />
              </IconContext.Provider>
            </Box>
          </Tooltip>
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

          <Typography>New: {(isSprintWeekend ? 4 : 3) - MEDIUM}</Typography>

          <Tooltip
            title={
              <Box>
                {practice1UsedTyres ? (
                  <Typography>
                    Practice 1 - {practice1UsedTyres.MEDIUM} set/s
                  </Typography>
                ) : null}

                {practice2UsedTyres ? (
                  <Typography>
                    Practice 2 - {practice2UsedTyres.MEDIUM} set/s
                  </Typography>
                ) : null}

                {practice3UsedTyres ? (
                  <Typography>
                    Practice 3 - {practice3UsedTyres.MEDIUM} set/s
                  </Typography>
                ) : null}

                {sprintUsedTyres ? (
                  <Typography>
                    Sprint - {sprintUsedTyres.MEDIUM} set/s
                  </Typography>
                ) : null}

                {qualiUsedTyres ? (
                  <Typography>
                    Qualification - {qualiUsedTyres.MEDIUM} set/s
                  </Typography>
                ) : null}
              </Box>
            }
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={5000}
          >
            <Box sx={{ marginBottom: '-5px' }}>
              <IconContext.Provider
                value={{ style: { width: '20px', height: '20px' } }}
              >
                <FaCircleInfo />
              </IconContext.Provider>
            </Box>
          </Tooltip>
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

          <Typography>New: {2 - HARD}</Typography>

          <Tooltip
            title={
              <Box>
                {practice1UsedTyres ? (
                  <Typography>
                    Practice 1 - {practice1UsedTyres.HARD} set/s
                  </Typography>
                ) : null}

                {practice2UsedTyres ? (
                  <Typography>
                    Practice 2 - {practice2UsedTyres.HARD} set/s
                  </Typography>
                ) : null}

                {practice3UsedTyres ? (
                  <Typography>
                    Practice 3 - {practice3UsedTyres.HARD} set/s
                  </Typography>
                ) : null}

                {sprintUsedTyres ? (
                  <Typography>Sprint - {sprintUsedTyres.HARD} set/s</Typography>
                ) : null}

                {qualiUsedTyres ? (
                  <Typography>
                    Qualification - {qualiUsedTyres.HARD} set/s
                  </Typography>
                ) : null}
              </Box>
            }
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={5000}
          >
            <Box sx={{ marginBottom: '-5px' }}>
              <IconContext.Provider
                value={{ style: { width: '20px', height: '20px' } }}
              >
                <FaCircleInfo />
              </IconContext.Provider>
            </Box>
          </Tooltip>
        </Box>

        {usedTyres.INTERMEDIATE > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 0 20px 0',
            }}
          >
            <TyresCircle compound="INTERMEDIATE" />

            <Typography>Used: {INTERMEDIATE}</Typography>

            <Typography>New: {4 - INTERMEDIATE}</Typography>

            <Tooltip
              title={
                <Box>
                  {practice1UsedTyres ? (
                    <Typography>
                      Practice 1 - {practice1UsedTyres.INTERMEDIATE} set/s
                    </Typography>
                  ) : null}

                  {practice2UsedTyres ? (
                    <Typography>
                      Practice 2 - {practice2UsedTyres.INTERMEDIATE} set/s
                    </Typography>
                  ) : null}

                  {practice3UsedTyres ? (
                    <Typography>
                      Practice 3 - {practice3UsedTyres.INTERMEDIATE} set/s
                    </Typography>
                  ) : null}

                  {sprintUsedTyres ? (
                    <Typography>
                      Sprint - {sprintUsedTyres.INTERMEDIATE} set/s
                    </Typography>
                  ) : null}

                  {qualiUsedTyres ? (
                    <Typography>
                      Qualification - {qualiUsedTyres.INTERMEDIATE} set/s
                    </Typography>
                  ) : null}
                </Box>
              }
              arrow
              enterTouchDelay={0}
              leaveTouchDelay={5000}
            >
              <Box sx={{ marginBottom: '-5px' }}>
                <IconContext.Provider
                  value={{ style: { width: '20px', height: '20px' } }}
                >
                  <FaCircleInfo />
                </IconContext.Provider>
              </Box>
            </Tooltip>
          </Box>
        )}

        {usedTyres.WET > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 0 20px 0',
            }}
          >
            <TyresCircle compound="WET" />

            <Typography>Used: {WET}</Typography>

            <Typography>New: {4 - WET}</Typography>

            <Tooltip
              title={
                <Box>
                  {practice1UsedTyres ? (
                    <Typography>
                      Practice 1 - {practice1UsedTyres.WET} set/s
                    </Typography>
                  ) : null}

                  {practice2UsedTyres ? (
                    <Typography>
                      Practice 2 - {practice2UsedTyres.WET} set/s
                    </Typography>
                  ) : null}

                  {practice3UsedTyres ? (
                    <Typography>
                      Practice 3 - {practice3UsedTyres.WET} set/s
                    </Typography>
                  ) : null}

                  {sprintUsedTyres ? (
                    <Typography>
                      Sprint - {sprintUsedTyres.WET} set/s
                    </Typography>
                  ) : null}

                  {qualiUsedTyres ? (
                    <Typography>
                      Qualification - {qualiUsedTyres.WET} set/s
                    </Typography>
                  ) : null}
                </Box>
              }
              arrow
              enterTouchDelay={0}
              leaveTouchDelay={5000}
            >
              <Box sx={{ marginBottom: '-5px' }}>
                <IconContext.Provider
                  value={{ style: { width: '20px', height: '20px' } }}
                >
                  <FaCircleInfo />
                </IconContext.Provider>
              </Box>
            </Tooltip>
          </Box>
        )}

        <Button variant="contained" color="primary" fullWidth>
          {/* TODO - create a route and show the driver stints there - practices, quali, sprint and sprint quali */}
          All stints
        </Button>
      </Box>
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

        <Box sx={styles.statsContainer}>
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
