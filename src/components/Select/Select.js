import React from 'react';
import {
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import getStyles from './Select.styles';

const styles = getStyles();

const SimpleSelect = (props) => {
  const { disabled, value, onChange, label, data, loading } = props;
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
        renderValue={(selected) => {
          if (loading) {
            return <CircularProgress size={17} sx={styles.loader} />;
          }

          return selected || <em>{label}</em>;
        }}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={styles.select}
        fullWidth={false}
        MenuProps={{
          PaperProps: {
            sx: isDesktop ? {} : styles.selectDropdownMobile,
          },
        }}
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
