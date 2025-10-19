import {
  BACKGROUND_COLOR_PURE_LIGHT,
  BACKGROUND_COLOR_DARK_3,
  BORDER_COLOR_REVERSED_DARK,
  BACKGROUND_COLOR_DARK_2,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  container: {
    border: `1px solid ${BORDER_COLOR_REVERSED_DARK}`,
    borderRadius: '8px',
    padding: '20px',
    minWidth: '400px',
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_PURE_LIGHT : BACKGROUND_COLOR_DARK_3,
  },
  containerMobile: {
    border: `1px solid ${BORDER_COLOR_REVERSED_DARK}`,
    borderRadius: '8px',
    padding: '10px',
    minWidth: '100%',
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_PURE_LIGHT : BACKGROUND_COLOR_DARK_3,
  },
  allStintsButton: {
    fontSize: '13px',
    backgroundColor: BACKGROUND_COLOR_DARK_2,
    border: `1px solid ${BACKGROUND_COLOR_DARK_2}`,

    '&:hover': {
      backgroundColor: BACKGROUND_COLOR_DARK_3,
    },
  },
});

export default getStyles;
