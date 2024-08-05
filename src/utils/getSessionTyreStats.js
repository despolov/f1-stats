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

const getSessionTyreStats = async (
  type,
  selectedYear,
  selectedCountry,
  setError,
) => {
  const session = await getSession(type, selectedCountry, selectedYear);

  if (session.hasError) {
    setError(session.message);
    return;
  }

  if (session.length === 0) {
    return null;
  }

  const { session_key: sessionKey } = session[0];
  const allDrivers = await getDrivers(sessionKey);
  const drivers = orderBy(allDrivers, ['team_name']);

  if (drivers.hasError) {
    setError(drivers.message);
    return;
  }

  const allStints = await getStints(sessionKey);

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
