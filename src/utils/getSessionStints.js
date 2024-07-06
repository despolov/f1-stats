import { getSession, getStints } from '../api';
import moment from 'moment';

const getSessionTyreStats = async (
  type,
  year,
  country,
  driverNumber,
  setError,
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

  return allStints;
};

export default getSessionTyreStats;
