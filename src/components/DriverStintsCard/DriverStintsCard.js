import React from 'react';
import { Box, Typography } from '@mui/material';
import getDriverColor from '../../utils/getDriverColor';
import getStyles from './DriverStintsCard.styles';
import { IconContext } from 'react-icons';
import { IoIosPerson } from 'react-icons/io';
import ReactCountryFlag from 'react-country-flag';
import getDriverCountryCode from '../../utils/getDriverCountryCode';

const styles = getStyles();

const DriverStintsCard = (props) => {
  const { driver } = props;
  const {
    name_acronym,
    driver_number,
    headshot_url,
    team_name,
    team_colour,
    first_name,
    last_name,
    country_code,
  } = driver;

  return (
    <Box sx={styles.container}>
      <Box>
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

        <Box sx={styles.additionalInfoContainer}>
          <Typography
            sx={{
              color: `#${team_colour}`,
              ...styles.driverNumber,
            }}
          >
            {driver_number}
          </Typography>

          <ReactCountryFlag
            countryCode={getDriverCountryCode(country_code)}
            svg
            title={country_code}
            style={styles.flag}
          />
        </Box>

        <Typography sx={styles.teamName}>{team_name}</Typography>
      </Box>

      <Box sx={styles.headshotContainer}>
        {headshot_url ? (
          <img
            src={headshot_url}
            alt={name_acronym}
            loading="lazy"
            width={100}
            height={100}
          />
        ) : (
          <IconContext.Provider value={{ style: styles.iconPerson }}>
            <IoIosPerson />
          </IconContext.Provider>
        )}
      </Box>
    </Box>
  );
};

export default DriverStintsCard;
