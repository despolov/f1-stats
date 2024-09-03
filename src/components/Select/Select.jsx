import React, { useContext } from 'react';
import {
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import getStyles from './Select.styles';
import { ColorModeContext } from '../ColorMode';

const SimpleSelect = (props) => {
  const { disabled, value, onChange, label, data, loading } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

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

          return selected ? (
            selected.toString().split(' | ')[0]
          ) : (
            <Typography component="em" sx={styles.placeholder}>
              {label}
            </Typography>
          );
        }}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={styles.select}
        fullWidth={false}
        MenuProps={{
          PaperProps: {
            sx: isDesktop ? styles.selectDropdown : styles.selectDropdownMobile,
          },
        }}
      >
        <MenuItem disabled value="">
          <em>{label}</em>
        </MenuItem>

        {data.map((dataValue) => {
          let value = dataValue;
          let displayValue = dataValue;

          if (Object.getPrototypeOf(dataValue) === Object.prototype) {
            value = dataValue.value;
            displayValue = dataValue.displayValue;
          }

          return (
            <MenuItem key={value} value={value}>
              {displayValue}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
