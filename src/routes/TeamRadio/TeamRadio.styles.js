const getStyles = (mode) => ({
  parentContainer: {
    padding: '20px',
  },
  parentContainerMobile: {
    padding: '8px 8px 24px 8px',
  },
  parentContainerError: {
    textAlign: 'center',
  },
  parentContainerMobileError: {
    padding: '8px 8px 24px 8px',
  },
  errorMessage: {
    marginBottom: '20px',
  },
  title: {
    margin: '0 0 10px 0',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  titleError: {
    margin: '0 0 10px 0',
    color: mode === 'light' ? '#E10600' : '#870400',
    fontSize: '20px',
    textAlign: 'center',
  },
  description: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    textAlign: 'center',
  },
  divider: {
    borderBottom: mode === 'light' ? '2px solid #ffffff' : '2px solid #5a5a5a',
    margin: '20px 0 20px 0',
  },
  refreshContianerError: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshLabelError: {
    margin: '0 4px 0 0',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  refreshButtonError: {
    padding: '2px',
  },
  refreshIconError: {
    width: '35px',
    height: '35px',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
});

export default getStyles;
