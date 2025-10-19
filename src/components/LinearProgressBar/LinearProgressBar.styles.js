import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  container: {
    textAlign: 'center',
  },
  progressTitle: {
    fontSize: '16px',
    margin: '0 5px 0 0',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    fontWight: 'normal',
  },
  progressValue: {
    fontSize: '18px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    fontWeight: 'bold',
  },
  progressLabelContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 0 10px 0',
  },
});

export default getStyles;
