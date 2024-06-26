import {
  styled,
  Grid,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import getStyles from './Header.styles';
import useIsMobile from '../../hooks/useIsMobile';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IconContext } from 'react-icons';
import MainLogo from '../MainLogo';

const styles = getStyles();

const MainContainer = styled('header')(() => styles.header);

const StyledLink = styled(Link)(() => styles.link);

const PracticeStatsLink = ({ pathname }) => (
  <StyledLink to="/practiceStats" sx={styles.buttonLink}>
    <Button sx={pathname === '/practiceStats' ? styles.buttonActive : {}}>
      <Typography
        component="span"
        sx={
          pathname === '/practiceStats'
            ? styles.buttonTextActive
            : styles.buttonText
        }
      >
        Practice stats
      </Typography>
    </Button>
  </StyledLink>
);

const TyresLink = ({ pathname }) => (
  <StyledLink to="/tyres" sx={styles.buttonLink}>
    <Button sx={pathname === '/tyres' ? styles.buttonActive : {}}>
      <Typography
        component="span"
        sx={pathname === '/tyres' ? styles.buttonTextActive : styles.buttonText}
      >
        Tyres
      </Typography>
    </Button>
  </StyledLink>
);

const DrawerList = ({ toggleDrawer, pathname }) => (
  <Box
    sx={styles.drawerListContainer}
    role="presentation"
    onClick={toggleDrawer(false)}
  >
    <List sx={styles.drawerList}>
      <ListItem key="practiceStatsDrawerItem" disablePadding>
        <ListItemButton>
          <PracticeStatsLink pathname={pathname} />
        </ListItemButton>
      </ListItem>

      <Divider />

      <ListItem key="tyresDrawerItem" disablePadding>
        <ListItemButton>
          <TyresLink pathname={pathname} />
        </ListItemButton>
      </ListItem>

      <Divider />
    </List>
  </Box>
);

const Header = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  return (
    <MainContainer>
      <Grid
        container
        align="left"
        justifyContent="left"
        alignItems="center"
        sx={styles.headerGrid}
      >
        {!isMobile && (
          <>
            <Grid item xs={1} align="left" sx={styles.headerGridItem}>
              <MainLogo />
            </Grid>

            <Grid item xs={1.1} align="left" sx={styles.headerGridItem}>
              <PracticeStatsLink pathname={pathname} />
            </Grid>

            <Grid item xs={1} align="left" sx={styles.headerGridItem}>
              <TyresLink pathname={pathname} />
            </Grid>
          </>
        )}

        {isMobile && (
          <>
            <Grid item align="left" sx={styles.headerGridItem}>
              <MainLogo />
            </Grid>

            <Grid item xs align="right">
              <IconContext.Provider value={{ style: styles.icons }}>
                <RxHamburgerMenu onClick={toggleDrawer(true)} />
              </IconContext.Provider>
            </Grid>
          </>
        )}
      </Grid>

      <Drawer
        sx={styles.drawer}
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        <DrawerList toggleDrawer={toggleDrawer} pathname={pathname} />
      </Drawer>
    </MainContainer>
  );
};

export default Header;
