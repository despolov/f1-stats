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
    fontSize: '28px',
    lineHeight: '68px',
    fontWeight: 600,
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
  },
  appLabelLogoSmall: {
    fontSize: '14px',
    lineHeight: '68px',
    fontWeight: 600,
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
  },
  logoImg: {
    position: 'relative',
    left: '-35px',
    height: '35px',
    width: '35px',
  },
  logoImgMobile: {
    position: 'relative',
    top: '1px',
    left: '-40px',
    height: '35px',
    width: '35px',
  },
});

export default getStyles;
