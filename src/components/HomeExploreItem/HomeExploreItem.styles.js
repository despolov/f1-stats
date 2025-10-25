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
    padding: '20px',
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    position: 'relative',
  },
  containerMobile: {
    width: '100%',
    padding: '20px',
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    position: 'relative',
  },
  icon: {
    width: '35px',
    height: '35px',
    position: 'absolute',
    top: '-19px',
    left: '-3px',
    color: mode === 'light' ? BACKGROUND_COLOR_DARK : TEXT_COLOR_DARK,
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_LIGHT : BACKGROUND_COLOR_DARK,
  },
  iconMobile: {
    width: '35px',
    height: '35px',
    position: 'absolute',
    top: '-19px',
    left: '0',
    color: mode === 'light' ? BACKGROUND_COLOR_DARK : TEXT_COLOR_DARK,
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_LIGHT : BACKGROUND_COLOR_DARK,
  },
  description: {
    fontSize: '14px',
    fontWeight: 400,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    textAlign: 'center',
    lineHeight: '1.6',
  },
  cta: {
    fontWeight: 'bold',
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
    backgroundColor: mode === 'light' ? BRAND_COLOR_LIGHT : BRAND_COLOR_DARK,
    borderRadius: '8px',
    margin: 0,
    padding: '8px 16px',
    fontSize: '13px',
    whiteSpace: 'nowrap',
    width: 'auto',
    minWidth: 'auto',
    maxWidth: 'none',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.2s ease-in-out',
    textTransform: 'uppercase',

    '&:hover': {
      boxShadow:
        '0px 5px 8px -1px rgba(0, 0, 0, 0.3), 0px 8px 14px 0px rgba(0, 0, 0, 0.2), 0px 2px 20px 0px rgba(0, 0, 0, 0.15)',
      backgroundColor:
        mode === 'light' ? BRAND_COLOR_LIGHT_HOVER : BRAND_COLOR_DARK_HOVER,
    },
  },
});

export default getStyles;
