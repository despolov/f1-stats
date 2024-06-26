const getStyles = () => ({
  singleWeatherContainer: {
    margin: '5px 0 0 0',
    borderRight: '2px solid #f7f4f1',
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
  },
});

export default getStyles;
