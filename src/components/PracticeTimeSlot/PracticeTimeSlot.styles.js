import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  title: {
    margin: 0,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  iconLive: {
    color: 'red',
    width: '25px',
    height: '25px',
    marginBottom: '-6px',
  },
});

export default getStyles;
