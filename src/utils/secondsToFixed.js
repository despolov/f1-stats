const secondsToFixed = (number) => {
  if (number) {
    return parseFloat(number).toFixed(3);
  }
  return number;
};

export default secondsToFixed;
