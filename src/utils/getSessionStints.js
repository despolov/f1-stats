import { getSession, getStints, getDrivers } from '../api';

const setInternalProgress = (type, setProgress, progressValue) => {
  if (type === 'Practice 1') {
    if (progressValue === 1) {
      setProgress(10);
    } else if (progressValue === 2) {
      setProgress(20);
    }
  }
  if (type === 'Practice 2') {
    if (progressValue === 1) {
      setProgress(25);
    } else if (progressValue === 2) {
      setProgress(35);
    }
  }
  if (type === 'Practice 3') {
    if (progressValue === 1) {
      setProgress(40);
    } else if (progressValue === 2) {
      setProgress(50);
    }
  }
  if (type === 'Sprint Qualifying') {
    if (progressValue === 1) {
      setProgress(60);
    } else if (progressValue === 2) {
      setProgress(70);
    }
  }
  if (type === 'Sprint') {
    if (progressValue === 1) {
      setProgress(80);
    } else if (progressValue === 2) {
      setProgress(85);
    }
  }
  if (type === 'Qualifying') {
    if (progressValue === 1) {
      setProgress(90);
    } else if (progressValue === 2) {
      setProgress(100);
    }
  }
};

const getSessionStints = async (
  type,
  year,
  country,
  driverNumber,
  setError,
  getDriver,
  setProgress,
) => {
  const session = await getSession(type, country, year);
  setInternalProgress(type, setProgress, 1);

  if (session.hasError) {
    setError(session.message);
    return;
  }

  if (session.length === 0) {
    return null;
  }

  const { session_key: sessionKey } = session[0];
  const allStints = await getStints(sessionKey, driverNumber);
  setInternalProgress(type, setProgress, 2);

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
