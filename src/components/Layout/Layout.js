import React from 'react';
import { styled } from '@mui/material';
import Header from '../Header';
import getStyles from './Layout.styles';

const styles = getStyles();

const MainContainer = styled('div')(() => styles.mainContainer);

const Layout = (props) => {
  const { children } = props;

  return (
    <MainContainer>
      <Header />

      {children}
    </MainContainer>
  );
};

export default Layout;
