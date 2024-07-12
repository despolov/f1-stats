const getStyles = () => ({
  container: {
    textAlign: 'center',
    alignContent: 'center',
    borderTop: '2px solid black',
    borderRight: '2px solid black',
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
    backgroundColor: 'white',
    top: '-12px',
    left: 0,
  },
  lapsCount: {
    height: '55px',
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
  },
});

export default getStyles;
