import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Box, Typography, Grid } from '@mui/material';
import getStyles from './StintCard.styles';
import TyresCircle from '../TyresCircle';
import Pin from '../Pin';
import { ColorModeContext } from '../ColorMode';

const StintCard = (props) => {
  const intl = useIntl();
  const {
    stint_number,
    stintColor,
    stintColorRgba,
    currentStintLaps,
    lap_start,
    compound,
    lap_end,
    tyre_age_at_start,
  } = props;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.stintNumber}>
        {intl.formatMessage(
          { id: 'stintCard.stint' },
          { number: stint_number },
        )}
      </Typography>

      <Grid
        container
        align="center"
        justifyContent="center"
        alignItems="center"
        gap="5px"
      >
        <Grid item xs={12} align="center" sx={styles.lapsCount}>
          <Typography>
            {intl.formatMessage({ id: 'stintCard.lapsCount' })}
          </Typography>
        </Grid>

        <Grid item xs={2.5} align="right" sx={styles.lapStart}>
          <Typography>
            {intl.formatMessage({ id: 'stintCard.lapStart' })}
          </Typography>
        </Grid>

        <Grid item xs={4.5} align="center" sx={styles.tyreCircleContainer}>
          <TyresCircle compound={compound} size="180" />

          {/* right arrow */}
          <Pin
            color={stintColor}
            colorRgba={stintColorRgba}
            number={lap_end}
            translate={'81px, 90px'}
            rotate={'0'}
            rotateText={'0'}
          />

          {/* left arrow */}
          <Pin
            color={stintColor}
            colorRgba={stintColorRgba}
            number={lap_start}
            translate={'-80px, 57px'}
            rotate={'-180'}
            rotateText={'180'}
          />

          {/* top arrow */}
          <Pin
            color={stintColor}
            colorRgba={stintColorRgba}
            number={currentStintLaps}
            translate={'17px, -7px'}
            rotate={'-90'}
            rotateText={'90'}
          />

          {/* bottom arrow */}
          <Pin
            color={stintColor}
            colorRgba={stintColorRgba}
            number={tyre_age_at_start}
            translate={'-15px, 154px'}
            rotate={'90'}
            rotateText={'-90'}
          />
        </Grid>

        <Grid item xs={2.5} align="left" sx={styles.lapEnd}>
          <Typography>
            {intl.formatMessage({ id: 'stintCard.lapEnd' })}
          </Typography>
        </Grid>

        <Grid item xs={12} sx={styles.tyreAgeContainer}>
          <Typography sx={styles.tyreAge}>
            {intl.formatMessage({ id: 'stintCard.tyresAgeAtStart' })}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StintCard;
