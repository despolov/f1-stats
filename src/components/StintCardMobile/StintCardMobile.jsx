import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Box, Typography } from '@mui/material';
import getStyles from './StintCardMobile.styles';
import TyresCircle from '../TyresCircle';
import Pin from '../Pin';
import { ColorModeContext } from '../ColorMode';

const StintCardMobile = (props) => {
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

      <Box sx={styles.innerContainer}>
        <Box sx={styles.tyreCircleContainer}>
          <TyresCircle compound={compound} size="170" />

          <Pin
            color={stintColor}
            colorRgba={stintColorRgba}
            number={currentStintLaps}
            translate={'136px, 20px'}
            rotate={'-38'}
            translateText={'75px, -18px'}
            rotateText={'38'}
            lineWidth={75}
          />

          <Pin
            color={stintColor}
            colorRgba={stintColorRgba}
            number={lap_start}
            translate={'149px, 57px'}
            rotate={'-18'}
            translateText={'54px, -17px'}
            rotateText={'17'}
            lineWidth={55}
          />

          <Pin
            color={stintColor}
            colorRgba={stintColorRgba}
            number={lap_end}
            translate={'145px, 94px'}
            rotate={'9'}
            translateText={'60px, -18px'}
            rotateText={'-10'}
            lineWidth={61}
          />

          <Pin
            color={stintColor}
            colorRgba={stintColorRgba}
            number={tyre_age_at_start}
            translate={'127px, 129px'}
            rotate={'30'}
            translateText={'61px, -18px'}
            rotateText={'-30'}
            lineWidth={62}
          />
        </Box>

        <Box sx={styles.textsContainer}>
          <Typography sx={styles.infoText}>
            {intl.formatMessage({ id: 'stintCard.totalLaps' })}
          </Typography>

          <Typography sx={styles.infoText}>
            {intl.formatMessage({ id: 'stintCard.lapStart' })}
          </Typography>

          <Typography sx={styles.infoText}>
            {intl.formatMessage({ id: 'stintCard.lapEnd' })}
          </Typography>

          <Typography sx={styles.infoTextNoM}>
            {intl.formatMessage({ id: 'stintCard.tyresAgeAtStart' })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StintCardMobile;
