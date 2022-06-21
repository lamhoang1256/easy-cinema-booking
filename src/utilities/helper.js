export const formatVND = (money) =>
  money?.toLocaleString("vi", { style: "currency", currency: "VND" });

export const calculateSumMoney = (array, keyObj) => {
  const total = array?.reduce(function (prevValue, currentValue) {
    return prevValue + currentValue[keyObj];
  }, 0);
  return formatVND(total);
};
