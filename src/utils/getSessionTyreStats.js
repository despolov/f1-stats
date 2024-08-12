import { getDrivers, getSession, getStints } from '../api';
import { orderBy } from 'lodash';

const orderStintsPerDriver = (stints) =>
  stints.reduce((accumulator, stint) => {
    const { driver_number } = stint;

    if (Object.hasOwn(accumulator, driver_number)) {
      accumulator[driver_number].push(stint);
    } else {
      accumulator[driver_number] = [stint];
    }

    return accumulator;
  }, {});

const setInternalProgress = (type, setProgress, progressValue) => {
  if (type === 'Practice 1') {
    if (progressValue === 1) {
      setProgress(10);
    } else if (progressValue === 2) {
      setProgress(15);
    } else if (progressValue === 3) {
      setProgress(20);
    }
  }
  if (type === 'Practice 2') {
    if (progressValue === 1) {
      setProgress(25);
    } else if (progressValue === 2) {
      setProgress(30);
    } else if (progressValue === 3) {
      setProgress(35);
    }
  }
  if (type === 'Practice 3') {
    if (progressValue === 1) {
      setProgress(40);
    } else if (progressValue === 2) {
      setProgress(45);
    } else if (progressValue === 3) {
      setProgress(50);
    }
  }
  if (type === 'Sprint Qualifying') {
    if (progressValue === 1) {
      setProgress(55);
    } else if (progressValue === 2) {
      setProgress(60);
    } else if (progressValue === 3) {
      setProgress(70);
    }
  }
  if (type === 'Sprint') {
    if (progressValue === 1) {
      setProgress(75);
    } else if (progressValue === 2) {
      setProgress(80);
    } else if (progressValue === 3) {
      setProgress(85);
    }
  }
  if (type === 'Qualifying') {
    if (progressValue === 1) {
      setProgress(90);
    } else if (progressValue === 2) {
      setProgress(95);
    } else if (progressValue === 3) {
      setProgress(100);
    }
  }
};

const getSessionTyreStats = async (
  type,
  selectedYear,
  selectedCountry,
  setError,
  setProgress,
) => {
  const session = await getSession(type, selectedCountry, selectedYear);
  setInternalProgress(type, setProgress, 1);

  if (session.hasError) {
    setError(session.message);
    return;
  }

  if (session.length === 0) {
    return null;
  }

  const { session_key: sessionKey } = session[0];
  const allDrivers = await getDrivers(sessionKey);
  setInternalProgress(type, setProgress, 2);
  const drivers = orderBy(allDrivers, ['team_name']);

  if (drivers.hasError) {
    setError(drivers.message);
    return;
  }

  const allStints = await getStints(sessionKey);
  setInternalProgress(type, setProgress, 3);

  if (allStints.hasError) {
    setError(allStints.message);
    return;
  }

  const allStintsPerDriver = orderStintsPerDriver(allStints);
  const tyresPerDriver = {};

  for (const driver of drivers) {
    const {
      driver_number,
      name_acronym,
      full_name,
      first_name,
      last_name,
      team_name,
      team_colour,
      headshot_url,
    } = driver;
    const driverStints = allStintsPerDriver[driver_number] || [];
    const usedTyresCountForDriver = {
      SOFT: 0,
      MEDIUM: 0,
      HARD: 0,
      INTERMEDIATE: 0,
      WET: 0,
    };

    driverStints.forEach((stint) => {
      const { tyre_age_at_start, compound } = stint;

      if (tyre_age_at_start === 0) {
        usedTyresCountForDriver[compound] += 1;
      }
    });

    tyresPerDriver[name_acronym] = {
      driver: {
        full_name,
        name_acronym,
        driver_number,
        headshot_url,
        team_name,
        team_colour,
        first_name,
        last_name,
      },
      usedTyres: usedTyresCountForDriver,
    };
  }

  return tyresPerDriver;
};

export default getSessionTyreStats;
