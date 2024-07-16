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
  },
  textsContainer: {
    textAlign: 'end',
    margin: '0 5px 0 0',
  },
});

export default getStyles;
