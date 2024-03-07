import React from 'react';
import { styled } from '@mui/material';
import Layout from '../../components/Layout';
import getStyles from './Tyres.styles';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const Drivers = () => {
  return (
    <Layout>
      <ParentContainer>
        Tyres used and left for each team for a weekend
      </ParentContainer>
    </Layout>
  );
};

export default Drivers;
