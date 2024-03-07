const getStyles = () => ({
  parentContainer: {
    padding: '20px',
    backgroundColor: '#ffffff',
  },
  selectFieldsContainer: {
    display: 'flex',
    gap: '10px',
  },
  tableContainer: {
    display: 'flex',
    gap: '10px',
    padding: '20px 0 0 0',
  },
  practiceContainer: {
    marginTop: '20px',
  },
  practiceTitle: {
    margin: 0,
  },
  divider: {
    borderBottom: '2px solid #f7f4f1',
    margin: '20px 0 20px 0',
  },
  circularProgress: {
    marginTop: '20px',
  },
  selectFieldsContainerMobile: {
    flexFlow: 'column',
  },
  tableContainerMobile: {
    flexFlow: 'column',
  },
  practiceSubTitleH5: {
    margin: '5px 0 0 0',
    borderRight: '2px solid #f7f4f1',
    '&:last-child': { borderRight: 'none' },
  },
  icons: {
    verticalAlign: 'middle',
    width: '19px',
    height: '19px',
  },
  weatherContainer: {
    display: 'flex',
    // gap: '10px',
  },
  practiceSubTitleH4: {
    margin: 0,
  },
});

export default getStyles;
