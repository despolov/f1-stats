const getStyles = (mode) => ({
  tableContainer: {
    width: '50%',
    backgroundColor: '#1E1E1E',
  },
  tableCellHeader: {
    backgroundColor: '#363030',
    color: mode === 'light' ? '#ffffff' : '#E2E2E2',
    padding: '16px 8px',
  },
  tableCellBody: {
    padding: '8px',
    fontSize: 14,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
    borderBottom: mode === 'light' ? '1px solid #e0e0e0' : '1px solid #929292',
  },
  tableRowOdd: {
    backgroundColor: '#f4f4f4',
  },
  tableRowOddDark: {
    backgroundColor: '#494949',
  },
  tableRowLast: {
    border: 0,
  },
  titleContainer: {
    padding: '5px 0',
    backgroundColor: '#000000',
    borderBottom: '1px solid white',
    display: 'flex',
    justifyContent: 'center',
  },
  tableTitle: {
    margin: 0,
    color: mode === 'light' ? '#ffffff' : '#E2E2E2',
  },
  driverCellContainer: {
    display: 'flex',
  },
  driverCellColor: {
    marginRight: '5px',
  },
});

export default getStyles;
