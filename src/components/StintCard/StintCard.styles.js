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
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '0',
    borderTopLeftRadius: '0',
    position: 'relative',
    width: '450px',
    height: '300px',
  },
  stintNumber: {
    position: 'absolute',
    margin: 0,
    fontWeight: 700,
    fontSize: '16px',
    padding: '0 7px 0 0',
    top: '-12px',
    left: 0,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_LIGHT : BACKGROUND_COLOR_DARK,
  },
  lapsCount: {
    height: '55px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  lapStart: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  lapEnd: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  tyreCircleContainer: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '250px',
  },
  tyreAgeContainer: {
    height: '55px',
    display: 'flex',
    justifyContent: 'center',
  },
  tyreAge: {
    alignSelf: 'flex-end',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
});

export default getStyles;
