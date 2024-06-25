import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import Layout from '../../components/Layout';
import getStyles from './PracticeStats.styles';
import { LinearProgress, useMediaQuery, useTheme, Box } from '@mui/material';
import { getAllGrandPrix } from '../../api';
import Select from '../../components/Select';
import AggregatedPracticeTable from '../../components/AggregatedPracticeTable';
import AggregatedPracticeMobileTable from '../../components/AggregatedPracticeMobileTable';
import ActualPracticeTable from '../../components/ActualPracticeTable';
import ActualPracticeMobileTable from '../../components/ActualPracticeMobileTable';
import { orderBy } from 'lodash';
import PracticeTimeSlot from '../../components/PracticeTimeSlot';
import PracticeWeather from '../../components/PracticeWeather';
import getSinglePracticeStats from '../../utils/getSinglePracticeStats';
import addGapBetweenDrivers from '../../utils/addGapBetweenDrivers';

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
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [countrieLoading, setCountriesLoading] = useState(false);
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
  const [error, setStateError] = useState('');
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

  const setError = (errorMessage) => {
    setPracticeStatsLoading(false);
    setCountriesLoading(false);
    setYear('');
    setCountry('');
    setCountries([]);
    setStateError(errorMessage);
  };

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
    setStateError('');
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    resetData();
  };

  const getCountries = async (selectedYear) => {
    const allGrandPrix = await getAllGrandPrix(selectedYear);

    if (allGrandPrix.hasError) {
      setError(allGrandPrix.message);
      return;
    }

    setCountries(
      allGrandPrix.map(
        (granPrix) => `${granPrix.country_name} - ${granPrix.meeting_name}`,
      ),
    );
    setCountriesLoading(false);
  };

  const getAllPracticesStats = async (selectedYear, selectedCountry) => {
    const practice1 = await getSinglePracticeStats(
      'Practice 1',
      selectedYear,
      selectedCountry,
      setError,
    );
    const practice2 = await getSinglePracticeStats(
      'Practice 2',
      selectedYear,
      selectedCountry,
      setError,
    );
    const practice3 = await getSinglePracticeStats(
      'Practice 3',
      selectedYear,
      selectedCountry,
      setError,
    );
    const practice1WithGap = addGapBetweenDrivers(
      orderBy(practice1.bestSectorsPerDriver, ['aggregatedLap']),
      'aggregatedLap',
    );
    const practice2WithGap = addGapBetweenDrivers(
      orderBy(practice2.bestSectorsPerDriver, ['aggregatedLap']),
      'aggregatedLap',
    );
    const practice3WithGap = addGapBetweenDrivers(
      orderBy(practice3.bestSectorsPerDriver, ['aggregatedLap']),
      'aggregatedLap',
    );

    const practice1ActualWithGap = addGapBetweenDrivers(
      orderBy(practice1.bestLapPerDriver, ['lapDuration']),
      'lapDuration',
    );
    const practice2ActualWithGap = addGapBetweenDrivers(
      orderBy(practice2.bestLapPerDriver, ['lapDuration']),
      'lapDuration',
    );
    const practice3ActualWithGap = addGapBetweenDrivers(
      orderBy(practice3.bestLapPerDriver, ['lapDuration']),
      'lapDuration',
    );

    setPractice1Stats(practice1WithGap);
    setPractice2Stats(practice2WithGap);
    setPractice3Stats(practice3WithGap);
    setPractice1ActualStats(practice1ActualWithGap);
    setPractice2ActualStats(practice2ActualWithGap);
    setPractice3ActualStats(practice3ActualWithGap);
    setPractice1Weather(practice1.weather);
    setPractice2Weather(practice2.weather);
    setPractice3Weather(practice3.weather);
    setPractice1TimePeriod(practice1.timePeriod);
    setPractice2TimePeriod(practice2.timePeriod);
    setPractice3TimePeriod(practice3.timePeriod);
    setPracticeStatsLoading(false);
  };

  if (error) {
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

          <PracticeTitle>{error}</PracticeTitle>
        </ParentContainer>
      </Layout>
    );
  }

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
          <Box component="p">
            Select year and country in order to see practice actual and
            aggregated results
          </Box>
        ) : practiceStatsLoading ? (
          <>
            <PracticeTitle>Loading practice stats...</PracticeTitle>

            <LinearProgress color="secondary" sx={styles.circularProgress} />
          </>
        ) : (
          <>
            {practice1Stats.length > 0 && (
              <PracticeContainer>
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
                    <>
                      <AggregatedPracticeTable
                        title="Aggregated positions"
                        data={practice1Stats}
                      />

                      <ActualPracticeTable
                        title="Actual positions"
                        data={practice1ActualStats}
                      />
                    </>
                  ) : (
                    <>
                      <AggregatedPracticeMobileTable
                        title="Aggregated pos"
                        data={practice1Stats}
                      />

                      <ActualPracticeMobileTable
                        title="Actual pos"
                        data={practice1ActualStats}
                      />
                    </>
                  )}
                </TableContainer>
              </PracticeContainer>
            )}

            {practice2Stats.length > 0 && (
              <PracticeContainer>
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
                      <>
                        <AggregatedPracticeTable
                          title="Aggregated positions"
                          data={practice2Stats}
                        />

                        <ActualPracticeTable
                          title="Actual positions"
                          data={practice2ActualStats}
                        />
                      </>
                    ) : (
                      <>
                        <AggregatedPracticeMobileTable
                          title="Aggregated pos"
                          data={practice2Stats}
                        />

                        <ActualPracticeMobileTable
                          title="Actual pos"
                          data={practice2ActualStats}
                        />
                      </>
                    )}
                  </TableContainer>
                )}
              </PracticeContainer>
            )}

            {practice3Stats.length > 0 && (
              <PracticeContainer>
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
                      <>
                        <AggregatedPracticeTable
                          title="Aggregated positions"
                          data={practice3Stats}
                        />

                        <ActualPracticeTable
                          title="Actual positions"
                          data={practice3ActualStats}
                        />
                      </>
                    ) : (
                      <>
                        <AggregatedPracticeMobileTable
                          title="Aggregated pos"
                          data={practice3Stats}
                        />

                        <ActualPracticeMobileTable
                          title="Actual pos"
                          data={practice3ActualStats}
                        />
                      </>
                    )}
                  </TableContainer>
                )}
              </PracticeContainer>
            )}
          </>
        )}
      </ParentContainer>
    </Layout>
  );
};

export default PracticeStats;
