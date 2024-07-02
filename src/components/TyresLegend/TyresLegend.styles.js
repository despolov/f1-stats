const getStyles = () => ({
  container: {
    width: '262px',
    height: '230px',
    border: '1px solid grey',
    borderRadius: '8px',
  },
  titleContainer: {
    padding: '5px',
    backgroundColor: 'black',
    color: 'white',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderTopLeftRadius: '7px',
    borderTopRightRadius: '7px',
    textAlign: 'center',
  },
  title: {
    fontSize: '16px',
  },
  tyresRow: {
    display: 'flex',
    gap: '10px',
    padding: '10px',
    alignItems: 'center',
  },
  tyresRowInline: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',
    margin: '0 0 20px 0',
  },
  softLabel: {
    color: '#F90021',
  },
  mediumLabel: {
    color: '#F3C302',
  },
  intermediateLabel: {
    color: '#019D2E',
  },
  wetLabel: {
    color: '#2F62A1',
  },
});

export default getStyles;
