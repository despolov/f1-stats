import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  container: {
    position: 'absolute',
  },
  circle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    paddingTop: '2px',
    fontWeight: 700,
    textAlign: 'center',
  },
  number: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
});

export default getStyles;
