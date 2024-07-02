import React from 'react';
import { useTheme, useMediaQuery, Typography, Box } from '@mui/material';
import TyresCircle from '../TyresCircle';
import getStyles from './TyresLegend.styles';

const styles = getStyles();

const TyresLegend = (props) => {
  const { isSprintWeekend, component } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  if (component === 'legend') {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.titleContainer}>
          <Typography sx={styles.title}>Available tyres</Typography>
        </Box>

        <Box sx={styles.tyresRow}>
          <TyresCircle compound="SOFT" size="45" />

          <Typography sx={styles.softLabel}>
            {isSprintWeekend ? '6 sets' : '8 sets'}
          </Typography>
        </Box>

        <Box sx={styles.tyresRow}>
          <TyresCircle compound="MEDIUM" size="45" />

          <Typography sx={styles.mediumLabel}>
            {isSprintWeekend ? '4 sets' : '3 sets'}
          </Typography>

          <TyresCircle compound="HARD" size="45" />

          <Typography>2 sets</Typography>
        </Box>

        <Box sx={styles.tyresRow}>
          <TyresCircle compound="INTERMEDIATE" size="45" />

          <Typography sx={styles.intermediateLabel}>
            {isSprintWeekend ? '4 sets' : '3 sets'}
          </Typography>

          <TyresCircle compound="WET" size="45" />

          <Typography sx={styles.wetLabel}>2 sets</Typography>
        </Box>
      </Box>
    );
  }

  if (component === 'inline') {
    return isDesktop ? (
      <Box sx={styles.tyresRowInline}>
        <Typography sx={styles.title}>Available tyres: </Typography>

        <TyresCircle compound="SOFT" size="45" />

        <Typography sx={styles.softLabel}>
          {isSprintWeekend ? '6 sets' : '8 sets'}
        </Typography>

        <TyresCircle compound="MEDIUM" size="45" />

        <Typography sx={styles.mediumLabel}>
          {isSprintWeekend ? '4 sets' : '3 sets'}
        </Typography>

        <TyresCircle compound="HARD" size="45" />

        <Typography>2 sets</Typography>

        <TyresCircle compound="INTERMEDIATE" size="45" />

        <Typography sx={styles.intermediateLabel}>
          {isSprintWeekend ? '4 sets' : '3 sets'}
        </Typography>

        <TyresCircle compound="WET" size="45" />

        <Typography sx={styles.wetLabel}>2 sets</Typography>
      </Box>
    ) : (
      <>
        <Typography sx={styles.title}>Available tyres: </Typography>

        <Box sx={styles.tyresRowInline}>
          <TyresCircle compound="SOFT" size="45" />

          <Typography sx={styles.softLabel}>
            {isSprintWeekend ? '6 sets' : '8 sets'}
          </Typography>

          <TyresCircle compound="MEDIUM" size="45" />

          <Typography sx={styles.mediumLabel}>
            {isSprintWeekend ? '4 sets' : '3 sets'}
          </Typography>

          <TyresCircle compound="HARD" size="45" />

          <Typography>2 sets</Typography>

          <TyresCircle compound="INTERMEDIATE" size="45" />

          <Typography sx={styles.intermediateLabel}>
            {isSprintWeekend ? '4 sets' : '3 sets'}
          </Typography>

          <TyresCircle compound="WET" size="45" />

          <Typography sx={styles.wetLabel}>2 sets</Typography>
        </Box>
      </>
    );
  }

  return null;
};

export default TyresLegend;
