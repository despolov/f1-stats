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
    fontWeight: 600,
  },
  divider: {
    borderBottom: mode === 'light' ? '2px solid #ffffff' : '2px solid #5a5a5a',
    margin: '20px 0 20px 0',
  },
  tableContainerMobile: {
    flexFlow: 'row',
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
