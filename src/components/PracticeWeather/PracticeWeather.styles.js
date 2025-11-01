import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  BORDER_COLOR_REVERSED_LIGHT,
  BORDER_COLOR_REVERSED_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  singleWeatherContainer: {
    margin: '5px 0 0 0',
    borderRight:
      mode === 'light'
        ? `2px solid ${BORDER_COLOR_REVERSED_LIGHT}`
        : `2px solid ${BORDER_COLOR_REVERSED_DARK}`,
    '&:last-child': { borderRight: 'none' },
    padding: '0 10px 0 0',
  },
  singleWeatherContainerMobile: {
    margin: '5px 0 0 0',
  },
  container: {
    display: 'flex',
    marginTop: '10px',
    fontSize: '14px',
    gap: '10px',
  },
  containerMobile: {
    display: 'flex',
    marginTop: '10px',
    fontSize: '14px',
    justifyContent: 'space-between',
  },
  icons: {
    verticalAlign: 'middle',
    width: '19px',
    height: '19px',
  },
  weatherValue: {
    fontWeight: 400,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  weatherLoadingText: {
    fontSize: '0.875rem',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    opacity: 0.7,
  },
  noDataText: {
    fontSize: '0.875rem',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
});

export default getStyles;
