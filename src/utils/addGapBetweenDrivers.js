import secondsToFixed from './secondsToFixed';
import minutesToSeconds from './minutesToSeconds';

const addGapBetweenDrivers = (practice, typeOfLap) => {
  const practiceStats = [];

  practice.forEach((driverStats) => {
    if (practiceStats.length > 0) {
      const driverInFirst = practiceStats[0];
      const driverInFirstLapToSeconds = minutesToSeconds(
        driverInFirst[typeOfLap],
      );
      const driverInfront = practiceStats[practiceStats.length - 1];
      const driverInfrontLapToSeconds = minutesToSeconds(
        driverInfront[typeOfLap],
      );
      const driverLapToSeconds = minutesToSeconds(driverStats[typeOfLap]);
      const gapBetweenInSeconds = secondsToFixed(
        driverLapToSeconds - driverInfrontLapToSeconds,
      );
      const gapToFirstInSeconds = secondsToFixed(
        driverLapToSeconds - driverInFirstLapToSeconds,
      );

      practiceStats.push({
        ...driverStats,
        gap: gapBetweenInSeconds || null,
        gapToFirst: gapToFirstInSeconds || null,
      });
    } else {
      practiceStats.push({ ...driverStats, gap: '', gapToFirst: '' });
    }
  });

  return practiceStats;
};

export default addGapBetweenDrivers;
