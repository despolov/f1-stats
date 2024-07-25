const getStyles = (mode) => ({
  nameContainer: {
    display: 'flex',
    marginBottom: '10px',
  },
  nameColorStripe: {
    marginRight: '5px',
  },
  firstName: {
    marginRight: '5px',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  lastName: {
    fontWeight: 600,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  teamName: {
    color: '#67676D',
    fontSize: '12px',
  },
  driverNumber: {
    fontWeight: 600,
    fontSize: '28px',
  },
  iconPerson: {
    width: '93px',
    height: '93px',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
});

export default getStyles;
