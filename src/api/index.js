import { uniqBy } from 'lodash';
import moment from 'moment';
import {
  getSessionStorageValue,
  setSessionStorageValue,
} from '../utils/sessionStorage';
import {
  F1_API_ENDPOINT,
  IPAPI_API_ENDPOINT,
  F1_RACE_WEEK_DAYS,
} from '../constants/apiConsts';

const getSession = async (type, country, year) => {
  try {
    const key = `sessions?country_name=${country}&session_name=${type}&year=${year}`;
    const storageValue = getSessionStorageValue(key);
    let session;

    if (storageValue) {
      session = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      session = await response.json();
      setSessionStorageValue(key, session);
    }

    return session;
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of the session (${type}) for year ${year} in ${country}!`,
    };
  }
};

const getDrivers = async (sessionKey, driverNumber) => {
  try {
    const key = `drivers?session_key=${sessionKey}${
      driverNumber ? `&driver_number=${driverNumber}` : ''
    }`;
    const storageValue = getSessionStorageValue(key);
    let drivers;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      drivers = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      drivers = await response.json();
      setSessionStorageValue(key, drivers);
    }

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
      `${F1_API_ENDPOINT}/laps?session_key=${sessionKey}&driver_number=${driverNumber}&is_pit_out_lap=false`,
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
    const key = `laps?session_key=${sessionKey}&is_pit_out_lap=false`;
    const storageValue = getSessionStorageValue(key);
    let lapsPerSession;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      lapsPerSession = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      lapsPerSession = await response.json();
      setSessionStorageValue(key, lapsPerSession);
    }

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
    const response = await fetch(`${F1_API_ENDPOINT}/meetings?year=${year}`);
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
    const key = `weather?session_key=${sessionKey}`;
    const storageValue = getSessionStorageValue(key);
    let weather;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      weather = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      weather = await response.json();
      setSessionStorageValue(key, weather);
    }

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

const getStints = async (session_key, driverNumber) => {
  try {
    const key = `stints?session_key=${session_key}${
      driverNumber ? `&driver_number=${driverNumber}` : ''
    }`;
    const storageValue = getSessionStorageValue(key);
    let stints;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      stints = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      stints = await response.json();
      setSessionStorageValue(key, stints);
    }

    return stints;
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of the stints for session with key ${session_key}!`,
    };
  }
};

const getMeeting = async (country, year) => {
  try {
    const response = await fetch(
      `${F1_API_ENDPOINT}/meetings?year=${year}&country_name=${country}`,
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

const getIpLocation = async (date) => {
  try {
    const key = `ipLocation-${date}`;
    const storageValue = getSessionStorageValue(key);
    let ipLocation;

    if (storageValue) {
      ipLocation = storageValue;
    } else {
      const response = await fetch(IPAPI_API_ENDPOINT);
      ipLocation = await response.json();
      setSessionStorageValue(key, ipLocation);
    }

    return ipLocation;
  } catch {
    return {
      hasError: true,
      message: `There was an error with the fetch of the public ip and location of the user!`,
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
  getIpLocation,
};
