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
    en: 'US',
    de: 'DE',
    es: 'ES',
    fr: 'FR',
  };

  return countryMap[locale] || 'XX';
};

const NavLink = ({ route, messageId, pathname }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);
  const currentLocale = getLocaleFromUrl() || defaultLocale;
  const isActive = pathname.endsWith(route);

  return (
    <Button
      sx={{
        ...(isActive ? styles.buttonActive : styles.button),
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          ...styles.buttonHover,
        },
      }}
      onClick={() => {
        if (isActive) {
          return;
        }
        navigate(`/${currentLocale}${route}`);
      }}
      aria-label={intl.formatMessage({ id: messageId })}
      aria-current={isActive ? 'page' : undefined}
    >
      <Typography
        component="span"
        sx={isActive ? styles.buttonTextActive : styles.buttonText}
      >
        {intl.formatMessage({ id: messageId })}
      </Typography>
    </Button>
  );
};

const NAV_ITEMS = [
  { route: '/practiceStats', messageId: 'header.practiceStats' },
  { route: '/race', messageId: 'header.race' },
  { route: '/tyres', messageId: 'header.tyres' },
  { route: '/stints', messageId: 'header.stints' },
  { route: '/teamRadio', messageId: 'header.teamRadio' },
];

const DrawerList = ({ toggleDrawer, pathname }) => {
  const { mode } = useContext(ColorModeContext);
  const styles = getStyles(mode);

  return (
    <Box
      sx={styles.drawerListContainer}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List sx={styles.drawerList}>
        {NAV_ITEMS.map((item, index) => (
          <React.Fragment key={item.route}>
            <ListItem disablePadding>
              <ListItemButton sx={{ width: '100%' }}>
                <NavLink
                  route={item.route}
                  messageId={item.messageId}
                  pathname={pathname}
                />
              </ListItemButton>
            </ListItem>

            {index < NAV_ITEMS.length - 1 && <Divider />}
          </React.Fragment>
        ))}
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
            <Grid container item xs="auto" sx={styles.leftGridContainer}>
              <Grid item sx={styles.headerGridItem}>
                <MainLogo />
              </Grid>

              {NAV_ITEMS.map((item) => (
                <Grid item key={item.route} sx={styles.headerGridButtonItem}>
                  <NavLink
                    route={item.route}
                    messageId={item.messageId}
                    pathname={pathname}
                  />
                </Grid>
              ))}
            </Grid>

            <Grid container item xs sx={styles.rightGridContainer}>
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
                  aria-label={intl.formatMessage({
                    id:
                      mode === 'dark'
                        ? 'header.switchToLightMode'
                        : 'header.switchToDarkMode',
                  })}
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
