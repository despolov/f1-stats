import { uniqBy } from 'lodash';
import moment from 'moment';
import {
  getFromCache,
  setInCache,
  removeFromCache,
} from '../utils/cacheService';
import {
  F1_API_ENDPOINT,
  IPAPI_API_ENDPOINT,
  F1_RACE_WEEK_DAYS,
} from '../constants/apiConsts';

const getSession = async (type, country, year, meetingKey) => {
  const key = `sessions?country_name=${country}&session_name=${type}&year=${year}&meeting_key=${meetingKey}`;
  const errorPayload = {
    hasError: true,
    message: `There was an error with the fetch of the session (${type}) for year ${year} in ${country}!`,
  };

  try {
    const storageValue = getFromCache(key);
    let session;

    if (storageValue) {
      session = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      session = await response.json();

      setInCache(key, session);

      if (session.error) {
        removeFromCache(key);

        return errorPayload;
      }
    }

    return session;
  } catch {
    removeFromCache(key);

    return errorPayload;
  }
};

const getDrivers = async (sessionKey, driverNumber, meetingKey) => {
  const key = `drivers?${sessionKey ? `session_key=${sessionKey}` : ''}${
    driverNumber ? `&driver_number=${driverNumber}` : ''
  }${meetingKey ? `&meeting_key=${meetingKey}` : ''}`;
  const errorPayload = {
    hasError: true,
    message: `There was an error with the fetch of the drivers for session ${sessionKey}!`,
  };

  try {
    const storageValue = getFromCache(key);
    let drivers;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      drivers = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      drivers = await response.json();

      setInCache(key, drivers);
    }
    if (drivers.error) {
      removeFromCache(key);

      return errorPayload;
    }

    // guard because sometimes the api returns duplicated drivers
    const uniqueDrivers = uniqBy(drivers, (d) => d.name_acronym);

    return uniqueDrivers;
  } catch {
    removeFromCache(key);

    return errorPayload;
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
  const key = `laps?session_key=${sessionKey}&is_pit_out_lap=false`;
  const errorPayload = {
    hasError: true,
    message: `There was an error with the fetch of the laps for session ${sessionKey}!`,
  };

  try {
    const storageValue = getFromCache(key);
    let lapsPerSession;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      lapsPerSession = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      lapsPerSession = await response.json();

      setInCache(key, lapsPerSession);
    }

    if (lapsPerSession.error) {
      removeFromCache(key);

      return errorPayload;
    }

    return lapsPerSession;
  } catch {
    removeFromCache(key);

    return errorPayload;
  }
};

const getAllGrandPrix = async (year) => {
  const key = `meetings?year=${year}`;
  const errorPayload = {
    hasError: true,
    message: `There was an error with the fetch of the grand prix for year ${year}!`,
  };

  try {
    const storageValue = getFromCache(key);
    let allGrandPrix;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      allGrandPrix = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      allGrandPrix = await response.json();

      setInCache(key, allGrandPrix);

      if (allGrandPrix.error) {
        removeFromCache(key);
        return errorPayload;
      }
    }

    // guard because sometimes the api returns duplicated grand prixs
    const uniqueAllGrandPrix = uniqBy(allGrandPrix, (p) => p.meeting_key);

    return uniqueAllGrandPrix;
  } catch {
    removeFromCache(key);
    return errorPayload;
  }
};

const getWeather = async (sessionKey, dateStart, dateEnd) => {
  const key = `weather?session_key=${sessionKey}`;
  const errorPayload = {
    hasError: true,
    message: `There was an error with the fetch of the weather for session ${sessionKey}, from ${dateStart} till ${dateEnd}!`,
  };

  try {
    const storageValue = getFromCache(key);
    let weather;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      weather = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      weather = await response.json();

      setInCache(key, weather);
    }

    if (weather.error) {
      removeFromCache(key);

      return errorPayload;
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
    removeFromCache(key);

    return errorPayload;
  }
};

