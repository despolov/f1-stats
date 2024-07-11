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
import { useSearchParams, useNavigate } from 'react-router-dom';
import getStyles from './Stints.styles';
import Layout from '../../components/Layout';
import getSessionStints from '../../utils/getSessionStints';
import TyresCircle from '../../components/TyresCircle';
import DriverCard from '../../components/DriverCard/DriverCard';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const Title = styled('h3')(() => styles.title);

const SubTitle = styled('h4')(() => styles.subTitle);

const Divider = styled('div')(() => styles.divider);

const SubDivider = styled('div')(() => styles.subDivider);

const Stints = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [year, setYear] = useState('');
  const [country, setCountry] = useState('');
  const [driverNumber, setDriverNumber] = useState([]);
  const [driver, setDriver] = useState();
  const [stintsLoading, setStintsLoading] = useState(false);
  const [error, setStateError] = useState('');
  const [stints, setStints] = useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { practice1, practice2, practice3, sprintQuali, sprint, quali } =
    stints;

  useEffect(() => {
    const paramYear = searchParams.get('year');
    const paramCountry = searchParams.get('country');
    const paramDriver = searchParams.get('driverNumber');

    if (paramYear && paramCountry && paramDriver) {
      setYear(paramYear);
      setCountry(paramCountry);
      setDriverNumber(paramDriver);
    } else {
      setError(
        'It seems that year, country and driver number were not provided correctly, please check the link!',
      );
    }
  }, []);

  useEffect(() => {
    if (year && country && driverNumber) {
      setStintsLoading(true);
      getStints();
    }
  }, [year, country, driverNumber]);

  const setError = (errorMessage) => {
    setStintsLoading(false);
    setYear('');
    setCountry('');
    setDriverNumber('');
    setStateError(errorMessage);
  };

  const getStints = async () => {
    const practice1 = await getSessionStints(
      'Practice 1',
      year,
      country,
      driverNumber,
      setError,
    );
    const practice2 = await getSessionStints(
      'Practice 2',
      year,
      country,
      driverNumber,
      setError,
    );
    const practice3 = await getSessionStints(
      'Practice 3',
      year,
      country,
      driverNumber,
      setError,
    );
    const sprint = await getSessionStints(
      'Sprint',
      year,
      country,
      driverNumber,
      setError,
    );
    const quali = await getSessionStints(
      'Qualifying',
      year,
      country,
      driverNumber,
      setError,
    );
    const sprintQuali = await getSessionStints(
      'Sprint Qualifying',
      year,
      country,
      driverNumber,
      setError,
    );
    let sessionsStints = {
      practice1,
      practice2,
      practice3,
      sprint,
      quali,
      sprintQuali,
    };

    setStints(sessionsStints);
    setStintsLoading(false);
  };

  const renderLoading = () => {
    if (!stintsLoading) {
      return null;
    }

    return (
      <>
        <Title>Loading stints...</Title>

        <LinearProgress color="secondary" sx={styles.progressLoader} />
      </>
    );
  };

  const renderDriverInfo = () => {
    if (!driver) {
      return null;
    }

    return <DriverCard driver={driver} />;
  };

  const renderStintGraph = (sessionStint, totalLaps) => {
    const { compound, lap_start, lap_end, stint_number, tyre_age_at_start } =
      sessionStint;
    let stintColor;
    const currentStintLaps = lap_end - lap_start + 1;
    const currentStintPercentage = (100 * currentStintLaps) / totalLaps;

    if (compound === 'SOFT') {
      stintColor = '#F90021';
    } else if (compound === 'MEDIUM') {
      stintColor = '#F3C302';
    } else if (compound === 'HARD') {
      stintColor = '#2F2D2B';
    } else if (compound === 'INTERMEDIATE') {
      stintColor = '#019D2E';
    } else if (compound === 'WET') {
      stintColor = '#2F62A1';
    }

    return (
      <Tooltip
        key={`${driverNumber}-stint-${stint_number}`}
        title={
          <Box>
            <Typography>Stint №: {stint_number}</Typography>

            <Typography>Compound: {compound}</Typography>

            <Typography>Lap start: {lap_start}</Typography>

            <Typography>Lap end: {lap_end}</Typography>

            <Typography>Tyre age at start: {tyre_age_at_start}</Typography>
          </Box>
        }
        placement="top"
        arrow
        enterTouchDelay={0}
        leaveTouchDelay={5000}
      >
        <Box
          sx={{
            display: 'flex',
            width: `${currentStintPercentage}%`,
            height: '26px',
          }}
        >
          <Box
            sx={{
              zIndex: 1,
              height: '26px',
              width: '26px',
              backgroundColor: 'white',
              borderRadius: '50%',
            }}
          >
            <TyresCircle compound={compound} size="26" />
          </Box>

          <Box
            sx={{
              width: 'calc(100% - 24px)',
              margin: '0 0 0 -13px',
              backgroundColor: stintColor,
            }}
          />

          <Box
            sx={{
              height: '26px',
              width: '26px',
              textAlign: 'center',
              color: 'white',
              backgroundColor: stintColor,
              borderRadius: '50%',
              margin: '0 0 0 -13px',
            }}
          >
            {currentStintLaps}
          </Box>
        </Box>
      </Tooltip>
    );
  };

  const renderTyrePin = (
    color,
    colorRgba,
    number,
    translate,
    rotate,
    rotateText,
  ) => {
    return (
      <Box
        sx={{
          position: 'absolute',
          transform: `translate(${translate}) rotate(${rotate}deg)`,
        }}
      >
        <Box sx={{ border: `1px solid ${color}` }} />

        <Box
          sx={{
            width: '32px',
            height: '32px',
            border: `2px solid ${color}`,
            borderRadius: '50%',
            paddingTop: '2px',
            transform: `translate(32px, -17px) rotate(${rotateText}deg)`,
            fontWeight: 700,
            backgroundColor: colorRgba,
          }}
        >
          <Typography sx={{ color: '#000000' }}>{number}</Typography>
        </Box>
      </Box>
    );
  };

  const renderStintAsATyre = (
    stint_number,
    stintColor,
    stintColorRgba,
    currentStintLaps,
    lap_start,
    compound,
    lap_end,
    tyre_age_at_start,
  ) => {
    return (
      <Box
        sx={{
          textAlign: 'center',
          alignContent: 'center',
          // backgroundColor: '#f7f4f1',
          // border: '1px solid #f7f4f1',
          borderTop: '2px solid black',
          borderRight: '2px solid black',
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '0',
          borderTopLeftRadius: '0',
          position: 'relative',
          width: '450px',
          height: '300px',
        }}
      >
        <Box sx={{ alignContent: 'center' }}>
          <Typography
            sx={{
              position: 'absolute',
              margin: 0,
              fontWeight: 700,
              fontSize: '16px',
              padding: '0 7px 0 0',
              backgroundColor: 'white',
              top: '-12px',
              left: 0,
            }}
          >
            Stint {stint_number}
          </Typography>

          <Grid
            container
            align="center"
            justifyContent="center"
            alignItems="center"
            gap="5px"
          >
            <Grid item xs={12} align="center" sx={{ height: '55px' }}>
              <Typography>Laps count</Typography>
            </Grid>

            <Grid item xs={2.5} align="right">
              <Typography>Lap start</Typography>
            </Grid>

            <Grid
              item
              xs={4.5}
              align="center"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                minWidth: '250px',
              }}
            >
              <TyresCircle compound={compound} size="180" />

              {/* right arrow */}
              {renderTyrePin(
                stintColor,
                stintColorRgba,
                lap_end,
                '81px, 90px',
                '0',
                '0',
              )}

              {/* left arrow */}
              {renderTyrePin(
                stintColor,
                stintColorRgba,
                lap_start,
                '-80px, 57px',
                '-180',
                '180',
              )}

              {/* top arrow */}
              {renderTyrePin(
                stintColor,
                stintColorRgba,
                currentStintLaps,
                '17px, -7px',
                '-90',
                '90',
              )}

              {/* bottom arrow */}
              {renderTyrePin(
                stintColor,
                stintColorRgba,
                tyre_age_at_start,
                '-15px, 154px',
                '90',
                '-90',
              )}
            </Grid>

            <Grid item xs={2.5} align="left">
              <Typography>Lap end</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                height: '55px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ alignSelf: 'flex-end' }}>
                Tyres age at start
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  const renderStintsForSession = (session, title) => {
    const totalLaps = session[session.length - 1].lap_end;

    return (
      <>
        <Box sx={{ display: 'flex', gap: '6px' }}>
          <Title>{title} -</Title>

          <SubTitle sx={{ lineHeight: '27.5px' }}>
            Total laps: {totalLaps}
          </SubTitle>
        </Box>

        <Box sx={styles.stintsContainer}>
          <SubTitle>All stints</SubTitle>

          <Box sx={styles.stintsGraphContainer}>
            {session.map((sessionStint) => {
              return renderStintGraph(sessionStint, totalLaps);
            })}
          </Box>

          <SubDivider />
        </Box>

        <SubTitle sx={{ margin: '0 0 20px 0' }}>Stints breakdown</SubTitle>

        <Box
          sx={{
            display: 'flex',
            gap: '45px',
            flexWrap: 'wrap',
            // justifyContent: 'space-around',
            // margin: '10px 0 0 0',
          }}
        >
          {session.map((sessionStint) => {
            const {
              compound,
              lap_start,
              lap_end,
              stint_number,
              tyre_age_at_start,
            } = sessionStint;
            const currentStintLaps = lap_end - lap_start + 1;
            let stintColor;
            let stintColorRgba;

            if (compound === 'SOFT') {
              stintColor = '#F90021';
              stintColorRgba = 'rgb(249, 0, 33, 0.1)';
            } else if (compound === 'MEDIUM') {
              stintColor = '#F3C302';
              stintColorRgba = 'rgb(243, 195, 2, 0.1)';
            } else if (compound === 'HARD') {
              stintColor = '#2F2D2B';
              stintColorRgba = 'rgb(47, 45, 43, 0.1)';
            } else if (compound === 'INTERMEDIATE') {
              stintColor = '#019D2E';
              stintColorRgba = 'rgb(1, 157, 46, 0.1)';
            } else if (compound === 'WET') {
              stintColor = '#2F62A1';
              stintColorRgba = 'rgb(47, 98, 161, 0.1)';
            }

            return (
              <React.Fragment
                key={`${driverNumber}-stintTyreParent-${stint_number}`}
              >
                {renderStintAsATyre(
                  stint_number,
                  stintColor,
                  stintColorRgba,
                  currentStintLaps,
                  lap_start,
                  compound,
                  lap_end,
                  tyre_age_at_start,
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </>
    );
  };

  if (error) {
    return (
      <Layout>
        <ParentContainer
          sx={
            isDesktop
              ? styles.parentContainerError
              : styles.parentContainerMobileError
          }
        >
          <Title sx={styles.errorMessage}>{error}</Title>

          <Button
            onClick={() => {
              navigate('/tyres');
            }}
            variant="contained"
            color="primary"
            sx={styles.goBackButton}
          >
            GO BACK
          </Button>
        </ParentContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <ParentContainer sx={isDesktop ? {} : styles.parentContainerMobile}>
        {renderLoading()}

        {renderDriverInfo()}

        {practice1 && (
          <>
            {renderStintsForSession(practice1, 'Practice 1')}

            <Divider />
          </>
        )}

        {practice2 && (
          <>
            {renderStintsForSession(practice2, 'Practice 2')}

            <Divider />
          </>
        )}

        {practice3 && (
          <>
            {renderStintsForSession(practice3, 'Practice 3')}

            <Divider />
          </>
        )}

        {sprintQuali && (
          <>
            {renderStintsForSession(sprintQuali, 'Sprint Qualifying')}

            <Divider />
          </>
        )}

        {sprint && (
          <>
            {renderStintsForSession(sprint, 'Sprint')}

            <Divider />
          </>
        )}

        {quali && renderStintsForSession(quali, 'Qualifying')}
      </ParentContainer>
    </Layout>
  );
};

export default Stints;
