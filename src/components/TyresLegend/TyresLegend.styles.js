import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  SOFT_COMPOUND_COLOR,
  MEDIUM_COMPOUND_COLOR,
  INTERMEDIATE_COMPOUND_COLOR,
  WET_COMPOUND_COLOR,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  container: {
    width: '262px',
    height: '230px',
    border: '1px solid grey',
    borderRadius: '8px',
  },
  titleContainer: {
    padding: '5px',
    backgroundColor: 'black',
    color: 'white',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderTopLeftRadius: '7px',
    borderTopRightRadius: '7px',
    textAlign: 'center',
  },
  title: {
    fontSize: '16px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  tyresRow: {
    display: 'flex',
    gap: '10px',
    padding: '10px',
    alignItems: 'center',
  },
  tyresRowInline: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',
    margin: '0 0 20px 0',
  },
  softLabel: {
    color: SOFT_COMPOUND_COLOR,
  },
  mediumLabel: {
    color: MEDIUM_COMPOUND_COLOR,
  },
  hardLabel: {
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  intermediateLabel: {
    color: INTERMEDIATE_COMPOUND_COLOR,
  },
  wetLabel: {
    color: WET_COMPOUND_COLOR,
  },
  containerImage: {
    textAlign: 'center',
    margin: '0 0 40px 0',
  },
  labelsContainerImage: {
    display: 'flex',
    justifyContent: 'center',
    gap: '52px',
    marginTop: '-20px',
  },
  containerImageMobile: {
    textAlign: 'center',
    margin: '0 0 20px 0',
  },
  labelsContainerImageMobile: {
    display: 'flex',
    justifyContent: 'space-evenly',
    gap: '12px',
    marginTop: '-7px',
  },
  allTyresImg: {
    objectFit: 'cover',
  },
});

export default getStyles;
