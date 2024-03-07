import React from 'react';
import {
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import getStyles from './Select.styles';

const styles = getStyles();

const SimpleSelect = (props) => {
  const { disabled, value, onChange, label, data } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <FormControl fullWidth>
      <Select
        disabled={disabled}
        displayEmpty
        value={value}
        onChange={onChange}
        input={<OutlinedInput />}
        renderValue={(selected) => selected || <em>{label}</em>}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={isDesktop ? styles.select : styles.selectMobile}
        fullWidth={false}
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
