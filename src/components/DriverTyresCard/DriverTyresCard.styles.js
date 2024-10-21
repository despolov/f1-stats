const getStyles = (mode) => ({
  container: {
    border: '1px solid grey',
    borderRadius: '8px',
    padding: '20px',
    minWidth: '400px',
    backgroundColor: mode === 'light' ? '#ffffff' : '#2e2e2e',
  },
  containerMobile: {
    border: '1px solid grey',
    borderRadius: '8px',
    padding: '10px',
    minWidth: '100%',
    backgroundColor: mode === 'light' ? '#ffffff' : '#2e2e2e',
  },
  allStintsButton: {
    fontSize: '13px',
    backgroundColor: mode === 'light' ? '#333333' : '#808080',
    '&:hover': {
      backgroundColor: mode === 'light' ? '#4d4d4d' : '#999999',
    },
  },
});

export default getStyles;
