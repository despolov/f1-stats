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
  practiceContainer: {
    marginTop: '20px',
  },
  title: {
    margin: 0,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  divider: {
    borderBottom: mode === 'light' ? '2px solid #ffffff' : '2px solid #5a5a5a',
    margin: '20px 0 20px 0',
  },
  progressLoader: {
    marginTop: '20px',
  },
  tableContainerMobile: {
    flexFlow: 'row',
  },
  description: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
});

export default getStyles;
