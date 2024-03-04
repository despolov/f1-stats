import { createTheme } from '@mui/material/styles';
import Formula1Regular from './assets/fonts/Formula1-Regular.ttf';

const formula1Regular = {
  fontFamily: 'Formula1Regular',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: `url(${Formula1Regular}) format('truetype')`,
};

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#E10600',
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      html: [{ '@font-face': formula1Regular }],
    },
  },
});

export default theme;
