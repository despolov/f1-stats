import {
  BRAND_COLOR_LIGHT,
  BRAND_COLOR_DARK,
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  BORDER_COLOR_LIGHT,
  BORDER_COLOR_DARK,
  BORDER_COLOR_REVERSED_LIGHT,
  BORDER_COLOR_REVERSED_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  parentContainer: {
    padding: '16px',
  },
  parentContainerMobile: {
    padding: '8px 8px 24px 8px',
  },
  tableContainer: {
    display: 'flex',
    gap: '10px',
    padding: '20px 0 0 0',
  },
  tableContainerMobile: {
    flexFlow: 'row',
  },
  chartContainer: {
    display: 'flex',
    gap: '10px',
    padding: '20px 0 0 0',
  },
  chartContainerMobile: {
    flexFlow: 'column',
  },
  practiceContainer: {
    margin: '20px 0 40px 0',
    borderTop: `2px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderRight: `2px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '0',
    borderTopLeftRadius: '0',
    padding: '10px 10px 0 0',
  },
  title: {
    margin: 0,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    fontWeight: 600,
    fontSize: '18px',
  },
  divider: {
    borderBottom:
      mode === 'light'
        ? `2px solid ${BORDER_COLOR_REVERSED_LIGHT}`
        : `2px solid ${BORDER_COLOR_REVERSED_DARK}`,
    margin: '20px 0 20px 0',
  },
  description: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    textAlign: 'center',
  },
  titleError: {
    margin: '0 0 10px 0',
    color: mode === 'light' ? BRAND_COLOR_LIGHT : BRAND_COLOR_DARK,
    fontSize: '20px',
    textAlign: 'center',
  },
  subTitleError: {
    margin: '0 0 10px 0',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    textAlign: 'center',
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
  practiceDataContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
});

export default getStyles;
