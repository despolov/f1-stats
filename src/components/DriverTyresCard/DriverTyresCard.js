import React from 'react';
import {
  useMediaQuery,
  useTheme,
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import getDriverColor from '../../utils/getDriverColor';
import getStyles from './DriverTyresCard.styles';
import { IconContext } from 'react-icons';
import { IoIosPerson } from 'react-icons/io';
import TyresCard from '../TyresCard/TyresCard';

const styles = getStyles();

const DriverTyresCard = (props) => {
  const { stats, isSprintWeekend } = props;
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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      key={name_acronym}
      sx={isDesktop ? styles.container : styles.containerMobile}
    >
      <Grid
        container
        align="center"
        justifyContent="center"
        alignItems="center"
        gap="5px"
      >
        <Grid item xs align="left">
          <Box sx={styles.nameContainer}>
            <Box
              sx={{
                borderLeft: `5px solid #${
                  team_colour || getDriverColor(name_acronym)
                }`,
                ...styles.nameColorStripe,
              }}
            />

            <Typography component="span" sx={styles.firstName}>
              {first_name}
            </Typography>

            <Typography component="span" sx={styles.lastName}>
              {last_name}
            </Typography>
          </Box>

          <Typography sx={styles.teamName}>{team_name}</Typography>
        </Grid>

        <Grid item xs align="center">
          <Typography
            sx={{
              color: `#${team_colour}`,
              ...styles.driverNumber,
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
            <IconContext.Provider value={{ style: styles.iconPerson }}>
              <IoIosPerson />
            </IconContext.Provider>
          )}
        </Grid>
      </Grid>

      <TyresCard
        compound="SOFT"
        tyresCount={SOFT}
        practice1UsedTyres={practice1UsedTyres?.SOFT}
        practice2UsedTyres={practice2UsedTyres?.SOFT}
        practice3UsedTyres={practice3UsedTyres?.SOFT}
        sprintUsedTyres={sprintUsedTyres?.SOFT}
        qualiUsedTyres={qualiUsedTyres?.SOFT}
        totalTyresCount={isSprintWeekend ? 6 : 8}
      />

      <TyresCard
        compound="MEDIUM"
        tyresCount={MEDIUM}
        practice1UsedTyres={practice1UsedTyres?.MEDIUM}
        practice2UsedTyres={practice2UsedTyres?.MEDIUM}
        practice3UsedTyres={practice3UsedTyres?.MEDIUM}
        sprintUsedTyres={sprintUsedTyres?.MEDIUM}
        qualiUsedTyres={qualiUsedTyres?.MEDIUM}
        totalTyresCount={isSprintWeekend ? 4 : 3}
      />

      <TyresCard
        compound="HARD"
        tyresCount={HARD}
        practice1UsedTyres={practice1UsedTyres?.HARD}
        practice2UsedTyres={practice2UsedTyres?.HARD}
        practice3UsedTyres={practice3UsedTyres?.HARD}
        sprintUsedTyres={sprintUsedTyres?.HARD}
        qualiUsedTyres={qualiUsedTyres?.HARD}
        totalTyresCount={2}
      />

      {usedTyres.INTERMEDIATE > 0 && (
        <TyresCard
          compound="INTERMEDIATE"
          tyresCount={INTERMEDIATE}
          practice1UsedTyres={practice1UsedTyres?.INTERMEDIATE}
          practice2UsedTyres={practice2UsedTyres?.INTERMEDIATE}
          practice3UsedTyres={practice3UsedTyres?.INTERMEDIATE}
          sprintUsedTyres={sprintUsedTyres?.INTERMEDIATE}
          qualiUsedTyres={qualiUsedTyres?.INTERMEDIATE}
          totalTyresCount={4}
        />
      )}

      {usedTyres.WET > 0 && (
        <TyresCard
          compound="WET"
          tyresCount={WET}
          practice1UsedTyres={practice1UsedTyres?.WET}
          practice2UsedTyres={practice2UsedTyres?.WET}
          practice3UsedTyres={practice3UsedTyres?.WET}
          sprintUsedTyres={sprintUsedTyres?.WET}
          qualiUsedTyres={qualiUsedTyres?.WET}
          totalTyresCount={4}
        />
      )}

      <Button variant="contained" color="primary" fullWidth>
        All stints
      </Button>
    </Box>
  );
};

export default DriverTyresCard;
