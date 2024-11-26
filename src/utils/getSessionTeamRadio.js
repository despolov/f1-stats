import { getSession, getTeamRadio, getDrivers } from '../api';

const setInternalProgress = (type, setProgress, progressValue) => {
  if (type === 'Practice 1') {
    if (progressValue === 1) {
      setProgress(10);
    } else if (progressValue === 2) {
      setProgress(15);
    }
  }
  if (type === 'Practice 2') {
    if (progressValue === 1) {
      setProgress(20);
    } else if (progressValue === 2) {
      setProgress(30);
    }
  }
  if (type === 'Practice 3') {
    if (progressValue === 1) {
      setProgress(35);
    } else if (progressValue === 2) {
      setProgress(45);
    }
  }
  if (type === 'Sprint Qualifying') {
    if (progressValue === 1) {
      setProgress(50);
    } else if (progressValue === 2) {
      setProgress(60);
    }
  }
  if (type === 'Sprint') {
    if (progressValue === 1) {
      setProgress(70);
    } else if (progressValue === 2) {
      setProgress(75);
    }
  }
  if (type === 'Qualifying') {
    if (progressValue === 1) {
      setProgress(80);
    } else if (progressValue === 2) {
      setProgress(90);
    }
  }
  if (type === 'Race') {
    if (progressValue === 1) {
      setProgress(95);
    } else if (progressValue === 2) {
      setProgress(100);
    }
  }
};

const getSessionTeamRadio = async (
  type,
  year,
  country,
  driverNumber,
  meetingKey,
  setError,
  getDriver,
  setProgress,
) => {
  const session = await getSession(type, country, year, meetingKey);
  setInternalProgress(type, setProgress, 1);

  if (session.hasError) {
    setError(session.message);
    return;
  }

  if (session.length === 0) {
    return null;
  }

  const { session_key: sessionKey } = session[0];
  const allTeamRadio = await getTeamRadio(sessionKey, driverNumber);
  setInternalProgress(type, setProgress, 2);

  if (allTeamRadio.hasError) {
    setError(allTeamRadio.message);
    return;
  }

  if (getDriver) {
    const drivers = await getDrivers(sessionKey, driverNumber);

    if (drivers.hasError) {
      setError(drivers.message);
      return;
    }

    return {
      stints: allTeamRadio,
      driver: drivers[0],
    };
  }

  return allTeamRadio;
};

export default getSessionTeamRadio;
