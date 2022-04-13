const increaseDate = (time, numSecondIncrease) => {
  const timestamp = new Date(time).getTime();
  const increaseTime = timestamp + numSecondIncrease;
  return increaseTime;
};
export default increaseDate;
