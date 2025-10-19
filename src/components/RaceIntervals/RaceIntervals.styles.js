import {
  BRAND_COLOR_LIGHT,
  BRAND_COLOR_DARK,
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  BACKGROUND_COLOR_PURE_LIGHT,
  PAPER_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  container: {
    // Main container styles if needed
  },
  title: {
    marginBottom: '20px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  statsContainer: {
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_PURE_LIGHT : PAPER_COLOR_DARK,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    marginBottom: '20px',
  },
  chartSection: {
    marginBottom: '30px',
  },
  chartTitle: {
    marginBottom: '15px',
    color: mode === 'light' ? BRAND_COLOR_LIGHT : BRAND_COLOR_DARK,
  },
  chartContainer: {
    width: '100%',
    height: 400,
  },
  totalDataPoints: {
    lineHeight: '2.1',
  },
  chartPointsContainer: {
    display: 'flex',
    alignItems: 'end',
    gap: '4px',
  },
});

export default getStyles;
