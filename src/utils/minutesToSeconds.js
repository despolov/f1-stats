const minutesToSeconds = (minutesString) => {
  if (!minutesString) {
    return;
  }

  const [minutes, secondsAndMillis] = minutesString.split(':');
  const [seconds, millis] = secondsAndMillis.split('.');
  const totalSeconds =
    parseInt(minutes) * 60 + parseInt(seconds) + parseInt(millis) / 1000;

  return totalSeconds;
};

export default minutesToSeconds;
