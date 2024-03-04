import React from 'react';
import { styled } from '@mui/material';
import Layout from '../../components/Layout';
import getStyles from './Teams.styles';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const Teams = () => {
  return (
    <Layout>
      <ParentContainer>teams</ParentContainer>
    </Layout>
  );
};

export default Teams;
