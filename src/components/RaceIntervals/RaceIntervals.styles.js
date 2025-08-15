const getStyles = (mode) => ({
  container: {
    // Main container styles if needed
  },
  title: {
    marginBottom: '20px',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  statsContainer: {
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: mode === 'light' ? '#f5f5f5' : '#2a2a2a',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    marginBottom: '20px',
  },
  chartSection: {
    marginBottom: '30px',
  },
  chartTitle: {
    marginBottom: '15px',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
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
