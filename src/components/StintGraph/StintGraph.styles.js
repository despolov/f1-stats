import {
  DEFAULT_COMPOUND_COLOR,
  SOFT_COMPOUND_COLOR,
  MEDIUM_COMPOUND_COLOR,
  HARD_COMPOUND_COLOR_LIGHT,
  INTERMEDIATE_COMPOUND_COLOR,
  WET_COMPOUND_COLOR,
} from '../../constants/globalConsts';

const getStyles = () => ({
  defaultCompoundColor: DEFAULT_COMPOUND_COLOR,
  softCompoundColor: SOFT_COMPOUND_COLOR,
  mediumCompoundColor: MEDIUM_COMPOUND_COLOR,
  hardCompoundColor: HARD_COMPOUND_COLOR_LIGHT,
  intermediateCompoundColor: INTERMEDIATE_COMPOUND_COLOR,
  wetCompoundColor: WET_COMPOUND_COLOR,
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
