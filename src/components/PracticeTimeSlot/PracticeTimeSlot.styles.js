const getStyles = (mode) => ({
  title: {
    margin: 0,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  iconLive: {
    color: 'red',
    width: '25px',
    height: '25px',
    marginBottom: '-6px',
  },
});

export default getStyles;
