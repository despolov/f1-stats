const getStyles = (mode) => ({
  singleWeatherContainer: {
    margin: '5px 0 0 0',
    borderRight: mode === 'light' ? '2px solid #ffffff' : '2px solid #5a5a5a',
    '&:last-child': { borderRight: 'none' },
    padding: '0 10px 0 0',
  },
  singleWeatherContainerMobile: {
    margin: '5px 0 0 0',
  },
  container: {
    display: 'flex',
    marginTop: '10px',
    fontSize: '14px',
    gap: '10px',
  },
  containerMobile: {
    display: 'flex',
    marginTop: '10px',
    fontSize: '14px',
    justifyContent: 'space-between',
  },
  icons: {
    verticalAlign: 'middle',
    width: '19px',
    height: '19px',
  },
  weatherValue: {
    fontWeight: 400,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
});

export default getStyles;
