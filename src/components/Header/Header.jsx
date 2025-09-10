import {
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
  IconButton,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import getStyles from './Header.styles';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IconContext } from 'react-icons';
import MainLogo from '../MainLogo';
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import { ColorModeContext } from '../ColorMode';

const PracticeStatsLink = ({ pathname }) => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

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
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

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

const StintsLink = ({ pathname }) => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Button
      sx={pathname === '/stints' ? styles.buttonActive : {}}
      onClick={() => {
        if (pathname === '/stints') {
          return;
        }

        navigate('/stints');
      }}
    >
      <Typography
        component="span"
        sx={
          pathname === '/stints' ? styles.buttonTextActive : styles.buttonText
        }
      >
        Stints
      </Typography>
    </Button>
  );
};

const TeamRadioLink = ({ pathname }) => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Button
      sx={pathname === '/teamRadio' ? styles.buttonActive : {}}
      onClick={() => {
        if (pathname === '/teamRadio') {
          return;
        }

        navigate('/teamRadio');
      }}
    >
      <Typography
        component="span"
        sx={
          pathname === '/teamRadio'
            ? styles.buttonTextActive
            : styles.buttonText
        }
      >
        Team Radio
      </Typography>
    </Button>
  );
};

const RaceLink = ({ pathname }) => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Button
      sx={pathname === '/race' ? styles.buttonActive : {}}
      onClick={() => {
        if (pathname === '/race') {
          return;
        }

        navigate('/race');
      }}
    >
      <Typography
        component="span"
        sx={pathname === '/race' ? styles.buttonTextActive : styles.buttonText}
      >
        Race
      </Typography>
    </Button>
  );
};

const DrawerList = ({ toggleDrawer, pathname }) => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

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

        <ListItem key="raceDrawerItem" disablePadding>
          <ListItemButton
            onClick={() => {
              if (pathname === '/race') {
                return;
              }

              navigate('/race');
            }}
          >
            <RaceLink pathname={pathname} />
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

        <ListItem key="stintsDrawerItem" disablePadding>
          <ListItemButton
            onClick={() => {
              if (pathname === '/stints') {
                return;
              }

              navigate('/stints');
            }}
          >
            <StintsLink pathname={pathname} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem key="teamRadiosDrawerItem" disablePadding>
          <ListItemButton
            onClick={() => {
              if (pathname === '/teamRadio') {
                return;
              }

              navigate('/teamRadio');
            }}
          >
            <TeamRadioLink pathname={pathname} />
          </ListItemButton>
        </ListItem>

        <Divider />
      </List>
    </Box>
  );
};

const Header = (props) => {
  const { headerRef } = props;
  const { pathname } = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  return (
    <Box component="header" sx={styles.header} ref={headerRef}>
      <Grid
        container
        align="left"
        justifyContent="left"
        alignItems="center"
        sx={styles.headerGrid}
      >
        {isDesktop && (
          <>
            <Grid container item xs={6} sx={styles.leftGridContainer}>
              <Grid item sx={styles.headerGridItem}>
                <MainLogo />
              </Grid>

              <Grid item sx={styles.headerGridButtonItem}>
                <PracticeStatsLink pathname={pathname} />
              </Grid>

              <Grid item sx={styles.headerGridButtonItem}>
                <RaceLink pathname={pathname} />
              </Grid>

              <Grid item sx={styles.headerGridButtonItem}>
                <TyresLink pathname={pathname} />
              </Grid>

              <Grid item sx={styles.headerGridButtonItem}>
                <StintsLink pathname={pathname} />
              </Grid>

              <Grid item sx={styles.headerGridButtonItem}>
                <TeamRadioLink pathname={pathname} />
              </Grid>
            </Grid>

            <Grid container item xs={6} sx={styles.rightGridContainer}>
              <Grid item sx={styles.iconContainer}>
                <IconButton
                  onClick={toggleColorMode}
                  color="inherit"
                  sx={styles.modeIconContainer}
                >
                  {mode === 'dark' ? (
                    <Brightness7Icon sx={styles.icon} />
                  ) : (
                    <Brightness4Icon sx={styles.icon} />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          </>
        )}

        {!isDesktop && (
          <>
            <Grid item align="left" sx={styles.headerGridItem}>
              <MainLogo />
            </Grid>

            <Grid item xs sx={styles.headerGridButtonsItem}>
              <IconButton
                onClick={toggleColorMode}
                color="inherit"
                sx={styles.modeIconContainerMobile}
              >
                {mode === 'dark' ? (
                  <Brightness7Icon sx={styles.icon} />
                ) : (
                  <Brightness4Icon sx={styles.icon} />
                )}
              </IconButton>

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
    </Box>
  );
};

export default Header;
