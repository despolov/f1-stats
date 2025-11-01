import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_REVERSED_LIGHT,
  TEXT_COLOR_DARK,
  BACKGROUND_COLOR_PURE_LIGHT,
  BACKGROUND_COLOR_PURE_DARK,
  BORDER_COLOR_REVERSED_LIGHT,
  BACKGROUND_COLOR_DARK_2,
  BACKGROUND_COLOR_DARK_6,
  BACKGROUND_COLOR_LIGHT_2,
  BACKGROUND_COLOR_DARK_7,
  BORDER_COLOR_DARK,
  BORDER_COLOR_REVERSED_DARK_3,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  tableContainer: {
    width: '50%',
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_PURE_LIGHT : BACKGROUND_COLOR_DARK_2,
    overflowX: 'auto',
  },
  tableCellHeader: {
    backgroundColor: BACKGROUND_COLOR_DARK_6,
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
    padding: '16px 8px',
    height: '53px',
    maxHeight: '53px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  tableCellBody: {
    padding: '8px',
    fontSize: 14,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    borderBottom:
      mode === 'light'
        ? `1px solid ${BORDER_COLOR_DARK}`
        : `1px solid ${BORDER_COLOR_REVERSED_DARK_3}`,
    height: '37px',
    maxHeight: '37px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  tableRowOdd: {
    backgroundColor: BACKGROUND_COLOR_LIGHT_2,
  },
  tableRowOddDark: {
    backgroundColor: BACKGROUND_COLOR_DARK_7,
  },
  tableRowLast: {
    border: 0,
  },
  titleContainer: {
    padding: '5px 0',
    backgroundColor: BACKGROUND_COLOR_PURE_DARK,
    borderBottom: `1px solid ${BORDER_COLOR_REVERSED_LIGHT}`,
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tableTitle: {
    margin: 0,
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
  },
  driverCellContainer: {
    display: 'flex',
  },
  driverCellColor: {
    marginRight: '5px',
  },
});

export default getStyles;
