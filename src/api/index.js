import { uniqBy } from 'lodash';
import moment from 'moment';

const API_ENDPOINT = 'https://api.openf1.org/v1';

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
  // guard because sometimes the api returns duplicated drivers
  const uniqueDrivers = uniqBy(drivers, (d) => d.name_acronym);

  return uniqueDrivers;
};

const getLapsForDriver = async (sessionKey, driverNumber) => {
  const response = await fetch(
    `${API_ENDPOINT}/laps?session_key=${sessionKey}&driver_number=${driverNumber}&is_pit_out_lap=false`,
  );
  const lapsPerDriver = await response.json();

  return lapsPerDriver;
};

const getLapsForSession = async (sessionKey) => {
  const response = await fetch(
    `${API_ENDPOINT}/laps?session_key=${sessionKey}&is_pit_out_lap=false`,
  );
  const lapsPerSession = await response.json();

  return lapsPerSession;
};

const getAllGrandPrix = async (year) => {
  const response = await fetch(`${API_ENDPOINT}/meetings?year=${year}`);
  const allGrandPrix = await response.json();
  // guard because sometimes the api returns duplicated grand prixs
  const uniqueAllGrandPrix = uniqBy(allGrandPrix, (p) => p.circuit_key);

  return uniqueAllGrandPrix;
};

const getWeather = async (sessionKey, dateStart, dateEnd) => {
  const response = await fetch(
    `${API_ENDPOINT}/weather?session_key=${sessionKey}`,
  );
  let weather = await response.json();

  if (dateStart && dateEnd && weather.length > 0) {
    weather = weather.filter((weatherRecord) =>
      moment(weatherRecord.date).isBetween(moment(dateStart), moment(dateEnd)),
    );
  }

  if (weather.length >= 3) {
    return [
      weather[0],
      weather[Math.round(weather.length / 2)],
      weather[weather.length - 1],
    ];
  } else if (weather.length > 0) {
    return [weather[0]];
  }

  return [];
};

const getStints = async (meetingKey) => {
  const response = await fetch(
    `${API_ENDPOINT}/stints?meeting_key=${meetingKey}`,
  );
  const stints = await response.json();

  return stints;
};

const getMeeting = async (country, year) => {
  const response = await fetch(
    `${API_ENDPOINT}/meetings?year=${year}&country_name=${country}`,
  );
  const meeting = await response.json();

  return meeting;
};

export {
  getSession,
  getDrivers,
  getLapsForDriver,
  getLapsForSession,
  getAllGrandPrix,
  getWeather,
  getStints,
  getMeeting,
};
