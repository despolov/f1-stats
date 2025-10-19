import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '0 0 20px 0',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  containerMobile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '0 0 10px 0',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  infoIconContainer: {
    marginBottom: '-5px',
  },
  icon: {
    width: '20px',
    height: '20px',
  },
});

export default getStyles;
