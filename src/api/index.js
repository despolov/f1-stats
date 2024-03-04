const API_ENDPOINT = 'https://api.openf1.org/v1';

// TODO: add try catch block on each api endpoint

const getSession = async (type, country, year) => {
  const response = await fetch(
    `${API_ENDPOINT}/sessions?country_name=${country}&session_name=${type}&year=${year}`,
  );
  const session = await response.json();

  return session;
};

const getDrivers = async (sessionKey) => {
  const response = await fetch(
    `${API_ENDPOINT}/drivers?session_key=${sessionKey}`,
  );
  const drivers = await response.json();

  return drivers;
};

const getLapsForDriver = async (sessionKey, driverNumber) => {
  const response = await fetch(
    `${API_ENDPOINT}/laps?session_key=${sessionKey}&driver_number=${driverNumber}`,
  );
  const lapsPerDriver = await response.json();

  return lapsPerDriver;
};

const getAllGrandPrix = async (year) => {
  const response = await fetch(`${API_ENDPOINT}/meetings?year=${year}`);
  const allGrandPrix = await response.json();

  return allGrandPrix;
};

export { getSession, getDrivers, getLapsForDriver, getAllGrandPrix };
