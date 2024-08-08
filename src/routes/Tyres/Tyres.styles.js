const getStyles = (mode) => ({
  parentContainer: {
    padding: '16px',
  },
  parentContainerMobile: {
    padding: '8px 8px 24px 8px',
  },
  progressLoader: {
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
  subTitle: {
    margin: '0 0 10px 0',
    fontWeight: 600,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    textAlign: 'center',
  },
  statsContainer: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsContainerMobile: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  description: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    textAlign: 'center',
  },
  titleError: {
    margin: 0,
    color: mode === 'light' ? '#E10600' : '#870400',
    fontSize: '20px',
    textAlign: 'center',
  },
  subTitleError: {
    margin: 0,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    textAlign: 'center',
  },
});

export default getStyles;
