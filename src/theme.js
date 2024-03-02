import { createTheme } from '@mui/material/styles';
import Formula1Regular from './fonts/Formula1-Regular.ttf';

const formula1Regular = {
  fontFamily: 'Formula1Regular',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: `url(${Formula1Regular}) format('truetype')`,
};

const theme = createTheme({
  palette: {
    type: 'light',
  },
  MuiCssBaseline: {
    styleOverrides: {
      html: [{ '@font-face': formula1Regular }],
    },
  },
});

export default theme;
