import React from 'react';
import { HashRouter as Router } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme.js';
import AppRoute from '../AppRoute/index.js';
import ReactGA from 'react-ga4';
import { ColorModeProvider } from '../ColorMode/index.js';

const App = () => {
  ReactGA.initialize('G-HB1R5JQSBX');

  return (
    <ColorModeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          <AppRoute />
        </Router>
      </ThemeProvider>
    </ColorModeProvider>
  );
};

export default App;
