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
  BORDER_COLOR_LIGHT,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  tableContainer: {
    width: '50%',
    backgroundColor:
      mode === 'light' ? BACKGROUND_COLOR_PURE_LIGHT : BACKGROUND_COLOR_DARK_2,
  },
  tableCellHeader: {
    backgroundColor: BACKGROUND_COLOR_DARK_6,
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
    padding: '16px 0',
    fontSize: '12px',
  },
  tableCellBody: {
    padding: '8px 0',
    fontSize: 14,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
    borderBottom:
      mode === 'light'
        ? `1px solid ${BORDER_COLOR_DARK}`
        : `1px solid ${BORDER_COLOR_REVERSED_DARK_3}`,
  },
  emptyHeaderCell: {
    backgroundColor: BACKGROUND_COLOR_DARK_6,
    padding: '0',
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
    border: `1px solid ${BORDER_COLOR_LIGHT}`,
    borderBottom: `2px solid ${BORDER_COLOR_REVERSED_LIGHT}`,
    display: 'flex',
    justifyContent: 'center',
  },
  tableTitle: {
    margin: 0,
    fontSize: '0.83em',
    fontWeight: 'bold',
    color: mode === 'light' ? TEXT_COLOR_REVERSED_LIGHT : TEXT_COLOR_DARK,
  },
  driverCellContainer: {
    display: 'flex',
  },
  driverCellColor: {
    marginRight: '5px',
  },
  tooltipText: {
    fontSize: '12px',
  },
  tableCellBodyText: {
    fontSize: '12px',
  },
  iconContainer: {
    marginBottom: '-4px',
  },
});

export default getStyles;
