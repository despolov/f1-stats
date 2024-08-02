import React, { useContext } from 'react';
import {
  styled,
  useTheme,
  useMediaQuery,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import getStyles from './SessionStints.styles';
import StintGraph from '../StintGraph';
import StintCard from '../StintCard';
import StintCardMobile from '../StintCardMobile';
import { ColorModeContext } from '../ColorMode';

const StyledAccordionDetails = styled(AccordionDetails)(
  ({ styles }) => styles.accordionDetails,
);

const StyledAccordionSummary = styled(AccordionSummary)(
  ({ styles }) => styles.accordionSummary,
);

const StyledAccordion = styled(Accordion)(({ styles }) => styles.accordion);

const SessionStints = (props) => {
  const { session, title, driverNumber } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  if (session.length === 0) {
    return (
      <>
        <Box sx={styles.titleContainer}>
          <Typography
            component="h3"
            sx={{ ...styles.title, ...styles.titleNoLaps }}
          >
            {title} -
          </Typography>

          <Typography
            component="h4"
            sx={{ ...styles.subTitle, ...styles.subTitleContainerNoLaps }}
          >
            Total laps: 0
          </Typography>
        </Box>
      </>
    );
  }

  const totalLaps = session[session.length - 1].lap_end;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleContainer}>
        <Typography component="h3" sx={styles.title}>
          {title} -
        </Typography>

        <Typography
          component="h4"
          sx={{ ...styles.subTitle, ...styles.subTitleContainer }}
        >
          Total laps: {totalLaps}
        </Typography>
      </Box>

      <Box sx={styles.stintsContainer}>
        <Typography component="h4" sx={styles.subTitle}>
          All stints: {session.length}
        </Typography>

        <Box
          sx={
            isDesktop
              ? styles.stintsGraphContainer
              : styles.stintsGraphContainerMobile
          }
        >
          {session.map((sessionStint) => (
            <StintGraph
              key={`${driverNumber}-stint-${sessionStint.stint_number}`}
              sessionStint={sessionStint}
              totalLaps={totalLaps}
            />
          ))}
        </Box>
      </Box>

      <StyledAccordion styles={styles} disableGutters square>
        <StyledAccordionSummary
          styles={styles}
          expandIcon={<ArrowForwardIosSharpIcon sx={styles.expandIcon} />}
        >
          <Typography
            component="h4"
            sx={{ ...styles.subTitle, ...styles.stintsBreakDownTitle }}
          >
            Stints breakdown
          </Typography>
        </StyledAccordionSummary>

        <StyledAccordionDetails styles={styles}>
          <Box sx={styles.stintCardsContainer}>
            {session.map((sessionStint) => {
              const {
                compound,
                lap_start,
                lap_end,
                stint_number,
                tyre_age_at_start,
              } = sessionStint;
              const currentStintLaps = lap_end - lap_start + 1;
              let stintColor;
              let stintColorRgba;

              if (compound === 'SOFT') {
                stintColor = styles.softCompoundColor;
                stintColorRgba = styles.softCompoundColorRgba;
              } else if (compound === 'MEDIUM') {
                stintColor = styles.mediumCompoundColor;
                stintColorRgba = styles.mediumCompoundColorRgba;
              } else if (compound === 'HARD') {
                stintColor = styles.hardCompoundColor;
                stintColorRgba = styles.hardCompoundColorRgba;
              } else if (compound === 'INTERMEDIATE') {
                stintColor = styles.intermediateCompoundColor;
                stintColorRgba = styles.intermediateCompoundColorRgba;
              } else if (compound === 'WET') {
                stintColor = styles.wetCompoundColor;
                stintColorRgba = styles.wetCompoundColorRgba;
              }

              return isDesktop ? (
                <StintCard
                  key={`${driverNumber}-stintTyreParent-${stint_number}`}
                  stint_number={stint_number}
                  stintColor={stintColor}
                  stintColorRgba={stintColorRgba}
                  currentStintLaps={currentStintLaps}
                  lap_start={lap_start}
                  compound={compound}
                  lap_end={lap_end}
                  tyre_age_at_start={tyre_age_at_start}
                />
              ) : (
                <StintCardMobile
                  key={`${driverNumber}-stintTyreParent-${stint_number}`}
                  stint_number={stint_number}
                  stintColor={stintColor}
                  stintColorRgba={stintColorRgba}
                  currentStintLaps={currentStintLaps}
                  lap_start={lap_start}
                  compound={compound}
                  lap_end={lap_end}
                  tyre_age_at_start={tyre_age_at_start}
                />
              );
            })}
          </Box>
        </StyledAccordionDetails>
      </StyledAccordion>
    </Box>
  );
};

export default SessionStints;
