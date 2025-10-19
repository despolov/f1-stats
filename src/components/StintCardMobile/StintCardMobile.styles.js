import {
  BACKGROUND_COLOR_LIGHT,
  BACKGROUND_COLOR_DARK,
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  BORDER_COLOR_LIGHT,
  BORDER_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  container: {
    textAlign: 'center',
    alignContent: 'center',
    borderTop: `2px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderRight: `2px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '0',
    borderTopLeftRadius: '0',
    position: 'relative',
    width: '450px',
    height: '250px',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tyreCircleContainer: {
    display: 'flex',
    justifyContent: 'left',
    minWidth: '205px',
  },
  infoText: {
    margin: '0 0 30px 0',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  infoTextNoM: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  textsContainer: {
    textAlign: 'end',
    margin: '0 5px 0 0',
  },
  stintNumber: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_LIGHT : BACKGROUND_COLOR_DARK,
  },
});

export default getStyles;
