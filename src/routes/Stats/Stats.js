import React from 'react';
import { styled } from '@mui/material';
import Layout from '../../components/Layout';
import Stats from '../../components/Stats';
import getStyles from './Stats.styles';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const Main = () => (
  <Layout>
    <ParentContainer>
      <Stats />
    </ParentContainer>
  </Layout>
);

export default Main;
