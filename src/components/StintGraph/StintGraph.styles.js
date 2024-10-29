const getStyles = () => ({
  defaultCompoundColor: '#808080',
  softCompoundColor: '#F90021',
  mediumCompoundColor: '#F3C302',
  hardCompoundColor: '#2F2D2B',
  intermediateCompoundColor: '#019D2E',
  wetCompoundColor: '#2F62A1',
  container: {
    display: 'flex',
    height: '26px',
  },
  containerMobile: {
    display: 'flex',
    height: '26px',
    margin: '0 0 5px 0',
  },
  line: {
    width: 'calc(100% - 24px)',
    margin: '0 0 0 -13px',
  },
  lineUsedTyres: {
    border: '2px dotted white',
  },
  tyreCircle: {
    zIndex: 1,
    height: '26px',
    width: '26px',
    backgroundColor: 'white',
    borderRadius: '50%',
  },
  lapsCircle: {
    height: '26px',
    width: '26px',
    textAlign: 'center',
    color: 'white',
    borderRadius: '50%',
    margin: '0 0 0 -13px',
  },
  tooltipStintText: {
    textAlign: 'center',
    fontWeight: 700,
  },
  tooltipBoldText: {
    fontWeight: 700,
  },
});

export default getStyles;
