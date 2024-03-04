import React from 'react';
import { OutlinedInput, MenuItem, FormControl, Select } from '@mui/material';
import getStyles from './Select.styles';

const styles = getStyles();

const SimpleSelect = (props) => {
  const { disabled, value, onChange, label, data } = props;

  return (
    <FormControl sx={styles.select}>
      <Select
        disabled={disabled}
        displayEmpty
        value={value}
        onChange={onChange}
        input={<OutlinedInput />}
        renderValue={(selected) => selected || <em>{label}</em>}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>{label}</em>
        </MenuItem>

        {data.map((dataValue) => (
          <MenuItem key={dataValue} value={dataValue}>
            {dataValue}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
