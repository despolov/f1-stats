const getStyles = (mode) => ({
  softCompoundColor: '#F90021',
  mediumCompoundColor: '#F3C302',
  hardCompoundColor: mode === 'light' ? '#2F2D2B' : '#6d6c6b',
  intermediateCompoundColor: '#019D2E',
  wetCompoundColor: '#2F62A1',
  softCompoundColorRgba: 'rgb(249, 0, 33, 0.1)',
  mediumCompoundColorRgba: 'rgb(243, 195, 2, 0.1)',
  hardCompoundColorRgba:
    mode === 'light' ? 'rgb(47, 45, 43, 0.1)' : 'rgb(109, 108, 107, 0.1)',
  intermediateCompoundColorRgba: 'rgb(1, 157, 46, 0.1)',
  wetCompoundColorRgba: 'rgb(47, 98, 161, 0.1)',
  container: {
    padding: '5px 5px 5px 0',
    borderTop: `2px solid ${mode === 'light' ? '#000000' : '#E2E2E2'}`,
    borderRight: `2px solid ${mode === 'light' ? '#000000' : '#E2E2E2'}`,
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '0',
    borderTopLeftRadius: '0',
    marginBottom: '40px',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '1.17em',
    fontWeight: 'bold',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  subTitle: {
    margin: '0 0 5px 0',
    fontWeight: 400,
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  titleContainer: {
    display: 'flex',
    gap: '6px',
  },
  subTitleContainer: {
    lineHeight: '27.5px',
    fontWeight: 700,
  },
  stintsContainer: {
    margin: '10px 0 20px 0',
  },
  stintsGraphContainer: {
    display: 'flex',
    width: '100%',
    margin: '10px 0 0 0',
    gap: '2px',
  },
  stintsGraphContainerMobile: {
    width: '100%',
    margin: '10px 0 0 0',
  },
  stintsBreakDownTitle: {
    margin: '0',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  stintCardsContainer: {
    display: 'flex',
    gap: '45px',
    flexWrap: 'wrap',
  },
  accordionDetails: {
    padding: '20px',
    border: 'none',
  },
  accordionSummary: {
    padding: '0',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-content': {
      marginLeft: '10px',
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
  },
  accordion: {
    padding: '0',
    backgroundColor: 'transparent',
    border: '2px solid #E2E2E2',
    borderLeft: 'transparent',
    borderRight: 'transparent',
    borderBottom: 'transparent',
    boxShadow: 'none',
    '&::before': {
      display: 'none',
    },
  },
  expandIcon: {
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
});

export default getStyles;
