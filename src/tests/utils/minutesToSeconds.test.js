import minutesToSeconds from '../../utils/minutesToSeconds';

test('secondsToFixed should return the seconds in correct format ending in .000', () => {
  const minutes = '07:44.456';
  const seconds = minutesToSeconds(minutes);

  expect(seconds).toEqual(464.456);
});

test('secondsToFixed should return undefined when no passed value', () => {
  const minutes = undefined;
  const seconds = minutesToSeconds(minutes);

  expect(seconds).toEqual(minutes);
});
