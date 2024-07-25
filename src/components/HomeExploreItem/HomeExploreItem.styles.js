const getStyles = (mode) => ({
  container: {
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: mode === 'light' ? '#ffffff' : '#1E1E1E',
    width: '30%',
    minHeight: '160px',
    cursor: 'pointer',
    boxShadow: `0px 2px 1px -1px ${
      mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'
    }, 0px 1px 1px 0px ${
      mode === 'light' ? 'rgba(0, 0, 0, 0.14)' : 'rgba(255, 255, 255, 0.14)'
    }, 0px 1px 3px 0px ${
      mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)'
    }`,
  },
  containerMobile: {
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: mode === 'light' ? '#ffffff' : '#1E1E1E',
    width: '100%',
    minHeight: '160px',
    cursor: 'pointer',
    boxShadow:
      '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    textAlign: 'center',
    margin: '0 0 15px 0',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  icon: {
    width: '40px',
    height: '40px',
    margin: '0 10px -10px 0',
  },
  description: {
    fontSize: '14px',
    fontWeight: 400,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
});

export default getStyles;
