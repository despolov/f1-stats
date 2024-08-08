const getStyles = (mode) => ({
  container: {
    textAlign: 'center',
  },
  progressTitle: {
    fontSize: '16px',
    margin: '0 5px 0 0',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    fontWight: 'normal',
  },
  progressValue: {
    fontSize: '18px',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    fontWeight: 'bold',
  },
  progressLabelContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 0 10px 0',
  },
});

export default getStyles;
