const getStyles = () => ({
  softCompoundColor: '#F90021',
  mediumCompoundColor: '#F3C302',
  hardCompoundColor: '#2F2D2B',
  intermediateCompoundColor: '#019D2E',
  wetCompoundColor: '#2F62A1',
  softCompoundColorRgba: 'rgb(249, 0, 33, 0.1)',
  mediumCompoundColorRgba: 'rgb(243, 195, 2, 0.1)',
  hardCompoundColorRgba: 'rgb(47, 45, 43, 0.1)',
  intermediateCompoundColorRgba: 'rgb(1, 157, 46, 0.1)',
  wetCompoundColorRgba: 'rgb(47, 98, 161, 0.1)',
  title: {
    margin: '0 0 10px 0',
  },
  subTitle: {
    margin: '0 0 5px 0',
  },
  titleContainer: {
    display: 'flex',
    gap: '6px',
  },
  subTitleContainer: {
    lineHeight: '27.5px',
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
  stintsBreakDownTitle: {
    margin: '0',
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
  },
  accordion: {
    padding: '0',
    border: '2px solid #f7f4f1',
    borderLeft: 'transparent',
    borderRight: 'transparent',
    boxShadow: 'none',
    '&::before': {
      display: 'none',
    },
  },
});

export default getStyles;
