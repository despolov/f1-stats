import React from 'react';
import { useMediaQuery, useTheme, styled } from '@mui/material';
import Select from '../Select';
import getStyles from './RaceSelect.styles';

const styles = getStyles();

const SelectFieldsContainer = styled('div')(() => styles.selectFieldsContainer);

const RaceSelect = (props) => {
  const {
    year,
    handleYearChange,
    years,
    country,
    handleCountryChange,
    countries,
    countriesLoading,
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
        onChange={handleCountryChange}
        label="Select country"
        data={countries.map((c) => ({
          value: c,
          displayValue: c.split(' | ')[0],
        }))}
        disabled={countries.length === 0}
        loading={countriesLoading}
      />
    </SelectFieldsContainer>
  );
};

export default RaceSelect;
