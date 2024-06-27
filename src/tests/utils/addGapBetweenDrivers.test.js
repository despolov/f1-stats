import addGapBetweenDrivers from '../../utils/addGapBetweenDrivers';
import { resultStats as resultsFromPractice } from '../mockedData/getSinglePracticeStats';
import { resultStats as resultsFromPracticeWithGap } from '../mockedData/addGapBetweenDrivers';
import { orderBy } from 'lodash';

test('addGapBetweenDrivers to return correct data', async () => {
  const orderedDriversByLap = orderBy(resultsFromPractice.bestLapPerDriver, [
    'lapDuration',
  ]);
  const result = await addGapBetweenDrivers(orderedDriversByLap, 'lapDuration');

  expect(result).toEqual(resultsFromPracticeWithGap);
});
