import secondsToMinutes from './secondsToMinutes';
import secondsToFixed from './secondsToFixed';
import { getDrivers, getLapsForSession, getSession, getWeather } from '../api';

const orderLapsPerDriver = (laps) =>
  laps.reduce((accumulator, lap) => {
    const { driver_number } = lap;

    if (Object.hasOwn(accumulator, driver_number)) {
      accumulator[driver_number].push(lap);
    } else {
      accumulator[driver_number] = [lap];
    }

    return accumulator;
  }, {});

const setInternalProgress = (type, setProgress, progressValue) => {
  if (type === 'Practice 1') {
    if (progressValue === 1) {
      setProgress(11);
    } else if (progressValue === 2) {
      setProgress(22);
    } else if (progressValue === 3) {
      setProgress(33);
    }
  }
  if (type === 'Practice 2') {
    if (progressValue === 1) {
      setProgress(44);
    } else if (progressValue === 2) {
      setProgress(55);
    } else if (progressValue === 3) {
      setProgress(66);
    }
  }
  if (type === 'Practice 3') {
    if (progressValue === 1) {
      setProgress(77);
    } else if (progressValue === 2) {
      setProgress(88);
    } else if (progressValue === 3) {
      setProgress(100);
    }
  }
};

const getSinglePracticeStats = async (
  type,
  selectedYear,
  selectedCountry,
  meetingKey,
  setError,
  setProgress,
) => {
  const session = await getSession(
    type,
    selectedCountry,
    selectedYear,
    meetingKey,
  );
  setInternalProgress(type, setProgress, 1);

  if (session.hasError) {
    setError(session.message);
    return;
  }

  if (session.length === 0) {
    return {
      bestSectorsPerDriver: [],
      bestLapPerDriver: [],
      weather: [],
      timePeriod: {},
      sessionKey: null,
    };
  }

  const {
    session_key: sessionKey,
    date_start: dateStart,
    date_end: dateEnd,
  } = session[0];
  const timePeriod = { start: dateStart, end: dateEnd };

  // Fetch drivers for this specific session (can differ due to reserve drivers)
  const drivers = await getDrivers(sessionKey);
  setInternalProgress(type, setProgress, 2);

  if (drivers.hasError) {
    setError(drivers.message);
    return;
  }

  const bestSectorsPerDriver = [];
  const bestLapPerDriver = [];
  const allLaps = await getLapsForSession(sessionKey);
  setInternalProgress(type, setProgress, 3);

  if (allLaps.hasError) {
    setError(allLaps.message);
    return;
  }

  const allLapsPerDriver = orderLapsPerDriver(allLaps);

  for (const driver of drivers) {
    const { driver_number, name_acronym } = driver;
    const driverLaps = allLapsPerDriver[driver_number] || [];
    const driverSectors = {
      driver: name_acronym,
      sector1: { duration: null, lapNumber: null },
      sector2: { duration: null, lapNumber: null },
      sector3: { duration: null, lapNumber: null },
    };
    const driverActualLap = {
      driver: name_acronym,
      lapDuration: null,
      lapNumber: null,
      sector1: null,
      sector2: null,
      sector3: null,
    };

    driverLaps.forEach((lap) => {
      const {
        lap_number,
        duration_sector_1,
        duration_sector_2,
        duration_sector_3,
        lap_duration,
      } = lap;

      if (!lap_duration) {
        return;
      }

      if (
        !driverSectors.sector1.duration ||
        (duration_sector_1 &&
          duration_sector_1 < driverSectors.sector1.duration)
      ) {
        driverSectors.sector1.duration = secondsToFixed(duration_sector_1);
        driverSectors.sector1.lapNumber = lap_number;
      }
      if (
        !driverSectors.sector2.duration ||
        (duration_sector_2 &&
          duration_sector_2 < driverSectors.sector2.duration)
      ) {
        driverSectors.sector2.duration = secondsToFixed(duration_sector_2);
        driverSectors.sector2.lapNumber = lap_number;
      }
      if (
        !driverSectors.sector3.duration ||
        (duration_sector_3 &&
          duration_sector_3 < driverSectors.sector3.duration)
      ) {
        driverSectors.sector3.duration = secondsToFixed(duration_sector_3);
        driverSectors.sector3.lapNumber = lap_number;
      }
      if (
        !driverActualLap.lapDuration ||
        (lap_duration && lap_duration < driverActualLap.lapDuration)
      ) {
        driverActualLap.lapDuration = lap_duration;
        driverActualLap.lapNumber = lap_number;
        driverActualLap.sector1 = duration_sector_1;
        driverActualLap.sector2 = duration_sector_2;
        driverActualLap.sector3 = duration_sector_3;
      }
    });

    if (
      driverSectors.sector1.duration &&
      driverSectors.sector2.duration &&
      driverSectors.sector3.duration
    ) {
      const aggregatedLap = secondsToFixed(
        Number(driverSectors.sector1.duration) +
          Number(driverSectors.sector2.duration) +
          Number(driverSectors.sector3.duration),
      );
      const aggregatedLapToMin = secondsToMinutes(aggregatedLap);

      bestSectorsPerDriver.push({
        ...driverSectors,
        aggregatedLap: aggregatedLapToMin,
      });
    } else {
      bestSectorsPerDriver.push({
        ...driverSectors,
        aggregatedLap: null,
      });
    }

    if (driverActualLap.lapDuration) {
      const bestLap = secondsToFixed(driverActualLap.lapDuration);
      const bestLapToMin = secondsToMinutes(bestLap);

      bestLapPerDriver.push({
        ...driverActualLap,
        lapDuration: bestLapToMin,
      });
    } else {
      bestLapPerDriver.push({
        ...driverActualLap,
        lapDuration: null,
      });
    }
  }

  return {
    bestSectorsPerDriver,
    bestLapPerDriver,
    weather: [], // Weather will be fetched separately after displaying practice data
    timePeriod,
    sessionKey,
    dateStart,
    dateEnd,
  };
};

export default getSinglePracticeStats;
