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
import PracticeTable from '../../components/PracticeTable/PracticeTable';

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
  const [practice1Stats, setPractice1Stats] = useState({});
  const [practice2Stats, setPractice2Stats] = useState({});
  const [practice3Stats, setPractice3Stats] = useState({});
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
    let bestSectorsPerDriver = {};

    for (const driver of drivers) {
      const driverLaps = await getLapsForDriver(
        session[0].session_key,
        driver.driver_number,
      );
      const driverSectors = {
        sector1: { duration: null, lapNumber: null },
        sector2: { duration: null, lapNumber: null },
        sector3: { duration: null, lapNumber: null },
      };

      driverLaps.forEach((lap) => {
        const {
          lap_number,
          duration_sector_1,
          duration_sector_2,
          duration_sector_3,
        } = lap;

        if (
          !driverSectors.sector1.duration ||
          duration_sector_1 < driverSectors.sector1.duration
        ) {
          driverSectors.sector1.duration = duration_sector_1;
          driverSectors.sector1.lapNumber = lap_number;
        }
        if (
          !driverSectors.sector2.duration ||
          duration_sector_2 < driverSectors.sector2.duration
        ) {
          driverSectors.sector2.duration = duration_sector_2;
          driverSectors.sector2.lapNumber = lap_number;
        }
        if (
          !driverSectors.sector3.duration ||
          duration_sector_3 < driverSectors.sector3.duration
        ) {
          driverSectors.sector3.duration = duration_sector_3;
          driverSectors.sector3.lapNumber = lap_number;
        }
      });

      bestSectorsPerDriver = {
        ...bestSectorsPerDriver,
        [driver.name_acronym]: {
          ...driverSectors,
          aggregatedLap:
            driverSectors.sector1.duration +
            driverSectors.sector2.duration +
            driverSectors.sector3.duration,
        },
      };
    }

    return bestSectorsPerDriver;
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

    // practices must be reordered based on the lap time
    setPractice1Stats(practice1);
    setPractice2Stats(practice2);
    setPractice3Stats(practice3);
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

          {practiceStatsLoading && (
            <LinearProgress color="secondary" sx={styles.circularProgress} />
          )}

          {!practiceStatsLoading &&
            practice1Stats &&
            Object.keys(practice1Stats).length === 0 && (
              <p>Select year and country</p>
            )}

          {Object.keys(practice1Stats).length > 0 && (
            <TableContainer>
              <PracticeTable
                title="Aggregated positions"
                data={practice1Stats}
              />

              <PracticeTable title="Actual positions" data={{}} />
            </TableContainer>
          )}
        </PracticeContainer>

        <PracticeContainer>
          <PracticeTitle>Practice 2</PracticeTitle>

          {practiceStatsLoading && (
            <LinearProgress color="secondary" sx={styles.circularProgress} />
          )}

          {!practiceStatsLoading &&
            practice2Stats &&
            Object.keys(practice2Stats).length === 0 && (
              <p>Select year and country</p>
            )}

          {Object.keys(practice2Stats).length > 0 && (
            <TableContainer>
              <PracticeTable
                title="Aggregated positions"
                data={practice2Stats}
              />

              <PracticeTable title="Actual positions" data={{}} />
            </TableContainer>
          )}
        </PracticeContainer>

        <PracticeContainer>
          <PracticeTitle>Practice 3</PracticeTitle>

          {practiceStatsLoading && (
            <LinearProgress color="secondary" sx={styles.circularProgress} />
          )}

          {!practiceStatsLoading &&
            practice3Stats &&
            Object.keys(practice3Stats).length === 0 && (
              <p>Select year and country</p>
            )}

          {Object.keys(practice3Stats).length > 0 && (
            <TableContainer>
              <PracticeTable
                title="Aggregated positions"
                data={practice3Stats}
              />

              <PracticeTable title="Actual positions" data={{}} />
            </TableContainer>
          )}
        </PracticeContainer>
      </ParentContainer>
    </Layout>
  );
};

export default PracticeStats;
