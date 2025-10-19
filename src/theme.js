import { createTheme } from '@mui/material/styles';
import Formula1TTF from './assets/fonts/Formula1-Regular.woff2';
import {
  MAIN_COLOR,
  BRAND_COLOR_LIGHT,
  BRAND_COLOR_DARK,
  SNACKBAR_INFO_COLOR_LIGHT,
  SNACKBAR_INFO_COLOR_DARK,
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  TEXT_COLOR_SECONDARY_LIGHT,
  TEXT_COLOR_SECONDARY_DARK,
  BACKGROUND_COLOR_LIGHT,
  BACKGROUND_COLOR_DARK,
  PAPER_COLOR_LIGHT,
  PAPER_COLOR_DARK,
} from './constants/globalConsts';

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: MAIN_COLOR,
      },
      secondary: {
        main: BRAND_COLOR_LIGHT,
      },
      secondaryDark: {
        main: BRAND_COLOR_DARK,
      },
      background: {
        default:
          mode === 'light' ? BACKGROUND_COLOR_LIGHT : BACKGROUND_COLOR_DARK,
        paper: mode === 'light' ? PAPER_COLOR_LIGHT : PAPER_COLOR_DARK,
      },
      text: {
        primary: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
        secondary:
          mode === 'light'
            ? TEXT_COLOR_SECONDARY_LIGHT
            : TEXT_COLOR_SECONDARY_DARK,
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
            backgroundColor:
              mode === 'light'
                ? SNACKBAR_INFO_COLOR_LIGHT
                : SNACKBAR_INFO_COLOR_DARK,
          },
        },
      },
    },
  });

export default getTheme;
