import React, { useState, useEffect } from 'react';
import {
  styled,
  useTheme,
  useMediaQuery,
  Typography,
  LinearProgress,
  Box,
  Button,
} from '@mui/material';
import Layout from '../../components/Layout';
import getStyles from './Stints.styles';
import getSessionStints from '../../utils/getSessionStints';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TyresCircle from '../../components/TyresCircle';
import DriverCard from '../../components/DriverCard/DriverCard';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const Title = styled('h3')(() => styles.title);

const Divider = styled('div')(() => styles.divider);

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
  const { practice1, practice2, practice3, sprint, quali } = stints;

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
    // const sprintQuali = await getSessionStints( endpoint doesnt work for now
    //   'Sprint Qualifying',
    //   year,
    //   country,
    //   driverNumber,
    //   setError,
    // );
    let sessionsStints = { practice1, practice2, practice3, sprint, quali };

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

  const renderStintsForSession = (session, title) => {
    return (
      <>
        <Title>{title}</Title>

        <Typography>
          total laps: {session[session.length - 1].lap_end}
        </Typography>

        <Box
          sx={{ display: 'flex', width: '100%', margin: '40px 0', gap: '2px' }}
        >
          {session.map((sessionStint) => {
            const {
              compound,
              // driver_number,
              lap_start,
              lap_end,
              stint_number,
              tyre_age_at_start,
            } = sessionStint;
            let stintGradientMainColor;
            let stintGradientSecondaryColor;
            const totalLaps = session[session.length - 1].lap_end;
            const currentStintLaps = lap_end - lap_start + 1;
            const currentStintPercentage = (100 * currentStintLaps) / totalLaps;

            if (compound === 'SOFT') {
              stintGradientMainColor = 'rgba(249, 0, 33, 1)';
              stintGradientSecondaryColor = 'rgba(255,255,255,1)';
            } else if (compound === 'MEDIUM') {
              stintGradientMainColor = 'rgba(243,195,2,1)';
              stintGradientSecondaryColor = 'rgba(255,255,255,1)';
            } else if (compound === 'HARD') {
              stintGradientMainColor = 'rgba(0,0,0,1)';
              stintGradientSecondaryColor = 'rgba(255,255,255,1)';
            } else if (compound === 'INTERMEDIATE') {
              stintGradientMainColor = 'rgba(1,157,46,1)';
              stintGradientSecondaryColor = 'rgba(0,0,0,1)';
            } else if (compound === 'WET') {
              stintGradientMainColor = 'rgba(47,98,161,1)';
              stintGradientSecondaryColor = 'rgba(0,0,0,1)';
            }

            return (
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
                    backgroundColor: stintGradientMainColor,
                  }}
                />

                {/* <Box
                  sx={{
                    height: '26px',
                    width: '24px',
                    textAlign: 'center',
                  }}
                >
                  {currentStintLaps}
                </Box> */}

                <Box
                  sx={{
                    height: '26px',
                    width: '26px',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: stintGradientMainColor,
                    borderRadius: '50%',
                    margin: '0 0 0 -13px',
                  }}
                >
                  {currentStintLaps}
                </Box>
              </Box>
            );
          })}
        </Box>

        {session.map((sessionStint) => {
          const {
            compound,
            // driver_number,
            lap_start,
            lap_end,
            stint_number,
            tyre_age_at_start,
          } = sessionStint;
          let stintGraphColor;
          let stintGradientMainColor;
          let stintGradientSecondaryColor;
          const totalLaps = session[session.length - 1].lap_end;
          const currentStintLaps = lap_end - lap_start + 1;
          const currentStintPercentage = (100 * currentStintLaps) / totalLaps;

          if (compound === 'SOFT') {
            stintGraphColor = '#F90021';
            // roso corsa = #CC0000
            stintGradientMainColor = 'rgba(249, 0, 33, 1)';
            stintGradientSecondaryColor = 'rgba(255,255,255,1)';
          } else if (compound === 'MEDIUM') {
            stintGraphColor = '#F3C302';
            stintGradientMainColor = 'rgba(243,195,2,1)';
            stintGradientSecondaryColor = 'rgba(255,255,255,1)';
          } else if (compound === 'HARD') {
            stintGraphColor = '#000000';
            stintGradientMainColor = 'rgba(0,0,0,1)';
            stintGradientSecondaryColor = 'rgba(255,255,255,1)';
          } else if (compound === 'INTERMEDIATE') {
            stintGraphColor = '#019D2E';
            stintGradientMainColor = 'rgba(1,157,46,1)';
            stintGradientSecondaryColor = 'rgba(0,0,0,1)';
          } else if (compound === 'WET') {
            stintGraphColor = '#2F62A1';
            stintGradientMainColor = 'rgba(47,98,161,1)';
            stintGradientSecondaryColor = 'rgba(0,0,0,1)';
          }

          return (
            <Box
              sx={{ width: '100%', margin: '20px 0' }}
              key={`${driverNumber}-${stint_number}`}
            >
              <Typography>compound={compound}</Typography>

              <Box sx={{ display: 'flex' }}>
                <Typography>lap_start={lap_start}</Typography>

                <Typography>lap_end={lap_end}</Typography>

                <Typography>laps count={currentStintLaps}</Typography>
              </Box>

              <Typography>stint_number={stint_number}</Typography>

              <Typography>tyre_age_at_start={tyre_age_at_start}</Typography>

              <Box
                sx={{
                  display: 'flex',
                  width: `${currentStintPercentage}%`,
                  height: '26px',
                }}
              >
                <Box
                  sx={{
                    height: '26px',
                    width: '26px',
                    backgroundColor: stintGraphColor,
                    borderRadius: '50%',
                    color: 'white',
                    textAlign: 'center',
                    lineHeight: '25px',
                  }}
                >
                  {compound.substring(0, 1)}
                </Box>

                <Box
                  sx={{
                    border: `5px solid ${stintGraphColor}`,
                    height: 0,
                    width: 'calc(100% - 52px)',
                    margin: '8px 0 8px 0',
                  }}
                />

                <Box
                  sx={{
                    height: '26px',
                    width: '26px',
                    // backgroundColor: stintGraphColor,
                    // borderRadius: '50%',
                    textAlign: 'center',
                    lineHeight: '25px',
                  }}
                >
                  {currentStintLaps}
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  width: `${currentStintPercentage}%`,
                  height: '52px',
                  lineHeight: '51px',
                }}
              >
                <TyresCircle compound={compound} size="52" />

                <Box
                  sx={{
                    // border: `10px solid ${stintGraphColor}`,
                    // height: 0,
                    width: 'calc(100% - 52px - 24px)',
                    // margin: '16px 0 16px 0',
                    background: `linear-gradient(90deg, ${stintGradientSecondaryColor} 0%, ${stintGradientMainColor} 25%, ${stintGradientMainColor} 50%, ${stintGradientMainColor} 75%, ${stintGradientSecondaryColor} 100%)`,
                  }}
                />

                <Box
                  sx={{
                    height: '52px',
                    width: '24px',
                    // backgroundColor: stintGraphColor,
                    // borderRadius: '50%',
                    textAlign: 'center',
                    lineHeight: '51px',
                  }}
                >
                  {currentStintLaps}
                </Box>
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
