const getStyles = (mode) => ({
  container: {
    position: 'absolute',
  },
  circle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    paddingTop: '2px',
    fontWeight: 700,
    textAlign: 'center',
  },
  number: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
});

export default getStyles;
