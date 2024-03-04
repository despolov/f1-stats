import React from 'react';
import { styled } from '@mui/material';
import Header from '../Header';
import getStyles from './Layout.styles';

const styles = getStyles();

const MainContainer = styled('div')(() => styles.mainContainer);

const ChildrenContainer = styled('div')(() => styles.childrenContainer);

const Layout = (props) => {
  const { children } = props;

  return (
    <MainContainer>
      <Header />

      <ChildrenContainer>{children}</ChildrenContainer>
    </MainContainer>
  );
};

export default Layout;
