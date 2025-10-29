import {
  TEXT_COLOR_REVERSED_LIGHT,
  TEXT_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  logoContainer: {
    height: '68px',
    minWidth: '140px',
  },
  appLabel: {
    fontSize: '36px',
    lineHeight: '64px',
    fontWeight: 600,
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
    letterSpacing: '2px',
  },
  appLabelLogoSmall: {
    fontSize: '20px',
    lineHeight: '64px',
    fontWeight: 600,
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
    letterSpacing: '2px',
  },
  logoImg: {
    position: 'relative',
    top: '-15px',
    left: '-57px',
    width: '65px',
  },
  logoImgMobile: {
    position: 'relative',
    top: '-14px',
    left: '-59px',
    width: '65px',
  },
});

export default getStyles;
