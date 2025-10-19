import {
  BRAND_COLOR_LIGHT,
  BRAND_COLOR_DARK,
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  TEXT_COLOR_SECONDARY_LIGHT,
  TEXT_COLOR_SECONDARY_DARK,
  BACKGROUND_COLOR_PURE_LIGHT,
  PAPER_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  title: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  titleContainer: {
    marginBottom: '20px',
  },
  subTitle: {
    color:
      mode === 'light' ? TEXT_COLOR_SECONDARY_LIGHT : TEXT_COLOR_SECONDARY_DARK,
    fontStyle: 'italic',
    marginBottom: '20px',
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
  statValue: {
    color: mode === 'light' ? BRAND_COLOR_LIGHT : BRAND_COLOR_DARK,
  },
  statCaption: {
    color:
      mode === 'light' ? TEXT_COLOR_SECONDARY_LIGHT : TEXT_COLOR_SECONDARY_DARK,
    fontSize: '0.7rem',
    lineHeight: '2.1',
  },
  chartPointsContainer: {
    display: 'flex',
    alignItems: 'end',
    gap: '4px',
  },
  chartSection: {
    marginBottom: '20px',
  },
  chartTitle: {
    marginBottom: '15px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  chartContainer: {
    width: '100%',
    height: 600,
    marginBottom: '20px',
  },
  helpText: {
    color:
      mode === 'light' ? TEXT_COLOR_SECONDARY_LIGHT : TEXT_COLOR_SECONDARY_DARK,
    fontStyle: 'italic',
    marginBottom: '10px',
  },
  emptyState: {
    padding: '40px',
  },
  emptyStateText: {
    color:
      mode === 'light' ? TEXT_COLOR_SECONDARY_LIGHT : TEXT_COLOR_SECONDARY_DARK,
  },
});

export default getStyles;
