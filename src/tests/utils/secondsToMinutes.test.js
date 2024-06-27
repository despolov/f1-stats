import secondsToMinutes from '../../utils/secondsToMinutes';

test('secondsToMinutes should return seconds to minutes correctly in correct format with 0 when minutes are a single number', () => {
  const seconds = 456;
  const minutes = secondsToMinutes(seconds);

  expect(minutes).toEqual('07:36.000');
});

test('secondsToMinutes should return seconds to minutes correctly in correct format', () => {
  const seconds = 1456;
  const minutes = secondsToMinutes(seconds);

  expect(minutes).toEqual('24:16.000');
});

test('secondsToMinutes should return seconds to minutes correctly even when we pass milliseconds', () => {
  const seconds = 1456.056;
  const minutes = secondsToMinutes(seconds);

  expect(minutes).toEqual('24:16.056');
});

test('secondsToMinutes should return undefined and not throw an error when an undefined value is passed', () => {
  const seconds = undefined;
  const minutes = secondsToMinutes(seconds);

  expect(minutes).toEqual(seconds);
});

test('secondsToMinutes should return seconds to minutes correctly even when the seconds are string', () => {
  const seconds = '456';
  const minutes = secondsToMinutes(seconds);

  expect(minutes).toEqual('07:36.000');
});
