import React from 'react';
import { styled } from '@mui/material';
import Layout from '../../components/Layout';
import getStyles from './Tyres.styles';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const Tyres = () => {
  // each driver gets 13 sets of dry weather tyres 8 softs, 3 mediums, and 2 hards
  // this will get all of the stints for each driver
  // return data of a single stint
  // {
  // compound: "MEDIUM"
  // driver_number: 31
  // lap_end: 4
  // lap_start: 1
  // meeting_key: 1230
  // session_key: 9473
  // stint_number: 1
  // tyre_age_at_start: 0
  // }
  // this needs to be separated by driver
  // after that separate it by compound and save the lap start and end so we can check later if the same tyres are used again or check for the stintNumber

  // const meeting = await getMeeting(selectedCountry, selectedYear);
  // const stints = await getStints(meeting[0].meeting_key);

  return (
    <Layout>
      <ParentContainer>
        Tyres used and left for each team for a weekend
      </ParentContainer>
    </Layout>
  );
};

export default Tyres;
