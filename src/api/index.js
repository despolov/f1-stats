import { uniqBy } from 'lodash';
import moment from 'moment';

const API_ENDPOINT = 'https://api.openf1.org/v1';

const getSession = async (type, country, year) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/sessions?country_name=${country}&session_name=${type}&year=${year}`,
    );
    const session = await response.json();

    return session;
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of the session (${type}) for year ${year} in ${country}!`,
    };
  }
};

const getDrivers = async (sessionKey) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/drivers?session_key=${sessionKey}`,
    );
    const drivers = await response.json();
    // guard because sometimes the api returns duplicated drivers
    const uniqueDrivers = uniqBy(drivers, (d) => d.name_acronym);

    return uniqueDrivers;
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of the drivers for session ${sessionKey}!`,
    };
  }
};

const getLapsForDriver = async (sessionKey, driverNumber) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/laps?session_key=${sessionKey}&driver_number=${driverNumber}&is_pit_out_lap=false`,
    );
    const lapsPerDriver = await response.json();

    return lapsPerDriver;
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of the laps of a driver with number ${driverNumber} for session ${sessionKey}!`,
    };
  }
};

const getLapsForSession = async (sessionKey) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/laps?session_key=${sessionKey}&is_pit_out_lap=false`,
    );
    const lapsPerSession = await response.json();

    return lapsPerSession;
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of the laps for session ${sessionKey}!`,
    };
  }
};

const getAllGrandPrix = async (year) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/meetings?year=${year}`);
    const allGrandPrix = await response.json();
    // guard because sometimes the api returns duplicated grand prixs
    const uniqueAllGrandPrix = uniqBy(allGrandPrix, (p) => p.circuit_key);

    return uniqueAllGrandPrix;
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of the grand prix for year ${year}!`,
    };
  }
};

const getWeather = async (sessionKey, dateStart, dateEnd) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/weather?session_key=${sessionKey}`,
    );
    let weather = await response.json();

    if (dateStart && dateEnd && weather.length > 0) {
      weather = weather.filter((weatherRecord) =>
        moment(weatherRecord.date).isBetween(
          moment(dateStart),
          moment(dateEnd),
        ),
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
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of the weather for session ${sessionKey}, from ${dateStart} till ${dateEnd}!`,
    };
  }
};

const getStints = async (meetingKey) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/stints?meeting_key=${meetingKey}`,
    );
    const stints = await response.json();

    return stints;
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of the stints for meeting with key ${meetingKey}!`,
    };
  }
};

const getMeeting = async (country, year) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/meetings?year=${year}&country_name=${country}`,
    );
    const meeting = await response.json();

    return meeting;
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of a meeting in country ${country}, for year ${year}!`,
    };
  }
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
