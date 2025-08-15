const getStyles = (mode) => ({
  title: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  titleContainer: {
    marginBottom: '20px',
  },
  subTitle: {
    color: mode === 'light' ? '#666666' : '#aaaaaa',
    fontStyle: 'italic',
    marginBottom: '20px',
  },
  statsContainer: {
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: mode === 'light' ? '#f5f5f5' : '#2a2a2a',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    marginBottom: '20px',
  },
  statValue: {
    color: mode === 'light' ? '#E10600' : '#870400',
  },
  statCaption: {
    color: mode === 'light' ? '#666666' : '#aaaaaa',
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
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  chartContainer: {
    width: '100%',
    height: 600,
    marginBottom: '20px',
  },
  helpText: {
    color: mode === 'light' ? '#666666' : '#aaaaaa',
    fontStyle: 'italic',
    marginBottom: '10px',
  },
  emptyState: {
    padding: '40px',
  },
  emptyStateText: {
    color: mode === 'light' ? '#666666' : '#aaaaaa',
  },
});

export default getStyles;
