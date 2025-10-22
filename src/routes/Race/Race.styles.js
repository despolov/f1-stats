import {
  BRAND_COLOR_LIGHT,
  BRAND_COLOR_DARK,
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_REVERSED_LIGHT,
  TEXT_COLOR_DARK,
  BORDER_COLOR_REVERSED_LIGHT,
  BORDER_COLOR_REVERSED_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  parentContainer: {
    padding: '20px',
  },
  parentContainerMobile: {
    padding: '8px 8px 24px 8px',
  },
  errorMessage: {
    marginBottom: '20px',
  },
  title: {
    margin: '0 0 10px 0',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  titleError: {
    margin: '0 0 10px 0',
    color: mode === 'light' ? BRAND_COLOR_LIGHT : BRAND_COLOR_DARK,
    fontSize: '20px',
    textAlign: 'center',
  },
  subTitleError: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    textAlign: 'center',
  },
  description: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    textAlign: 'center',
  },
  divider: {
    borderBottom:
      mode === 'light'
        ? `2px solid ${BORDER_COLOR_REVERSED_LIGHT}`
        : `2px solid ${BORDER_COLOR_REVERSED_DARK}`,
    margin: '20px 0 20px 0',
  },
  refreshContainerError: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshLabelError: {
    margin: '0 4px 0 0',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  refreshButtonError: {
    padding: '2px',
  },
  refreshIconError: {
    width: '35px',
    height: '35px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  titleLiveSession: {
    color: mode === 'light' ? BRAND_COLOR_LIGHT : BRAND_COLOR_DARK,
    fontSize: '20px',
    textAlign: 'center',
  },
  liveSessionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  liveChip: {
    backgroundColor: BRAND_COLOR_LIGHT,
    color: TEXT_COLOR_REVERSED_LIGHT,
    fontWeight: 'bold',
    fontSize: '14px',
    borderRadius: '8px',
  },
});

export default getStyles;
