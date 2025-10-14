import { createTheme } from '@mui/material/styles';
import Formula1TTF from './assets/fonts/Formula1-Regular.woff2';

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#E10600',
      },
      secondaryDark: {
        main: '#870400',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#666666' : '#aaaaaa',
      },
    },
    typography: {
      fontFamily: 'Formula1',
      fontStyle: 'normal',
      fontDisplay: 'swap',
      letterSpacing: '1px',
      fontWeight: '400',
      button: {
        textTransform: 'none',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        letterSpacing: '1px',
        fontWeight: '400',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Formula1';
          font-style: normal;
          font-display: swap;
          font-weight: normal;
          src: url(${Formula1TTF}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
      },
      MuiAlert: {
        styleOverrides: {
          icon: {
            alignItems: 'center',
          },
          filledInfo: {
            backgroundColor: mode === 'light' ? '#ff6b6b' : '#c92a2a',
          },
        },
      },
    },
  });

export default getTheme;
