export const calculateSumMoney = (array, keyObj) => {
  const total = array.reduce(function (prevValue, currentValue) {
    return prevValue + currentValue[keyObj];
  }, 0);
  return total.toLocaleString("en-US");
};
