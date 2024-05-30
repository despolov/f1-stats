import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import Layout from '../../components/Layout';
import getStyles from './PracticeStats.styles';
import { LinearProgress, useMediaQuery, useTheme } from '@mui/material';
import {
  getAllGrandPrix,
  getDrivers,
  getLapsForSession,
  getSession,
  getWeather,
} from '../../api';
import Select from '../../components/Select';
import AggregatedPracticeTable from '../../components/AggregatedPracticeTable';
import AggregatedPracticeMobileTable from '../../components/AggregatedPracticeMobileTable';
import ActualPracticeTable from '../../components/ActualPracticeTable';
import { orderBy } from 'lodash';
import secondsToMins from '../../utils/secondsToMins';
import secondsToFixed from '../../utils/secondsToFixed';
import PracticeTimeSlot from '../../components/PracticeTimeSlot';
import PracticeWeather from '../../components/PracticeWeather';

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
  const [countrieLoading, setCountriesLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [practice1Stats, setPractice1Stats] = useState([]);
  const [practice2Stats, setPractice2Stats] = useState([]);
  const [practice3Stats, setPractice3Stats] = useState([]);
  const [practice1ActualStats, setPractice1ActualStats] = useState([]);
  const [practice2ActualStats, setPractice2ActualStats] = useState([]);
  const [practice3ActualStats, setPractice3ActualStats] = useState([]);
  const [practice1Weather, setPractice1Weather] = useState([]);
  const [practice2Weather, setPractice2Weather] = useState([]);
  const [practice3Weather, setPractice3Weather] = useState([]);
  const [practice1TimePeriod, setPractice1TimePeriod] = useState({});
  const [practice2TimePeriod, setPractice2TimePeriod] = useState({});
  const [practice3TimePeriod, setPractice3TimePeriod] = useState({});
  const [practiceStatsLoading, setPracticeStatsLoading] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (year) {
      getCountries(year);
      setCountriesLoading(true);
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
    resetData();
  };

  const resetData = () => {
    setPractice1Stats([]);
    setPractice2Stats([]);
    setPractice3Stats([]);
    setPractice1ActualStats([]);
    setPractice2ActualStats([]);
    setPractice3ActualStats([]);
    setPractice1Weather([]);
    setPractice2Weather([]);
    setPractice3Weather([]);
    setPractice1TimePeriod({});
    setPractice2TimePeriod({});
    setPractice3TimePeriod({});
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    resetData();
  };

  const getCountries = async (selectedYear) => {
    const allGrandPrix = await getAllGrandPrix(selectedYear);

    setCountries(
      allGrandPrix.map(
        (granPrix) => `${granPrix.country_name} - ${granPrix.meeting_name}`,
      ),
    );
    setCountriesLoading(false);
  };

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

  const getSinglePracticeStats = async (
    type,
    selectedYear,
    selectedCountry,
  ) => {
    const session = await getSession(type, selectedCountry, selectedYear);

    if (session.length === 0) {
      return {
        bestSectorsPerDriver: [],
        bestLapPerDriver: [],
        weather: [],
        timePeriod: {},
      };
    }

    const {
      session_key: sessionKey,
      date_start: dateStart,
      date_end: dateEnd,
    } = session[0];
    const timePeriod = { start: dateStart, end: dateEnd };
    const weather = await getWeather(sessionKey, dateStart, dateEnd);
    const drivers = await getDrivers(sessionKey);
    const bestSectorsPerDriver = [];
    const bestLapPerDriver = [];
    const allLaps = await getLapsForSession(sessionKey);
    const allLapsPerDriver = orderLapsPerDriver(allLaps);

    for (const driver of drivers) {
      const { driver_number, name_acronym } = driver;
      const driverLaps = allLapsPerDriver[driver_number];
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

    return { bestSectorsPerDriver, bestLapPerDriver, weather, timePeriod };
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
    setPractice1Weather(practice1.weather);
    setPractice2Weather(practice2.weather);
    setPractice3Weather(practice3.weather);
    setPractice1TimePeriod(practice1.timePeriod);
    setPractice2TimePeriod(practice2.timePeriod);
    setPractice3TimePeriod(practice3.timePeriod);
    setPracticeStatsLoading(false);
  };

  return (
    <Layout>
      <ParentContainer sx={isDesktop ? {} : styles.parentContainerMobile}>
        <SelectFieldsContainer
          sx={isDesktop ? {} : styles.selectFieldsContainerMobile}
        >
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
            loading={countrieLoading}
          />
        </SelectFieldsContainer>

        <Divider />

        {!practiceStatsLoading &&
        practice1Stats.length === 0 &&
        practice2Stats.length === 0 &&
        practice3Stats.length === 0 ? (
          <p>Select year and country in order to see practice results</p>
        ) : (practiceStatsLoading ? ( 
          <>
            <PracticeTitle>Loading practice stats...</PracticeTitle>
            <LinearProgress
              color="secondary"
              sx={styles.circularProgress}
            />
          </>
          ) : ( 
          <>
            {practice1Stats.length > 0 && (<PracticeContainer>
              <PracticeTitle>Practice 1</PracticeTitle>

              {Object.keys(practice1TimePeriod).length > 0 && (
                <PracticeTimeSlot practiceTimePeriod={practice1TimePeriod} />
              )}

              {practice1Weather.length > 0 && (
                <PracticeWeather practiceWeather={practice1Weather} />
              )}

              <TableContainer
                sx={isDesktop ? {} : styles.tableContainerMobile}
              >
                {isDesktop ? (
                  <AggregatedPracticeTable
                    title="Aggregated positions"
                    data={practice1Stats}
                  />
                ) : (
                  <AggregatedPracticeMobileTable
                    title="Aggregated positions"
                    data={practice1Stats}
                  />
                )}

                <ActualPracticeTable
                  title="Actual positions"
                  data={practice1ActualStats}
                />
              </TableContainer>
            </PracticeContainer>)}

            {practice2Stats.length > 0 && (<PracticeContainer>
              <PracticeTitle>Practice 2</PracticeTitle>

              {Object.keys(practice2TimePeriod).length > 0 && (
                <PracticeTimeSlot practiceTimePeriod={practice2TimePeriod} />
              )}

              {practice2Weather.length > 0 && (
                <PracticeWeather practiceWeather={practice2Weather} />
              )}

              {practice2Stats.length > 0 && (
                <TableContainer
                  sx={isDesktop ? {} : styles.tableContainerMobile}
                >
                  {isDesktop ? (
                    <AggregatedPracticeTable
                      title="Aggregated positions"
                      data={practice2Stats}
                    />
                  ) : (
                    <AggregatedPracticeMobileTable
                      title="Aggregated positions"
                      data={practice2Stats}
                    />
                  )}

                  <ActualPracticeTable
                    title="Actual positions"
                    data={practice2ActualStats}
                  />
                </TableContainer>
              )}
            </PracticeContainer>)}

            {practice3Stats.length > 0 && (<PracticeContainer>
              <PracticeTitle>Practice 3</PracticeTitle>

              {Object.keys(practice3TimePeriod).length > 0 && (
                <PracticeTimeSlot practiceTimePeriod={practice3TimePeriod} />
              )}

              {practice3Weather.length > 0 && (
                <PracticeWeather practiceWeather={practice3Weather} />
              )}

              {practice3Stats.length > 0 && (
                <TableContainer
                  sx={isDesktop ? {} : styles.tableContainerMobile}
                >
                  {isDesktop ? (
                    <AggregatedPracticeTable
                      title="Aggregated positions"
                      data={practice3Stats}
                    />
                  ) : (
                    <AggregatedPracticeMobileTable
                      title="Aggregated positions"
                      data={practice3Stats}
                    />
                  )}

                  <ActualPracticeTable
                    title="Actual positions"
                    data={practice3ActualStats}
                  />
                </TableContainer>
              )}
            </PracticeContainer>)}
          </>)
        )}
      </ParentContainer>
    </Layout>
  );
};

export default PracticeStats;
