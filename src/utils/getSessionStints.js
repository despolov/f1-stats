import { getSession, getStints, getDrivers } from '../api';

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

  const { session_key: sessionKey } = session[0];
  const allStints = await getStints(sessionKey, driverNumber);

  if (allStints.hasError) {
    setError(allStints.message);
    return;
  }

  if (getDriver) {
    const drivers = await getDrivers(sessionKey, driverNumber);

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
