import React from 'react';
import { styled, useTheme, useMediaQuery } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';
import getStyles from './Layout.styles';

const styles = getStyles();

const MainContainer = styled('div')(() => styles.mainContainer);

const ChildrenContainer = styled('div')(() => styles.childrenContainer);

const Layout = (props) => {
  const { children, fullScreen, headerRef, footerRef } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <MainContainer>
      <Header headerRef={headerRef} />

      <ChildrenContainer
        sx={{
          ...(isDesktop ? {} : styles.childrenContainerMobile),
          ...(fullScreen ? styles.childrenContainerFullScreen : {}),
        }}
      >
        {children}
      </ChildrenContainer>

      <Footer footerRef={footerRef} />
    </MainContainer>
  );
};

export default Layout;
