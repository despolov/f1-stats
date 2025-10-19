import {
  BACKGROUND_COLOR_LIGHT,
  BACKGROUND_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  mainContainer: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column wrap',
    flexGrow: 1,
    minHeight: '100vh',
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_LIGHT : BACKGROUND_COLOR_DARK,
    letterSpacing: '0.7px',
  },
  childrenContainer: {
    padding: '16px',
    width: ' 100%',
  },
  childrenContainerMobile: {
    padding: '0',
    width: ' 100%',
  },
  childrenContainerFullScreen: {
    padding: '0',
    width: ' 100%',
  },
});

export default getStyles;
