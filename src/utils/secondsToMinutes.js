import secondsToFixed from './secondsToFixed';

const secondsToMinutes = (totalSeconds) => {
  if (!totalSeconds) {
    return;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = secondsToFixed(totalSeconds % 60);

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

export default secondsToMinutes;
