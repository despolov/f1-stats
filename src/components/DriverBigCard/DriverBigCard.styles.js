import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  TEXT_COLOR_SECONDARY_LIGHT,
} from '../../constants/globalConsts';

const getStyles = (mode) => ({
  container: {
    display: 'flex',
    gap: '150px',
    marginBottom: '40px',
    justifyContent: 'center',
  },
  containerMobile: {
    display: 'flex',
    marginBottom: '30px',
    justifyContent: 'space-between',
  },
  nameContainer: {
    display: 'flex',
    marginBottom: '10px',
  },
  nameColorStripe: {
    marginRight: '5px',
  },
  firstName: {
    fontSize: '24px',
    marginRight: '5px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  lastName: {
    fontSize: '24px',
    fontWeight: 600,
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  teamName: {
    color: TEXT_COLOR_SECONDARY_LIGHT,
    fontSize: '16px',
    textAlign: 'left',
  },
  driverNumber: {
    fontWeight: 600,
    fontSize: '28px',
  },
  iconPerson: {
    width: '100px',
    height: '100px',
  },
  additionalInfoContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '10px',
  },
  flag: {
    width: '45px',
    height: '34px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    margin: '4px 0 0 0',
  },
  headshotContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  headshotImg: {
    width: `100px`,
    height: `100px`,
  },
});

export default getStyles;
