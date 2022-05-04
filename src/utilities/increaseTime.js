const increaseTime = (time, countSecondIncrease) => {
  const timestamp = new Date(time).getTime();
  const increasedDate = timestamp + countSecondIncrease;
  return increasedDate;
};
export default increaseTime;
