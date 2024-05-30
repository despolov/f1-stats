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
import { Link } from 'react-router-dom';
import getStyles from './Header.styles';
import logo512 from '../../assets/icons/logo-512x512.png';
import { useLocation } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IconContext } from 'react-icons';

const styles = getStyles();

const MainContainer = styled('header')(() => styles.header);

const StyledLink = styled(Link)(() => styles.link);

const PracticeStatsLink = ({ pathname }) => (
  <StyledLink to="/practiceStats" sx={styles.buttonLink}>
    <Button>
      <Typography
        component="span"
        sx={
          pathname === '/practiceStats'
            ? styles.mainButtonActive
            : styles.mainButton
        }
      >
        Practice stats
      </Typography>
    </Button>
  </StyledLink>
);

const TyresLink = ({ pathname }) => (
  <StyledLink to="/tyres" sx={[styles.buttonLink, { marginRight: 0 }]}>
    <Button>
      <Typography
        component="span"
        sx={pathname === '/tyres' ? styles.mainButtonActive : styles.mainButton}
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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  return (
    <MainContainer>
      <Grid
        container
        align="center"
        justifyContent="center"
        alignItems="center"
        sx={styles.headerGrid}
      >
        <Grid item xs align="left">
          <StyledLink to="/" sx={styles.companyButtonLink}>
            <Typography component="span" sx={styles.appLabel}>
              F1 S
            </Typography>

            <Typography component="span" sx={styles.appLabelLogoSmall}>
              tats
            </Typography>

            <Box
              component="img"
              sx={isDesktop ? styles.logoImg : styles.logoImgMobile}
              alt="logo image"
              src={logo512}
            />
          </StyledLink>

          {!isMobile && (
            <>
              <PracticeStatsLink pathname={pathname} />

              <TyresLink pathname={pathname} />
            </>
          )}
        </Grid>

        {isMobile && (
          <Grid item xs align="right">
            <IconContext.Provider value={{ style: styles.icons }}>
              <RxHamburgerMenu onClick={toggleDrawer(true)} />
            </IconContext.Provider>
          </Grid>
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
