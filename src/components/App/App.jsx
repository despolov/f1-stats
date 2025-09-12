import React, { useContext, useState, useEffect } from 'react';
import { HashRouter as Router, useLocation } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { IntlProvider } from 'react-intl';
import getTheme from '../../theme.js';
import AppRoute from '../AppRoute/index.js';
import ReactGA from 'react-ga4';
import { ColorModeProvider, ColorModeContext } from '../ColorMode/index.js';
import { messages, getUserLocale } from '../../i18n/index.js';

const AppRouterContent = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = getTheme(mode);
  const location = useLocation();
  const [locale, setLocale] = useState(getUserLocale());

  useEffect(() => {
    const newLocale = getUserLocale();
    setLocale(newLocale);
  }, [location.pathname]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoute />
      </ThemeProvider>
    </IntlProvider>
  );
};

const AppContent = () => {
  return (
    <Router>
      <AppRouterContent />
    </Router>
  );
};

const App = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('G-HB1R5JQSBX');
  }

  return (
    <ColorModeProvider>
      <AppContent />
    </ColorModeProvider>
  );
};

export default App;
