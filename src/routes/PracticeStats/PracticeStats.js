import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import Layout from '../../components/Layout';
import getStyles from './PracticeStats.styles';
import { LinearProgress } from '@mui/material';
import {
  getAllGrandPrix,
  getDrivers,
  getLapsForDriver,
  getSession,
} from '../../api';
import Select from '../../components/Select';
import AggregatedPracticeTable from '../../components/AggregatedPracticeTable';
import ActualPracticeTable from '../../components/ActualPracticeTable';
import { orderBy, uniqBy } from 'lodash';
import secondsToMins from '../../utils/secondsToMins';
import secondsToFixed from '../../utils/secondsToFixed';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const SelectFieldsContainer = styled('div')(() => styles.selectFieldsContainer);

const TableContainer = styled('div')(() => styles.tableContainer);

const PracticeContainer = styled('div')(() => styles.practiceContainer);

const PracticeTitle = styled('h3')(() => styles.practiceTitle);

const Divider = styled('div')(() => styles.divider);

const PracticeStats = () => {
  const years = [2023, 2024];
  const [year, setYear] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [practice1Stats, setPractice1Stats] = useState([]);
  const [practice2Stats, setPractice2Stats] = useState([]);
  const [practice3Stats, setPractice3Stats] = useState([]);
  const [practice1ActualStats, setPractice1ActualStats] = useState([]);
  const [practice2ActualStats, setPractice2ActualStats] = useState([]);
  const [practice3ActualStats, setPractice3ActualStats] = useState([]);
  const [practiceStatsLoading, setPracticeStatsLoading] = useState(false);

  useEffect(() => {
    if (year) {
      getCountries(year);
    }
  }, [year]);

  useEffect(() => {
    if (country) {
      setPracticeStatsLoading(true);
      getAllPracticesStats(year, country.split(' - ')[0]);
    }
  }, [country]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setCountry('');
    setCountries([]);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const getCountries = async (selectedYear) => {
    const allGrandPrix = await getAllGrandPrix(selectedYear);
    setCountries(
      allGrandPrix.map(
        (granPrix) => `${granPrix.country_name} - ${granPrix.meeting_name}`,
      ),
    );
  };

  const getSinglePracticeStats = async (
    type,
    selectedYear,
    selectedCountry,
  ) => {
    const session = await getSession(type, selectedCountry, selectedYear);
    const drivers = await getDrivers(session[0].session_key);
    const bestSectorsPerDriver = [];
    const bestLapPerDriver = [];
    // guard because sometimes the api returns duplicated drivers
    const uniqueDrivers = uniqBy(drivers, (d) => d.name_acronym);
    for (const driver of uniqueDrivers) {
      const driverLaps = await getLapsForDriver(
        session[0].session_key,
        driver.driver_number,
      );
      const driverSectors = {
        driver: driver.name_acronym,
        sector1: { duration: null, lapNumber: null },
        sector2: { duration: null, lapNumber: null },
        sector3: { duration: null, lapNumber: null },
      };
      const driverActualLap = {
        driver: driver.name_acronym,
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

      const aggregatedLap = secondsToFixed(
        Number(driverSectors.sector1.duration) +
          Number(driverSectors.sector2.duration) +
          Number(driverSectors.sector3.duration),
      );
      const aggregatedLapToMin = secondsToMins(aggregatedLap);
      const bestLap = secondsToFixed(driverActualLap.lapDuration);
      const bestLapToMin = secondsToMins(bestLap);

      bestSectorsPerDriver.push({
        ...driverSectors,
        aggregatedLap: aggregatedLapToMin,
      });
      bestLapPerDriver.push({
        ...driverActualLap,
        lapDuration: bestLapToMin,
      });
    }

    return { bestSectorsPerDriver, bestLapPerDriver };
  };

  const getAllPracticesStats = async (selectedYear, selectedCountry) => {
    const practice1 = await getSinglePracticeStats(
      'Practice 1',
      selectedYear,
      selectedCountry,
    );
    const practice2 = await getSinglePracticeStats(
      'Practice 2',
      selectedYear,
      selectedCountry,
    );
    const practice3 = await getSinglePracticeStats(
      'Practice 3',
      selectedYear,
      selectedCountry,
    );

    setPractice1Stats(
      orderBy(practice1.bestSectorsPerDriver, ['aggregatedLap']),
    );
    setPractice2Stats(
      orderBy(practice2.bestSectorsPerDriver, ['aggregatedLap']),
    );
    setPractice3Stats(
      orderBy(practice3.bestSectorsPerDriver, ['aggregatedLap']),
    );
    setPractice1ActualStats(
      orderBy(practice1.bestLapPerDriver, ['lapDuration']),
    );
    setPractice2ActualStats(
      orderBy(practice2.bestLapPerDriver, ['lapDuration']),
    );
    setPractice3ActualStats(
      orderBy(practice3.bestLapPerDriver, ['lapDuration']),
    );
    setPracticeStatsLoading(false);
  };

  return (
    <Layout>
      <ParentContainer>
        <SelectFieldsContainer>
          <Select
            value={year}
            onChange={handleYearChange}
            label="Select year"
            data={years}
          />

          <Select
            value={country}
            onChange={handleCountryChange}
            label="Select country"
            data={countries}
            disabled={countries.length === 0}
          />
        </SelectFieldsContainer>

        <Divider />

        <PracticeContainer>
          <PracticeTitle>Practice 1</PracticeTitle>
          {/* TODO: add the weather of the session */}
          {/* fetch('https://api.openf1.org/v1/weather?meeting_key=1208&wind_direction>=130&track_temperature>=52') */}

          {practiceStatsLoading && (
            <LinearProgress color="secondary" sx={styles.circularProgress} />
          )}

          {!practiceStatsLoading && practice1Stats.length === 0 && (
            <p>Select year and country</p>
          )}

          {practice1Stats.length > 0 && (
            <TableContainer>
              <AggregatedPracticeTable
                title="Aggregated positions"
                data={practice1Stats}
              />

              <ActualPracticeTable
                title="Actual positions"
                data={practice1ActualStats}
              />
            </TableContainer>
          )}
        </PracticeContainer>

        <PracticeContainer>
          <PracticeTitle>Practice 2</PracticeTitle>

          {practiceStatsLoading && (
            <LinearProgress color="secondary" sx={styles.circularProgress} />
          )}

          {!practiceStatsLoading && practice2Stats.length === 0 && (
            <p>Select year and country</p>
          )}

          {practice2Stats.length > 0 && (
            <TableContainer>
              <AggregatedPracticeTable
                title="Aggregated positions"
                data={practice2Stats}
              />

              <ActualPracticeTable
                title="Actual positions"
                data={practice2ActualStats}
              />
            </TableContainer>
          )}
        </PracticeContainer>

        <PracticeContainer>
          <PracticeTitle>Practice 3</PracticeTitle>

          {practiceStatsLoading && (
            <LinearProgress color="secondary" sx={styles.circularProgress} />
          )}

          {!practiceStatsLoading && practice3Stats.length === 0 && (
            <p>Select year and country</p>
          )}

          {practice3Stats.length > 0 && (
            <TableContainer>
              <AggregatedPracticeTable
                title="Aggregated positions"
                data={practice3Stats}
              />

              <ActualPracticeTable
                title="Actual positions"
                data={practice3ActualStats}
              />
            </TableContainer>
          )}
        </PracticeContainer>
      </ParentContainer>
    </Layout>
  );
};

export default PracticeStats;
