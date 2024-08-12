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
  goBackButton: {
    minWidth: '250px',
  },
  titleError: {
    margin: 0,
    color: mode === 'light' ? '#E10600' : '#870400',
    fontSize: '20px',
    textAlign: 'center',
  },
});

export default getStyles;
