import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  TEXT_COLOR_SECONDARY_LIGHT,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  nameContainer: {
    display: 'flex',
    marginBottom: '10px',
  },
  nameColorStripe: {
    marginRight: '5px',
  },
  firstName: {
    marginRight: '5px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  lastName: {
    fontWeight: 600,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  teamName: {
    color: TEXT_COLOR_SECONDARY_LIGHT,
    fontSize: '12px',
  },
  driverNumber: {
    fontWeight: 600,
    fontSize: '28px',
  },
  iconPerson: {
    width: '93px',
    height: '93px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
});

export default getStyles;
