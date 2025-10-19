import {
  BRAND_COLOR_LIGHT,
  BRAND_COLOR_LIGHT_HOVER,
  BRAND_COLOR_DARK,
  BRAND_COLOR_DARK_HOVER,
  BACKGROUND_COLOR_LIGHT,
  BACKGROUND_COLOR_DARK,
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_REVERSED_LIGHT,
  TEXT_COLOR_DARK,
  BORDER_COLOR_LIGHT,
  BORDER_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  container: {
    width: '30%',
    padding: '10px',
    minHeight: '160px',
    minWidth: '520px',
    borderTop: `4px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderRight: `4px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderBottom: `4px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderTopRightRadius: '25px',
    borderTopLeftRadius: '0',
    borderBottomRightRadius: '25px',
    borderBottomLeftRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  containerMobile: {
    width: '100%',
    padding: '10px',
    minHeight: '175px',
    borderTop: `4px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderRight: `4px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderBottom: `4px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderTopRightRadius: '25px',
    borderTopLeftRadius: '0',
    borderBottomRightRadius: '25px',
    borderBottomLeftRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  icon: {
    width: '35px',
    height: '35px',
    position: 'absolute',
    margin: '-157px 0px 0px -490px',
    color: mode === 'light' ? BACKGROUND_COLOR_DARK : TEXT_COLOR_DARK,
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_LIGHT : BACKGROUND_COLOR_DARK,
  },
  iconMobile: {
    width: '35px',
    height: '35px',
    position: 'absolute',
    margin: '-170px 0px 0px -333px',
    color: mode === 'light' ? BACKGROUND_COLOR_DARK : TEXT_COLOR_DARK,
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_LIGHT : BACKGROUND_COLOR_DARK,
  },
  description: {
    fontSize: '14px',
    fontWeight: 400,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  cta: {
    fontWeight: 'bold',
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
    backgroundColor: mode === 'light' ? BRAND_COLOR_LIGHT : BRAND_COLOR_DARK,
    borderRadius: '4px',
    margin: 0,
    padding: '5px 10px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    width: 'auto',
    minWidth: 'auto',
    maxWidth: 'none',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',

    '&:hover': {
      boxShadow:
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
      backgroundColor:
        mode === 'light' ? BRAND_COLOR_LIGHT_HOVER : BRAND_COLOR_DARK_HOVER,
    },
  },
});

export default getStyles;