const getStints = async (session_key, driverNumber) => {
  const key = `stints?session_key=${session_key}${
    driverNumber ? `&driver_number=${driverNumber}` : ''
  }`;
  const errorPayload = {
    hasError: true,
    message: `There was an error with the fetch of the stints for session with key ${session_key}!`,
  };

  try {
    const storageValue = getFromCache(key);
    let stints;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      stints = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      stints = await response.json();

      setInCache(key, stints);
    }

    if (stints.error) {
      removeFromCache(key);

      return errorPayload;
    }

    return stints;
  } catch {
    removeFromCache(key);

    return errorPayload;
  }
};

const getIpLocation = async (date) => {
  const key = `ipLocation-${date}`;

  try {
    const storageValue = getFromCache(key);
    let ipLocation;

    if (storageValue) {
      ipLocation = storageValue;
    } else {
      const response = await fetch(IPAPI_API_ENDPOINT);
      ipLocation = await response.json();

      setInCache(key, ipLocation);
    }

    return ipLocation;
  } catch {
    removeFromCache(key);

    return {
      hasError: true,
      message: `There was an error with the fetch of the public ip and location of the user!`,
    };
  }
};

const getTeamRadio = async (session_key, driverNumber) => {
  const key = `team_radio?session_key=${session_key}${
    driverNumber ? `&driver_number=${driverNumber}` : ''
  }`;
  const errorPayload = {
    hasError: true,
    message: `There was an error with the fetch of the team radio for session with key ${session_key}!`,
  };

  try {
    const storageValue = getFromCache(key);
    let teamRadio;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      teamRadio = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      teamRadio = await response.json();

      setInCache(key, teamRadio);
    }

    if (teamRadio.error) {
      removeFromCache(key);

      return errorPayload;
    }

    return teamRadio;
  } catch {
    removeFromCache(key);

    return {
      hasError: true,
      message: `There was an error with the fetch of the team radio for session with key ${session_key}!`,
    };
  }
};

const getSessionByMeetingAndName = async (meetingKey, sessionName) => {
  const key = `sessions?meeting_key=${meetingKey}&session_name=${sessionName}`;
  const errorPayload = {
    hasError: true,
    message: `There was an error with the fetch of the ${sessionName} session for meeting ${meetingKey}!`,
  };

  try {
    const storageValue = getFromCache(key);
    let session;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      session = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      session = await response.json();

      setInCache(key, session);

      if (session.error) {
        removeFromCache(key);
        return errorPayload;
      }
    }

    return session;
  } catch {
    removeFromCache(key);
    return errorPayload;
  }
};

const getIntervals = async (sessionKey, driverNumber) => {
  const key = `intervals?session_key=${sessionKey}${
    driverNumber ? `&driver_number=${driverNumber}` : ''
  }`;
  const errorPayload = {
    hasError: true,
    message: `There was an error with the fetch of the intervals for session ${sessionKey}!`,
  };

  try {
    const storageValue = getFromCache(key);
    let intervals;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      intervals = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      intervals = await response.json();

      setInCache(key, intervals);

      if (intervals.error) {
        removeFromCache(key);
        return errorPayload;
      }
    }

    return intervals;
  } catch {
    removeFromCache(key);
    return errorPayload;
  }
};

const getPosition = async (sessionKey, driverNumber) => {
  const key = `position?session_key=${sessionKey}${
    driverNumber ? `&driver_number=${driverNumber}` : ''
  }`;
  const errorPayload = {
    hasError: true,
    message: `There was an error with the fetch of the position data for session ${sessionKey}!`,
  };

  try {
    const storageValue = getFromCache(key);
    let position;
    const isTodayARaceWeekDay = F1_RACE_WEEK_DAYS.some(
      (day) => day === new Date().getDay(),
    );

    if (storageValue && !isTodayARaceWeekDay) {
      position = storageValue;
    } else {
      const response = await fetch(`${F1_API_ENDPOINT}/${key}`);
      position = await response.json();

      setInCache(key, position);

      if (position.error) {
        removeFromCache(key);
        return errorPayload;
      }
    }

    return position;
  } catch {
    removeFromCache(key);
    return errorPayload;
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
  getIpLocation,
  getTeamRadio,
  getSessionByMeetingAndName,
  getIntervals,
  getPosition,
};
