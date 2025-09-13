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
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import ReactCountryFlag from 'react-country-flag';
import getStyles from './Header.styles';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IconContext } from 'react-icons';
import MainLogo from '../MainLogo';
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Language as LanguageIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import { ColorModeContext } from '../ColorMode';
import { locales, getLocaleFromUrl, defaultLocale } from '../../i18n';

const getCountryCode = (locale) => {
  const countryMap = {
    en: 'GB',
    de: 'DE',
  };

  return countryMap[locale] || 'XX';
};

const PracticeStatsLink = ({ pathname }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const currentLocale = getLocaleFromUrl() || defaultLocale;

  return (
    <Button
      sx={pathname.endsWith('/practiceStats') ? styles.buttonActive : {}}
      onClick={() => {
        if (pathname.endsWith('/practiceStats')) {
          return;
        }

        navigate(`/${currentLocale}/practiceStats`);
      }}
    >
      <Typography
        component="span"
        sx={
          pathname.endsWith('/practiceStats')
            ? styles.buttonTextActive
            : styles.buttonText
        }
      >
        {intl.formatMessage({ id: 'header.practiceStats' })}
      </Typography>
    </Button>
  );
};

const TyresLink = ({ pathname }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const currentLocale = getLocaleFromUrl() || defaultLocale;

  return (
    <Button
      sx={pathname.endsWith('/tyres') ? styles.buttonActive : {}}
      onClick={() => {
        if (pathname.endsWith('/tyres')) {
          return;
        }

        navigate(`/${currentLocale}/tyres`);
      }}
    >
      <Typography
        component="span"
        sx={
          pathname.endsWith('/tyres')
            ? styles.buttonTextActive
            : styles.buttonText
        }
      >
        {intl.formatMessage({ id: 'header.tyres' })}
      </Typography>
    </Button>
  );
};

const StintsLink = ({ pathname }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const currentLocale = getLocaleFromUrl() || defaultLocale;

  return (
    <Button
      sx={pathname.endsWith('/stints') ? styles.buttonActive : {}}
      onClick={() => {
        if (pathname.endsWith('/stints')) {
          return;
        }

        navigate(`/${currentLocale}/stints`);
      }}
    >
      <Typography
        component="span"
        sx={
          pathname.endsWith('/stints')
            ? styles.buttonTextActive
            : styles.buttonText
        }
      >
        {intl.formatMessage({ id: 'header.stints' })}
      </Typography>
    </Button>
  );
};

const TeamRadioLink = ({ pathname }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const currentLocale = getLocaleFromUrl() || defaultLocale;

  return (
    <Button
      sx={pathname.endsWith('/teamRadio') ? styles.buttonActive : {}}
      onClick={() => {
        if (pathname.endsWith('/teamRadio')) {
          return;
        }

        navigate(`/${currentLocale}/teamRadio`);
      }}
    >
      <Typography
        component="span"
        sx={
          pathname.endsWith('/teamRadio')
            ? styles.buttonTextActive
            : styles.buttonText
        }
      >
        {intl.formatMessage({ id: 'header.teamRadio' })}
      </Typography>
    </Button>
  );
};

const RaceLink = ({ pathname }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const currentLocale = getLocaleFromUrl() || defaultLocale;

  return (
    <Button
      sx={pathname.endsWith('/race') ? styles.buttonActive : {}}
      onClick={() => {
        if (pathname.endsWith('/race')) {
          return;
        }

        navigate(`/${currentLocale}/race`);
      }}
    >
      <Typography
        component="span"
        sx={
          pathname.endsWith('/race')
            ? styles.buttonTextActive
            : styles.buttonText
        }
      >
        {intl.formatMessage({ id: 'header.race' })}
      </Typography>
    </Button>
  );
};

const DrawerList = ({ toggleDrawer, pathname }) => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const currentLocale = getLocaleFromUrl() || defaultLocale;

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
              if (pathname.endsWith('/practiceStats')) {
                return;
              }

              navigate(`/${currentLocale}/practiceStats`);
            }}
          >
            <PracticeStatsLink pathname={pathname} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem key="raceDrawerItem" disablePadding>
          <ListItemButton
            onClick={() => {
              if (pathname.endsWith('/race')) {
                return;
              }

              navigate(`/${currentLocale}/race`);
            }}
          >
            <RaceLink pathname={pathname} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem key="tyresDrawerItem" disablePadding>
          <ListItemButton
            onClick={() => {
              if (pathname.endsWith('/tyres')) {
                return;
              }

              navigate(`/${currentLocale}/tyres`);
            }}
          >
            <TyresLink pathname={pathname} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem key="stintsDrawerItem" disablePadding>
          <ListItemButton
            onClick={() => {
              if (pathname.endsWith('/stints')) {
                return;
              }

              navigate(`/${currentLocale}/stints`);
            }}
          >
            <StintsLink pathname={pathname} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem key="teamRadiosDrawerItem" disablePadding>
          <ListItemButton
            onClick={() => {
              if (pathname.endsWith('/teamRadio')) {
                return;
              }

              navigate(`/${currentLocale}/teamRadio`);
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
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const intl = useIntl();
  const currentLocale = getLocaleFromUrl() || defaultLocale;
  const open = Boolean(anchorEl);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const handleLanguageMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (locale) => {
    const hash = window.location.hash;
    const currentPath = hash.replace('#', '');
    const segments = currentPath.split('/').filter(Boolean);
    const pathWithoutLocale = segments.slice(1).join('/');
    const newPath = `/${locale}${
      pathWithoutLocale ? '/' + pathWithoutLocale : ''
    }`;

    navigate(newPath);
    handleLanguageMenuClose();
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
                <Button
                  onClick={handleLanguageMenuClick}
                  color="inherit"
                  sx={styles.modeIconContainerWithMargin}
                  aria-label={intl.formatMessage({
                    id: 'header.selectLanguage',
                  })}
                >
                  <ReactCountryFlag
                    countryCode={getCountryCode(currentLocale)}
                    svg
                    style={styles.countryIcon}
                  />
                  <KeyboardArrowDownIcon
                    sx={{
                      ...styles.icon,
                      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  />
                </Button>
              </Grid>
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
              <Button
                onClick={handleLanguageMenuClick}
                color="inherit"
                sx={styles.modeIconLanguageContainerMobile}
                aria-label={intl.formatMessage({ id: 'header.selectLanguage' })}
              >
                <ReactCountryFlag
                  countryCode={getCountryCode(currentLocale)}
                  svg
                  style={styles.countryIcon}
                />
                <KeyboardArrowDownIcon
                  sx={{
                    ...styles.icon,
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
              </Button>

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

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleLanguageMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {Object.entries(locales).map(([code, name]) => (
          <MenuItem
            key={code}
            onClick={() => handleLanguageSelect(code)}
            selected={code === currentLocale}
          >
            <ReactCountryFlag
              countryCode={getCountryCode(code)}
              svg
              style={styles.countryIconWithMargin}
            />

            {name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Header;
