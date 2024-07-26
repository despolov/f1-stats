const getStyles = (mode) => ({
  parentContainer: {
    padding: '20px',
    backgroundColor: mode === 'light' ? '#ffffff' : '#1E1E1E',
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
  progressLoader: {
    marginTop: '20px',
  },
  title: {
    margin: '0 0 10px 0',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  goBackButton: {
    minWidth: '250px',
  },
});

export default getStyles;
