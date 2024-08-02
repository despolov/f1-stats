import React from 'react';
import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import getStyles from './StintGraph.styles';
import TyresCircle from '../TyresCircle';

const styles = getStyles();

const StintGraph = (props) => {
  const { sessionStint, totalLaps } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { compound, lap_start, lap_end, stint_number, tyre_age_at_start } =
    sessionStint;
  let stintColor;
  const currentStintLaps = lap_end - lap_start + 1;
  let currentStintPercentage = (100 * currentStintLaps) / totalLaps;

  if (!isDesktop) {
    currentStintPercentage = currentStintPercentage + 10;

    if (currentStintPercentage > 100) {
      currentStintPercentage = 100;
    }
  }

  if (compound === 'SOFT') {
    stintColor = styles.softCompoundColor;
  } else if (compound === 'MEDIUM') {
    stintColor = styles.mediumCompoundColor;
  } else if (compound === 'HARD') {
    stintColor = styles.hardCompoundColor;
  } else if (compound === 'INTERMEDIATE') {
    stintColor = styles.intermediateCompoundColor;
  } else if (compound === 'WET') {
    stintColor = styles.wetCompoundColor;
  }

  return (
    <Tooltip
      title={
        <Box>
          <Typography sx={styles.tooltipStintText}>
            Stint №: {stint_number}
          </Typography>

          <Typography>
            Compound: {tyre_age_at_start === 0 ? 'new' : 'used'} {compound}
          </Typography>

          <Typography>
            Lap - start:{' '}
            <Typography component="span" sx={styles.tooltipBoldText}>
              {lap_start}
            </Typography>{' '}
            end:{' '}
            <Typography component="span" sx={styles.tooltipBoldText}>
              {lap_end}
            </Typography>
          </Typography>

          <Typography>Total laps: {currentStintLaps}</Typography>

          <Typography>Tyre age at start: {tyre_age_at_start}</Typography>
        </Box>
      }
      placement="top"
      arrow
      enterTouchDelay={0}
      leaveTouchDelay={5000}
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
              { marginBottom: '8px' },
          },
        },
      }}
    >
      <Box
        sx={
          isDesktop
            ? { ...styles.container, width: `${currentStintPercentage}%` }
            : { ...styles.containerMobile, width: `${currentStintPercentage}%` }
        }
      >
        <Box sx={styles.tyreCircle}>
          <TyresCircle compound={compound} size="26" />
        </Box>

        <Box
          sx={{
            ...styles.line,
            ...(tyre_age_at_start === 0 ? {} : styles.lineUsedTyres),
            backgroundColor: stintColor,
          }}
        />

        <Box sx={{ ...styles.lapsCircle, backgroundColor: stintColor }}>
          {currentStintLaps}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default StintGraph;
