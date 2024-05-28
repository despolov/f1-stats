import React from 'react';
import { styled, useTheme, useMediaQuery } from '@mui/material';
import Header from '../Header';
import getStyles from './Layout.styles';

const styles = getStyles();

const MainContainer = styled('div')(() => styles.mainContainer);

const ChildrenContainer = styled('div')(() => styles.childrenContainer);

const Layout = (props) => {
  const { children } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <MainContainer>
      <Header />

      <ChildrenContainer sx={isDesktop ? {} : styles.childrenContainerMobile}>
        {children}
      </ChildrenContainer>
    </MainContainer>
  );
};

export default Layout;
