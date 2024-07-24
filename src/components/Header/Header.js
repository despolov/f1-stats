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
  IconButton,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getStyles from './Header.styles';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IconContext } from 'react-icons';
import MainLogo from '../MainLogo';
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import { ColorModeContext } from '../ColorMode';

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

const Header = (props) => {
  const { headerRef } = props;
  const { pathname } = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  return (
    <MainContainer ref={headerRef}>
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
                <TyresLink pathname={pathname} />
              </Grid>
            </Grid>

            <Grid container item xs={6} sx={styles.rightGridContainer}>
              <Grid item sx={styles.iconContainer}>
                <IconButton
                  onClick={toggleColorMode}
                  color="inherit"
                  sx={{ padding: 0 }}
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
