import React, { useContext } from 'react';
import { useTheme, useMediaQuery, Box } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';
import getStyles from './Layout.styles';
import { ColorModeContext } from '../ColorMode';

const Layout = (props) => {
  const { children, fullScreen, headerRef, footerRef } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Box sx={styles.mainContainer}>
      <Header headerRef={headerRef} />

      <Box
        sx={{
          ...styles.childrenContainer,
          ...(isDesktop ? {} : styles.childrenContainerMobile),
          ...(fullScreen ? styles.childrenContainerFullScreen : {}),
        }}
      >
        {children}
      </Box>

      <Footer footerRef={footerRef} />
    </Box>
  );
};

export default Layout;
