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
    height: '250px',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tyreCircleContainer: {
    display: 'flex',
    justifyContent: 'left',
    minWidth: '205px',
  },
  infoText: {
    margin: '0 0 30px 0',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  infoTextNoM: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  textsContainer: {
    textAlign: 'end',
    margin: '0 5px 0 0',
  },
  stintNumber: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    backgroundColor: mode === 'light' ? '#f7f4f1' : '#121212',
  },
});

export default getStyles;
