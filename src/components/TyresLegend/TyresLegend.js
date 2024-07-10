import React from 'react';
import { useTheme, useMediaQuery, Typography, Box } from '@mui/material';
import TyresCircle from '../TyresCircle';
import getStyles from './TyresLegend.styles';
import allCompoundsImg from '../../assets/icons/allCompounds.png';

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

  if (component === 'image') {
    return isDesktop ? (
      <Box sx={styles.containerImage}>
        <Typography sx={styles.title}>Available tyres</Typography>

        <img
          src={allCompoundsImg}
          alt="allTyres"
          width={600}
          height={180}
          style={styles.allTyresImg}
        />

        <Box sx={styles.labelsContainerImage}>
          <Typography>2 sets</Typography>

          <Typography sx={styles.mediumLabel}>
            {isSprintWeekend ? '4 sets' : '3 sets'}
          </Typography>

          <Typography sx={styles.softLabel}>
            {isSprintWeekend ? '6 sets' : '8 sets'}
          </Typography>

          <Typography sx={styles.intermediateLabel}>
            {isSprintWeekend ? '4 sets' : '3 sets'}
          </Typography>

          <Typography sx={styles.wetLabel}>2 sets</Typography>
        </Box>
      </Box>
    ) : (
      <Box sx={styles.containerImageMobile}>
        <Typography sx={styles.title}>Available tyres </Typography>

        <img
          src={allCompoundsImg}
          alt="allTyres"
          width={window.innerWidth - 16}
          height={100}
          style={styles.allTyresImg}
        />

        <Box sx={styles.labelsContainerImageMobile}>
          <Typography>2 sets</Typography>

          <Typography sx={styles.mediumLabel}>
            {isSprintWeekend ? '4 sets' : '3 sets'}
          </Typography>

          <Typography sx={styles.softLabel}>
            {isSprintWeekend ? '6 sets' : '8 sets'}
          </Typography>

          <Typography sx={styles.intermediateLabel}>
            {isSprintWeekend ? '4 sets' : '3 sets'}
          </Typography>

          <Typography sx={styles.wetLabel}>2 sets</Typography>
        </Box>
      </Box>
    );
  }

  return null;
};

export default TyresLegend;
