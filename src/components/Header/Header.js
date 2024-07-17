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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getStyles from './Header.styles';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IconContext } from 'react-icons';
import MainLogo from '../MainLogo';

const styles = getStyles();

const MainContainer = styled('header')(() => styles.header);

const PracticeStatsLink = ({ pathname }) => {
  const navigate = useNavigate();

  return (
    <Button
      sx={pathname === '/practiceStats' ? styles.buttonActive : {}}
      onClick={() => {
        if (pathname === '/practiceStats') {
          return;
        }

        navigate('/practiceStats');
      }}
    >
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
  );
};

const TyresLink = ({ pathname }) => {
  const navigate = useNavigate();

  return (
    <Button
      sx={pathname === '/tyres' ? styles.buttonActive : {}}
      onClick={() => {
        if (pathname === '/tyres') {
          return;
        }

        navigate('/tyres');
      }}
    >
      <Typography
        component="span"
        sx={pathname === '/tyres' ? styles.buttonTextActive : styles.buttonText}
      >
        Tyres
      </Typography>
    </Button>
  );
};

const DrawerList = ({ toggleDrawer, pathname }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={styles.drawerListContainer}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List sx={styles.drawerList}>
        <ListItem key="practiceStatsDrawerItem" disablePadding>
          <ListItemButton
            onClick={() => {
              if (pathname === '/practiceStats') {
                return;
              }

              navigate('/practiceStats');
            }}
          >
            <PracticeStatsLink pathname={pathname} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem key="tyresDrawerItem" disablePadding>
          <ListItemButton
            onClick={() => {
              if (pathname === '/tyres') {
                return;
              }

              navigate('/tyres');
            }}
          >
            <TyresLink pathname={pathname} />
          </ListItemButton>
        </ListItem>

        <Divider />
      </List>
    </Box>
  );
};

const Header = () => {
  const { pathname } = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

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
        {isDesktop && (
          <>
            <Grid item xs={1} align="left" sx={styles.headerGridItem}>
              <MainLogo />
            </Grid>

            <Grid item xs={1.1} align="left" sx={styles.headerGridButtonItem}>
              <PracticeStatsLink pathname={pathname} />
            </Grid>

            <Grid item xs={1} align="left" sx={styles.headerGridButtonItem}>
              <TyresLink pathname={pathname} />
            </Grid>
          </>
        )}

        {!isDesktop && (
          <>
            <Grid item align="left" sx={styles.headerGridItem}>
              <MainLogo />
            </Grid>

            <Grid item xs align="right">
              <IconContext.Provider value={{ style: styles.drawerIcon }}>
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
        anchor="right"
      >
        <DrawerList toggleDrawer={toggleDrawer} pathname={pathname} />
      </Drawer>
    </MainContainer>
  );
};

export default Header;
