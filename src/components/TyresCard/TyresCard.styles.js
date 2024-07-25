const getStyles = (mode) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '0 0 20px 0',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  containerMobile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '0 0 10px 0',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  infoIconContainer: {
    marginBottom: '-5px',
  },
  icon: {
    width: '20px',
    height: '20px',
  },
});

export default getStyles;
