import React from 'react';
import { useMediaQuery, useTheme, Box, Button } from '@mui/material';
import getStyles from './DriverTyresCard.styles';
import TyresCard from '../TyresCard/TyresCard';
import DriverCard from '../DriverCard/DriverCard';

const styles = getStyles();

const DriverTyresCard = (props) => {
  const { stats, isSprintWeekend, onAllStintsClick } = props;
  const {
    driver,
    usedTyres,
    practice1UsedTyres,
    practice2UsedTyres,
    practice3UsedTyres,
    qualiUsedTyres,
    sprintUsedTyres,
  } = stats;
  const { SOFT, MEDIUM, HARD, INTERMEDIATE, WET } = usedTyres;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={isDesktop ? styles.container : styles.containerMobile}>
      <DriverCard driver={driver} />

      <TyresCard
        compound="SOFT"
        tyresCount={SOFT}
        practice1UsedTyres={practice1UsedTyres?.SOFT}
        practice2UsedTyres={practice2UsedTyres?.SOFT}
        practice3UsedTyres={practice3UsedTyres?.SOFT}
        sprintUsedTyres={sprintUsedTyres?.SOFT}
        qualiUsedTyres={qualiUsedTyres?.SOFT}
        totalTyresCount={isSprintWeekend ? 6 : 8}
      />

      <TyresCard
        compound="MEDIUM"
        tyresCount={MEDIUM}
        practice1UsedTyres={practice1UsedTyres?.MEDIUM}
        practice2UsedTyres={practice2UsedTyres?.MEDIUM}
        practice3UsedTyres={practice3UsedTyres?.MEDIUM}
        sprintUsedTyres={sprintUsedTyres?.MEDIUM}
        qualiUsedTyres={qualiUsedTyres?.MEDIUM}
        totalTyresCount={isSprintWeekend ? 4 : 3}
      />

      <TyresCard
        compound="HARD"
        tyresCount={HARD}
        practice1UsedTyres={practice1UsedTyres?.HARD}
        practice2UsedTyres={practice2UsedTyres?.HARD}
        practice3UsedTyres={practice3UsedTyres?.HARD}
        sprintUsedTyres={sprintUsedTyres?.HARD}
        qualiUsedTyres={qualiUsedTyres?.HARD}
        totalTyresCount={2}
      />

      {usedTyres.INTERMEDIATE > 0 && (
        <TyresCard
          compound="INTERMEDIATE"
          tyresCount={INTERMEDIATE}
          practice1UsedTyres={practice1UsedTyres?.INTERMEDIATE}
          practice2UsedTyres={practice2UsedTyres?.INTERMEDIATE}
          practice3UsedTyres={practice3UsedTyres?.INTERMEDIATE}
          sprintUsedTyres={sprintUsedTyres?.INTERMEDIATE}
          qualiUsedTyres={qualiUsedTyres?.INTERMEDIATE}
          totalTyresCount={4}
        />
      )}

      {usedTyres.WET > 0 && (
        <TyresCard
          compound="WET"
          tyresCount={WET}
          practice1UsedTyres={practice1UsedTyres?.WET}
          practice2UsedTyres={practice2UsedTyres?.WET}
          practice3UsedTyres={practice3UsedTyres?.WET}
          sprintUsedTyres={sprintUsedTyres?.WET}
          qualiUsedTyres={qualiUsedTyres?.WET}
          totalTyresCount={4}
        />
      )}

      <Button
        onClick={onAllStintsClick}
        variant="contained"
        color="primary"
        fullWidth
      >
        All stints
      </Button>
    </Box>
  );
};

export default DriverTyresCard;
