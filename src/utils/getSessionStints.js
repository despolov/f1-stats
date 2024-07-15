import { getSession, getStints, getDrivers } from '../api';
import moment from 'moment';

const getSessionStints = async (
  type,
  year,
  country,
  driverNumber,
  setError,
  getDriver,
) => {
  const session = await getSession(type, country, year);

  if (session.hasError) {
    setError(session.message);
    return;
  }

  if (session.length === 0) {
    return null;
  }

  const {
    session_key: sessionKey,
    date_start: dateStart,
    date_end: dateEnd,
  } = session[0];
  const startDate = moment(dateStart);
  const endDate = moment(dateEnd);
  const isLive = moment().isBetween(startDate, endDate);
  const allStints = await getStints(sessionKey, isLive, driverNumber);

  if (allStints.hasError) {
    setError(allStints.message);
    return;
  }

  if (getDriver) {
    const drivers = await getDrivers(sessionKey, isLive, driverNumber);

    if (drivers.hasError) {
      setError(drivers.message);
      return;
    }

    return {
      stints: allStints,
      driver: drivers[0],
    };
  }

  return allStints;
};

export default getSessionStints;
