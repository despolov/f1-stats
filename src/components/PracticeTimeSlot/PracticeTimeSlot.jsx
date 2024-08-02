import React, { useContext } from 'react';
import getStyles from './PracticeTimeSlot.styles';
import { IconContext } from 'react-icons';
import { CiStreamOn } from 'react-icons/ci';
import { Typography } from '@mui/material';
import moment from 'moment';
import { ColorModeContext } from '../ColorMode';

const PracticeTimeSlot = (props) => {
  const { practiceTimePeriod } = props;
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const startDate = moment(practiceTimePeriod.start);
  const startDateFormatted = moment(practiceTimePeriod.start).format('DD-MMM');
  const startHours = moment(practiceTimePeriod.start).format('HH:mm');
  const endDate = moment(practiceTimePeriod.end);
  const endHours = moment(practiceTimePeriod.end).format('HH:mm');
  const isLive = moment().isBetween(startDate, endDate);

  return (
    <Typography component="h4" sx={styles.title}>
      {isLive && (
        <IconContext.Provider value={{ style: styles.iconLive }}>
          <CiStreamOn />
        </IconContext.Provider>
      )}{' '}
      {`${startDateFormatted} ${startHours} - ${endHours}`}
    </Typography>
  );
};

export default PracticeTimeSlot;
