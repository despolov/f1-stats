import getSinglePracticeStats from '../../utils/getSinglePracticeStats';
import {
  getDrivers,
  getLapsForSession,
  getSession,
  getWeather,
} from '../../api';
import {
  mockedAllLapsForSessionResponse,
  mockedAllLapsForSessionWithNullSectorsForDriversResponse,
  mockedDriversForSessionWithNullSectorsResponse,
  mockedDriversResponse,
  mockedSessionResponse,
  mockedWeatherResponse,
  resultStats,
  resultStatsForSessionWithNullSectors,
} from '../mockedData/getSinglePracticeStats';

jest.mock('../../api', () => ({
  getDrivers: jest.fn(),
  getLapsForSession: jest.fn(),
  getSession: jest.fn(),
  getWeather: jest.fn(),
}));

const type = 'Practice 1';
const selectedYear = '2024';
const selectedCountry = 'Spain';

test('getSinglePracticeStats to return empty data when the session return data length is 0', async () => {
  getSession.mockImplementation(() => []);

  const result = await getSinglePracticeStats(
    type,
    selectedYear,
    selectedCountry,
    jest.fn,
  );

  expect(getSession).toHaveBeenCalledTimes(1);
  expect(result).toEqual({
    bestSectorsPerDriver: [],
    bestLapPerDriver: [],
    weather: [],
    timePeriod: {},
  });
});

test('getSinglePracticeStats to exit and set an error message when session returns an error', async () => {
  const setError = jest.fn();
  const sessionErrorMessage = 'session error message during GET';

  getSession.mockImplementation(() => ({
    hasError: true,
    message: sessionErrorMessage,
  }));

  const result = await getSinglePracticeStats(
    type,
    selectedYear,
    selectedCountry,
    setError,
  );

  expect(getSession).toHaveBeenCalledTimes(1);
  expect(result).toEqual(undefined);
  expect(setError).toHaveBeenCalledTimes(1);
  expect(setError).toHaveBeenCalledWith(sessionErrorMessage);
});

test('getSinglePracticeStats to exit and set an error message when weather returns an error', async () => {
  const setError = jest.fn();
  const weatherErrorMessage = 'weather error message during GET';

  getSession.mockImplementation(() => mockedSessionResponse);
  getWeather.mockImplementation(() => ({
    hasError: true,
    message: weatherErrorMessage,
  }));

  const result = await getSinglePracticeStats(
    type,
    selectedYear,
    selectedCountry,
    setError,
  );

  expect(getSession).toHaveBeenCalledTimes(1);
  expect(getWeather).toHaveBeenCalledTimes(1);
  expect(result).toEqual(undefined);
  expect(setError).toHaveBeenCalledTimes(1);
  expect(setError).toHaveBeenCalledWith(weatherErrorMessage);
});

test('getSinglePracticeStats to exit and set an error message when drivers returns an error', async () => {
  const setError = jest.fn();
  const driversErrorMessage = 'drivers error message during GET';

  getSession.mockImplementation(() => mockedSessionResponse);
  getWeather.mockImplementation(() => mockedWeatherResponse);
  getDrivers.mockImplementation(() => ({
    hasError: true,
    message: driversErrorMessage,
  }));

  const result = await getSinglePracticeStats(
    type,
    selectedYear,
    selectedCountry,
    setError,
  );

  expect(getSession).toHaveBeenCalledTimes(1);
  expect(getWeather).toHaveBeenCalledTimes(1);
  expect(getDrivers).toHaveBeenCalledTimes(1);
  expect(result).toEqual(undefined);
  expect(setError).toHaveBeenCalledTimes(1);
  expect(setError).toHaveBeenCalledWith(driversErrorMessage);
});

test('getSinglePracticeStats to exit and set an error message when laps for session returns an error', async () => {
  const setError = jest.fn();
  const lapsForSessiomErrorMessage =
    'laps for session error message during GET';

  getSession.mockImplementation(() => mockedSessionResponse);
  getWeather.mockImplementation(() => mockedWeatherResponse);
  getDrivers.mockImplementation(() => mockedDriversResponse);
  getLapsForSession.mockImplementation(() => ({
    hasError: true,
    message: lapsForSessiomErrorMessage,
  }));

  const result = await getSinglePracticeStats(
    type,
    selectedYear,
    selectedCountry,
    setError,
  );

  expect(getSession).toHaveBeenCalledTimes(1);
  expect(getWeather).toHaveBeenCalledTimes(1);
  expect(getDrivers).toHaveBeenCalledTimes(1);
  expect(getLapsForSession).toHaveBeenCalledTimes(1);
  expect(result).toEqual(undefined);
  expect(setError).toHaveBeenCalledTimes(1);
  expect(setError).toHaveBeenCalledWith(lapsForSessiomErrorMessage);
});

test('getSinglePracticeStats to return correct data when all endpoints resolve', async () => {
  getSession.mockImplementation(() => mockedSessionResponse);
  getWeather.mockImplementation(() => mockedWeatherResponse);
  getDrivers.mockImplementation(() => mockedDriversResponse);
  getLapsForSession.mockImplementation(() => mockedAllLapsForSessionResponse);

  const result = await getSinglePracticeStats(
    type,
    selectedYear,
    selectedCountry,
    jest.fn,
  );

  expect(getSession).toHaveBeenCalledTimes(1);
  expect(getWeather).toHaveBeenCalledTimes(1);
  expect(getDrivers).toHaveBeenCalledTimes(1);
  expect(getLapsForSession).toHaveBeenCalledTimes(1);
  expect(result).toEqual(resultStats);
});

test('getSinglePracticeStats to return correct data when all endpoints resolve and drivers with null lap sectors should be last and not first', async () => {
  getSession.mockImplementation(() => mockedSessionResponse);
  getWeather.mockImplementation(() => mockedWeatherResponse);
  getDrivers.mockImplementation(
    () => mockedDriversForSessionWithNullSectorsResponse,
  );
  getLapsForSession.mockImplementation(
    () => mockedAllLapsForSessionWithNullSectorsForDriversResponse,
  );

  const result = await getSinglePracticeStats(
    type,
    selectedYear,
    selectedCountry,
    jest.fn,
  );

  expect(getSession).toHaveBeenCalledTimes(1);
  expect(getWeather).toHaveBeenCalledTimes(1);
  expect(getDrivers).toHaveBeenCalledTimes(1);
  expect(getLapsForSession).toHaveBeenCalledTimes(1);
  expect(result).toEqual(resultStatsForSessionWithNullSectors);
});
