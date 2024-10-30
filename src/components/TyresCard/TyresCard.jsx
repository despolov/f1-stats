import React, { useContext } from 'react';
import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import getStyles from './TyresCard.styles';
import { IconContext } from 'react-icons';
import { FaCircleInfo } from 'react-icons/fa6';
import TyresCircle from '../TyresCircle';
import { ColorModeContext } from '../ColorMode';

const TyresCard = (props) => {
  const {
    compound,
    tyresCount,
    practice1UsedTyres,
    practice2UsedTyres,
    practice3UsedTyres,
    sprintUsedTyres,
    qualiUsedTyres,
    totalTyresCount,
  } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Box sx={isDesktop ? styles.container : styles.containerMobile}>
      <TyresCircle compound={compound} />

      <Typography>Used: {tyresCount}</Typography>

      <Typography>New: {Math.max(0, totalTyresCount - tyresCount)}</Typography>

      <Tooltip
        title={
          <Box>
            {typeof practice1UsedTyres === 'number' ? (
              <Typography>Practice 1 - {practice1UsedTyres} set/s</Typography>
            ) : null}

            {typeof practice2UsedTyres === 'number' ? (
              <Typography>Practice 2 - {practice2UsedTyres} set/s</Typography>
            ) : null}

            {typeof practice3UsedTyres === 'number' ? (
              <Typography>Practice 3 - {practice3UsedTyres} set/s</Typography>
            ) : null}

            {typeof sprintUsedTyres === 'number' ? (
              <Typography>Sprint - {sprintUsedTyres} set/s</Typography>
            ) : null}

            {typeof qualiUsedTyres === 'number' ? (
              <Typography>Qualification - {qualiUsedTyres} set/s</Typography>
            ) : null}
          </Box>
        }
        arrow
        enterTouchDelay={0}
        leaveTouchDelay={5000}
      >
        <Box sx={styles.infoIconContainer}>
          <IconContext.Provider value={{ style: styles.icon }}>
            <FaCircleInfo />
          </IconContext.Provider>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default TyresCard;
