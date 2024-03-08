import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import Layout from '../../components/Layout';
import getStyles from './PracticeStats.styles';
import { LinearProgress, useMediaQuery, useTheme, Box } from '@mui/material';
import {
  getAllGrandPrix,
  getDrivers,
  getLapsForDriver,
  getSession,
  getWeather,
} from '../../api';
import Select from '../../components/Select';
import AggregatedPracticeTable from '../../components/AggregatedPracticeTable';
import ActualPracticeTable from '../../components/ActualPracticeTable';
import { orderBy } from 'lodash';
import secondsToMins from '../../utils/secondsToMins';
import secondsToFixed from '../../utils/secondsToFixed';
import { FaTemperatureHalf } from 'react-icons/fa6';
import { GiTireTracks } from 'react-icons/gi';
import { BsCloudRainFill } from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';
import { LuWind } from 'react-icons/lu';
import { IoTimeOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import moment from 'moment';

const styles = getStyles();

const ParentContainer = styled('div')(() => styles.parentContainer);

const SelectFieldsContainer = styled('div')(() => styles.selectFieldsContainer);

const TableContainer = styled('div')(() => styles.tableContainer);

const PracticeContainer = styled('div')(() => styles.practiceContainer);

const PracticeTitle = styled('h3')(() => styles.practiceTitle);

const PracticeSubTitleH4 = styled('h4')(() => styles.practiceSubTitleH4);

const PracticeSubTitleH5 = styled('h5')(() => styles.practiceSubTitleH5);

const Divider = styled('div')(() => styles.divider);

const WeatherContainer = styled('div')(() => styles.weatherContainer);

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
  };

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
    for (const driver of drivers) {
      const driverLaps = await getLapsForDriver(
        sessionKey,
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

  const getPracticeWeather = (practiceWeather) => {
    return (
      <WeatherContainer>
        {practiceWeather.map((singlePracticeWeather) => {
          const {
            date,
            air_temperature,
            rainfall,
            track_temperature,
            wind_speed,
            humidity,
          } = singlePracticeWeather;

          return (
            <PracticeSubTitleH5>
              <IconContext.Provider value={{ style: styles.icons }}>
                <Box>
                  <IoTimeOutline />
                  {moment(`${date.split('.')[0]}.000Z`).format('HH:mm')}
                </Box>

                <Box>
                  <FaTemperatureHalf /> {air_temperature}
                </Box>

                <Box>
                  <GiTireTracks /> <FaTemperatureHalf /> {track_temperature}
                </Box>

                <Box>
                  <BsCloudRainFill /> {rainfall}
                </Box>

                <Box>
                  <WiHumidity /> {humidity}
                </Box>

                <Box>
                  <LuWind /> {wind_speed}
                </Box>
              </IconContext.Provider>
            </PracticeSubTitleH5>
          );
        })}
      </WeatherContainer>
    );
  };

  const getPracticeTimeSlot = (practiceTimePeriod) => (
    <PracticeSubTitleH4>
      {`${moment(practiceTimePeriod.start).format('DD-MMM')} ${moment(
        `${practiceTimePeriod.start}.000Z`,
      ).format('HH:mm')} - ${moment(`${practiceTimePeriod.end}.000Z`).format(
        'HH:mm',
      )}`}
    </PracticeSubTitleH4>
  );

  return (
    <Layout>
      <ParentContainer>
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
          />
        </SelectFieldsContainer>

        <Divider />

        <PracticeContainer>
          <PracticeTitle>Practice 1</PracticeTitle>

          {Object.keys(practice1TimePeriod).length > 0 &&
            getPracticeTimeSlot(practice1TimePeriod)}

          {practice1Weather.length > 0 && getPracticeWeather(practice1Weather)}

          {/* TODO: add is practice live */}

          {practiceStatsLoading && (
            <LinearProgress color="secondary" sx={styles.circularProgress} />
          )}

          {!practiceStatsLoading && practice1Stats.length === 0 && (
            <p>Select year and country</p>
          )}

          {practice1Stats.length > 0 && (
            <TableContainer sx={isDesktop ? {} : styles.tableContainerMobile}>
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

          {Object.keys(practice2TimePeriod).length > 0 &&
            getPracticeTimeSlot(practice2TimePeriod)}

          {practice2Weather.length > 0 && getPracticeWeather(practice2Weather)}

          {practiceStatsLoading && (
            <LinearProgress color="secondary" sx={styles.circularProgress} />
          )}

          {!practiceStatsLoading && practice2Stats.length === 0 && (
            <p>Select year and country</p>
          )}

          {practice2Stats.length > 0 && (
            <TableContainer sx={isDesktop ? {} : styles.tableContainerMobile}>
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

          {Object.keys(practice3TimePeriod).length > 0 &&
            getPracticeTimeSlot(practice3TimePeriod)}

          {practice3Weather.length > 0 && getPracticeWeather(practice3Weather)}

          {practiceStatsLoading && (
            <LinearProgress color="secondary" sx={styles.circularProgress} />
          )}

          {!practiceStatsLoading && practice3Stats.length === 0 && (
            <p>Select year and country</p>
          )}

          {practice3Stats.length > 0 && (
            <TableContainer sx={isDesktop ? {} : styles.tableContainerMobile}>
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
