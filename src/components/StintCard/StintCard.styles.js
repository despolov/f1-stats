const getStyles = (mode) => ({
  container: {
    textAlign: 'center',
    alignContent: 'center',
    borderTop: `2px solid ${mode === 'light' ? '#000000' : '#E2E2E2'}`,
    borderRight: `2px solid ${mode === 'light' ? '#000000' : '#E2E2E2'}`,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '0',
    borderTopLeftRadius: '0',
    position: 'relative',
    width: '450px',
    height: '300px',
  },
  stintNumber: {
    position: 'absolute',
    margin: 0,
    fontWeight: 700,
    fontSize: '16px',
    padding: '0 7px 0 0',
    top: '-12px',
    left: 0,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    backgroundColor: mode === 'light' ? '#f7f4f1' : '#121212',
  },
  lapsCount: {
    height: '55px',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  lapStart: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  lapEnd: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  tyreCircleContainer: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '250px',
  },
  tyreAgeContainer: {
    height: '55px',
    display: 'flex',
    justifyContent: 'center',
  },
  tyreAge: {
    alignSelf: 'flex-end',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
});

export default getStyles;
