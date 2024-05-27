import React from 'react';
import getStyles from './PracticeTimeSlot.styles';
import { IconContext } from 'react-icons';
import { CiStreamOn } from 'react-icons/ci';
import { styled } from '@mui/material';
import moment from 'moment';

const styles = getStyles();

const SubTitleH4 = styled('h4')(() => styles.subTitleH4);

const PracticeTimeSlot = (props) => {
  const { practiceTimePeriod } = props;
  const startDate = moment(practiceTimePeriod.start);
  const startDateFormatted = moment(practiceTimePeriod.start).format('DD-MMM');
  const startHours = moment(practiceTimePeriod.start).format('HH:mm');
  const endDate = moment(practiceTimePeriod.end);
  const endHours = moment(practiceTimePeriod.end).format('HH:mm');
  const isLive = moment().isBetween(startDate, endDate);

  return (
    <SubTitleH4>
      {isLive && (
        <IconContext.Provider value={{ style: styles.iconLive }}>
          <CiStreamOn />
        </IconContext.Provider>
      )}{' '}
      {`${startDateFormatted} ${startHours} - ${endHours}`}
    </SubTitleH4>
  );
};

export default PracticeTimeSlot;
