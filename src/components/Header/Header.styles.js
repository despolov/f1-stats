import {
  BRAND_COLOR_LIGHT,
  BRAND_COLOR_DARK,
  TEXT_COLOR_REVERSED_LIGHT,
  TEXT_COLOR_REVERSED_LIGHT_HOVER,
  TEXT_COLOR_DARK,
  BORDER_COLOR_REVERSED_LIGHT,
  BORDER_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  header: {
    background: mode === 'light' ? BRAND_COLOR_LIGHT : BRAND_COLOR_DARK,
    height: '68px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  leftGridContainer: {
    gap: { xs: '8px', sm: '12px', md: '16px' },
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  rightGridContainer: {
    justifyContent: 'end',
    gap: '8px',
  },
  headerGrid: {
    padding: { xs: '0 12px', sm: '0 16px', md: '0 24px' },
    height: '68px',
  },
  headerGridItem: {
    height: '68px',
    minWidth: { xs: '100px', sm: '120px', md: '140px' },
    display: 'flex',
    alignItems: 'center',
  },
  headerGridButtonItem: {
    height: '68px',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: { xs: '8px 12px', md: '8px 16px' },
    minWidth: 'auto',
    borderRadius: '8px',
  },
  buttonHover: {
    backgroundColor:
      mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  },
  buttonText: {
    fontSize: { xs: '13px', md: '14px' },
    lineHeight: '26px',
    fontWeight: 400,
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
    whiteSpace: 'nowrap',
    textTransform: 'none',
  },
  buttonTextActive: {
    fontSize: { xs: '13px', md: '14px' },
    lineHeight: '26px',
    fontWeight: 700,
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
    whiteSpace: 'nowrap',
    textTransform: 'none',
  },
  buttonActive: {
    padding: { xs: '8px 12px', md: '8px 16px' },
    minWidth: 'auto',
    borderRadius: '8px',
    borderBottom: `1px solid ${
      mode === 'light' ? BORDER_COLOR_REVERSED_LIGHT : BORDER_COLOR_DARK
    }`,
    borderRight: `1px solid ${
      mode === 'light' ? BORDER_COLOR_REVERSED_LIGHT : BORDER_COLOR_DARK
    }`,
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '0',
    borderTopRightRadius: '0',
  },
  drawerIcon: {
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
    height: '28px',
    width: '28px',
  },
  drawerListContainer: {
    width: 250,
    background: mode === 'light' ? BRAND_COLOR_LIGHT : BRAND_COLOR_DARK,
    height: '100%',
  },
  drawerList: {
    margin: 0,
    padding: 0,
  },
  iconContainer: {
    height: '68px',
    alignContent: 'center',
  },
  icon: {
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
    width: '24px',
    height: '24px',
    transition: 'all 0.2s ease-in-out',
  },
  modeIconContainer: {
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor:
        mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      transform: 'scale(1.05)',
    },
  },
  modeIconContainerWithMargin: {
    padding: '8px',
    minWidth: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor:
        mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      transform: 'scale(1.02)',
    },
  },
  modeIconContainerMobile: {
    padding: '8px',
    marginRight: '8px',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
  },
  headerGridButtonsItem: {
    justifyContent: 'end',
    display: 'flex',
    alignItems: 'center',
  },
  countryIcon: {
    width: '20px',
    height: '20px',
  },
  countryIconWithMargin: {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  },
  modeIconLanguageContainerMobile: {
    padding: '8px',
    marginRight: '8px',
    minWidth: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
  },
});

export default getStyles;
