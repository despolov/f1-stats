import React from 'react';
import {
  useMediaQuery,
  useTheme,
  styled,
  Typography,
  Box,
} from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import Select from '../Select';
import getStyles from './RaceSelect.styles';
import getRaceCountryCode from '../../utils/getRaceCountryCode';
import getTeamLogoSrc from '../../utils/getTeamLogoSrc';
import { AiOutlineTeam } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const styles = getStyles();

const SelectFieldsContainer = styled('div')(() => styles.selectFieldsContainer);

const getCountryFlag = (country) => (
  <ReactCountryFlag
    countryCode={getRaceCountryCode(country)}
    svg
    title={country}
    style={styles.countryFlag}
  />
);

const getTeamIcon = (team, isPrefix) => {
  const teamLogSrc = getTeamLogoSrc(team);

  return teamLogSrc ? (
    <Box
      component="img"
      src={teamLogSrc}
      alt=""
      sx={{ ...styles.teamIcon, ...(isPrefix ? styles.teamIconPrefix : {}) }}
    />
  ) : (
    <IconContext.Provider
      value={{
        style: {
          ...styles.teamIcon,
          ...(isPrefix ? styles.teamIconPrefix : {}),
        },
      }}
    >
      <AiOutlineTeam />
    </IconContext.Provider>
  );
};

const RaceSelect = (props) => {
  const {
    year,
    handleYearChange,
    years,
    country,
    handleCountryChange,
    countries,
    countriesLoading,
    isDriversVisible,
    driver,
    handleDriverChange,
    drivers,
    driversLoading,
  } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
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
        prefix={
          country ? getCountryFlag(country.split(' | ')[0].split(' - ')[0]) : ''
        }
        onChange={handleCountryChange}
        label="Select country"
        data={countries.map((c) => {
          const displayCountry = c.split(' | ')[0];
          const flagCountry = displayCountry.split(' - ')[0];

          return {
            value: c,
            displayValue: (
              <Typography>
                {getCountryFlag(flagCountry)}

                {displayCountry}
              </Typography>
            ),
          };
        })}
        disabled={countries.length === 0}
        loading={countriesLoading}
      />

      {isDriversVisible && (
        <Select
          value={driver}
          prefix={
            driver
              ? getTeamIcon(driver.split(' | ')[0].split(' - ')[0], true)
              : ''
          }
          onChange={handleDriverChange}
          label="Select driver"
          data={drivers.map((d) => {
            const displayDriver = d.split(' | ')[0];
            const driverTeam = displayDriver.split(' - ')[0];

            return {
              value: d,
              displayValue: (
                <Typography>
                  {getTeamIcon(driverTeam)}

                  {displayDriver}
                </Typography>
              ),
            };
          })}
          disabled={drivers.length === 0}
          loading={driversLoading}
        />
      )}
    </SelectFieldsContainer>
  );
};

export default RaceSelect;
