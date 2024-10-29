import secondsToFixed from './secondsToFixed';

const secondsToMinutes = (totalSeconds) => {
  if (!totalSeconds) {
    return;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = secondsToFixed(totalSeconds % 60);
  const [secIntPart, secDecPart] = seconds.split('.');
  const paddedSeconds = `${secIntPart.padStart(2, '0')}${
    secDecPart ? `.${secDecPart}` : ''
  }`;

  return `${minutes.toString().padStart(2, '0')}:${paddedSeconds}`;
};

export default secondsToMinutes;
