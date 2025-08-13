import React, { useContext } from 'react';
import { HashRouter as Router } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from '../../theme.js';
import AppRoute from '../AppRoute/index.js';
import ReactGA from 'react-ga4';
import { ColorModeProvider, ColorModeContext } from '../ColorMode/index.js';

const AppContent = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoute />
      </Router>
    </ThemeProvider>
  );
};

const App = () => {
  ReactGA.initialize('G-HB1R5JQSBX');

  return (
    <ColorModeProvider>
      <AppContent />
    </ColorModeProvider>
  );
};

export default App;
