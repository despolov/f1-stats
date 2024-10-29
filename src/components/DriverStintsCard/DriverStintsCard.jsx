import React, { useContext } from 'react';
import { useTheme, useMediaQuery, Box, Typography } from '@mui/material';
import getDriverColor from '../../utils/getDriverColor';
import getStyles from './DriverStintsCard.styles';
import { IconContext } from 'react-icons';
import { IoIosPerson } from 'react-icons/io';
import ReactCountryFlag from 'react-country-flag';
import getDriverCountryCode from '../../utils/getDriverCountryCode';
import { ColorModeContext } from '../ColorMode';

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
    full_name,
    country_code,
  } = driver;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const firstName = first_name || full_name.split(' ')[0];
  const lastName = last_name || full_name.split(' ')[1];
  const colorStripeColor = team_colour
    ? `#${team_colour}`
    : getDriverColor(name_acronym);

  return (
    <Box sx={isDesktop ? styles.container : styles.containerMobile}>
      <Box>
        <Box sx={styles.nameContainer}>
          <Box
            sx={{
              borderLeft: `5px solid ${colorStripeColor}`,
              ...styles.nameColorStripe,
            }}
          />

          <Typography component="span" sx={styles.firstName}>
            {firstName}
          </Typography>

          <Typography component="span" sx={styles.lastName}>
            {lastName}
          </Typography>
        </Box>

        <Box sx={styles.additionalInfoContainer}>
          <Typography
            sx={{
              color: colorStripeColor,
              ...styles.driverNumber,
            }}
          >
            {driver_number}
          </Typography>

          {country_code ? (
            <ReactCountryFlag
              countryCode={getDriverCountryCode(country_code)}
              svg
              title={country_code}
              style={styles.flag}
            />
          ) : (
            <Box sx={styles.flag} />
          )}
        </Box>

        <Typography sx={styles.teamName}>{team_name || 'n/a'}</Typography>
      </Box>

      <Box sx={styles.headshotContainer}>
        {headshot_url ? (
          <Box
            component="img"
            src={headshot_url}
            alt={name_acronym}
            loading="lazy"
            sx={styles.headshotImg}
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
