import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  SOFT_COMPOUND_COLOR,
  MEDIUM_COMPOUND_COLOR,
  HARD_COMPOUND_COLOR_LIGHT,
  HARD_COMPOUND_COLOR_DARK,
  INTERMEDIATE_COMPOUND_COLOR,
  WET_COMPOUND_COLOR,
  SOFT_COMPOUND_COLOR_RGBA,
  MEDIUM_COMPOUND_COLOR_RGBA,
  HARD_COMPOUND_COLOR_LIGHT_RGBA,
  HARD_COMPOUND_COLOR_DARK_RGBA,
  INTERMEDIATE_COMPOUND_COLOR_RGBA,
  WET_COMPOUND_COLOR_RGBA,
  BORDER_COLOR_LIGHT,
  BORDER_COLOR_DARK,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  softCompoundColor: SOFT_COMPOUND_COLOR,
  mediumCompoundColor: MEDIUM_COMPOUND_COLOR,
  hardCompoundColor:
    mode === 'light' ? HARD_COMPOUND_COLOR_LIGHT : HARD_COMPOUND_COLOR_DARK,
  intermediateCompoundColor: INTERMEDIATE_COMPOUND_COLOR,
  wetCompoundColor: WET_COMPOUND_COLOR,
  softCompoundColorRgba: SOFT_COMPOUND_COLOR_RGBA,
  mediumCompoundColorRgba: MEDIUM_COMPOUND_COLOR_RGBA,
  hardCompoundColorRgba:
    mode === 'light'
      ? HARD_COMPOUND_COLOR_LIGHT_RGBA
      : HARD_COMPOUND_COLOR_DARK_RGBA,
  intermediateCompoundColorRgba: INTERMEDIATE_COMPOUND_COLOR_RGBA,
  wetCompoundColorRgba: WET_COMPOUND_COLOR_RGBA,
  container: {
    padding: '5px 5px 5px 0',
    borderTop: `2px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderRight: `2px solid ${
      mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_DARK
    }`,
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '0',
    borderTopLeftRadius: '0',
    marginBottom: '40px',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '1.17em',
    fontWeight: 'bold',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  subTitle: {
    margin: '0 0 5px 0',
    fontWeight: 400,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  titleContainer: {
    display: 'flex',
    gap: '6px',
  },
  subTitleContainer: {
    lineHeight: '27.5px',
    fontWeight: 700,
  },
  stintsGraphContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    margin: '0 0 20px 0',
  },
  stintsGraphContainerMobile: {
    width: '100%',
    margin: '0 0 20px 0',
    gap: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  stintsBreakDownTitle: {
    margin: '0',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
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
    border: `2px solid ${BORDER_COLOR_DARK}`,
    borderLeft: 'transparent',
    borderRight: 'transparent',
    borderBottom: 'transparent',
    boxShadow: 'none',
    '&::before': {
      display: 'none',
    },
  },
  expandIcon: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
});

export default getStyles;
