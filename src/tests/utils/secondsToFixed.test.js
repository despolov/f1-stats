import secondsToFixed from '../../utils/secondsToFixed';

test('secondsToFixed should return the seconds in correct format ending in .000', () => {
  const seconds = 456;
  const fixedSeconds = secondsToFixed(seconds);

  expect(fixedSeconds).toEqual('456.000');
});

test('secondsToFixed should return the seconds with milliseconds in correct format ending in .000', () => {
  const seconds = 456.123;
  const fixedSeconds = secondsToFixed(seconds);

  expect(fixedSeconds).toEqual('456.123');
});

test('secondsToFixed should return the seconds with a lot milliseconds in correct format ending in .000', () => {
  const seconds = 456.17891321321;
  const fixedSeconds = secondsToFixed(seconds);

  expect(fixedSeconds).toEqual('456.179');
});

test('secondsToFixed should return the seconds with milliseconds in correct format ending in .000 when passed value is a string', () => {
  const seconds = '456.123';
  const fixedSeconds = secondsToFixed(seconds);

  expect(fixedSeconds).toEqual('456.123');
});

test('secondsToFixed should return undefined and not thor an error when passed value is undefined', () => {
  const seconds = undefined;
  const fixedSeconds = secondsToFixed(seconds);

  expect(fixedSeconds).toEqual(seconds);
});
