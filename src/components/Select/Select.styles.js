import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_REVERSED_LIGHT,
  TEXT_COLOR_DARK,
  BACKGROUND_COLOR_PURE_LIGHT,
  BACKGROUND_COLOR_DARK_2,
  BACKGROUND_COLOR_DARK_3,
  BORDER_COLOR_LIGHT_2,
  BORDER_COLOR_REVERSED_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  select: {
    minHeight: '61px',
    width: '100%',
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_PURE_LIGHT : BACKGROUND_COLOR_DARK_2,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    '.MuiOutlinedInput-notchedOutline': {
      borderColor:
        mode === 'light' ? BORDER_COLOR_LIGHT_2 : BORDER_COLOR_REVERSED_DARK,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid',
      borderColor:
        mode === 'light' ? BORDER_COLOR_LIGHT_2 : BORDER_COLOR_REVERSED_DARK,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor:
        mode === 'light' ? BORDER_COLOR_LIGHT_2 : BORDER_COLOR_REVERSED_DARK,
    },
    '.MuiSvgIcon-root ': {
      fill: `${
        mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK
      } !important`,
    },
    '&.Mui-disabled': {
      color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
      '&:hover': {
        borderColor: `${
          mode === 'light' ? BORDER_COLOR_LIGHT_2 : BORDER_COLOR_REVERSED_DARK
        }`,
      },
      '.MuiOutlinedInput-notchedOutline': {
        borderColor:
          mode === 'light' ? BORDER_COLOR_LIGHT_2 : BORDER_COLOR_REVERSED_DARK,
      },

      '& div': {
        WebkitTextFillColor:
          mode === 'light'
            ? 'rgba(0, 0, 0, 0.38)'
            : 'rgba(255, 255, 255, 0.38)',
      },
    },
  },
  loader: {
    marginBottom: '-3px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  selectDropdown: {
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_PURE_LIGHT : BACKGROUND_COLOR_DARK_3,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_REVERSED_LIGHT,
  },
  selectDropdownMobile: {
    left: '8px !important',
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_PURE_LIGHT : BACKGROUND_COLOR_DARK_3,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_REVERSED_LIGHT,
  },
  placeholder: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
});

export default getStyles;
