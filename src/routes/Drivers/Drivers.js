import React from 'react';
import { styled } from '@mui/material';
import Layout from '../../components/Layout';
import getStyles from './Drivers.styles';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const Drivers = () => {
  return (
    <Layout>
      <ParentContainer>drivers</ParentContainer>
    </Layout>
  );
};

export default Drivers;
