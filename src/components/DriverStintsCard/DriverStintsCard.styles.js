const getStyles = (mode) => ({
  container: {
    display: 'flex',
    gap: '150px',
    marginBottom: '40px',
    justifyContent: 'center',
  },
  containerMobile: {
    display: 'flex',
    marginBottom: '30px',
    justifyContent: 'space-between',
  },
  nameContainer: {
    display: 'flex',
    marginBottom: '10px',
  },
  nameColorStripe: {
    marginRight: '5px',
  },
  firstName: {
    fontSize: '24px',
    marginRight: '5px',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  lastName: {
    fontSize: '24px',
    fontWeight: 600,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  teamName: {
    color: '#67676D',
    fontSize: '16px',
    textAlign: 'left',
  },
  driverNumber: {
    fontWeight: 600,
    fontSize: '28px',
  },
  iconPerson: {
    width: '100px',
    height: '100px',
  },
  additionalInfoContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '10px',
  },
  flag: {
    width: '45px',
    height: '34px',
    border: '1px solid black',
    borderRadius: '4px',
    margin: '4px 0 0 0',
  },
  headshotContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  headshotImg: {
    width: `100px`,
    height: `100px`,
  },
});

export default getStyles;
