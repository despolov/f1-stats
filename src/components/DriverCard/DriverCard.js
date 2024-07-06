import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import getDriverColor from '../../utils/getDriverColor';
import getStyles from './DriverCard.styles';
import { IconContext } from 'react-icons';
import { IoIosPerson } from 'react-icons/io';

const styles = getStyles();

const DriverCard = (props) => {
  const { driver } = props;
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
  );
};

export default DriverCard;
