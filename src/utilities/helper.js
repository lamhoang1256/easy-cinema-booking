export const formatVND = (money) =>
  money?.toLocaleString("vi", { style: "currency", currency: "VND" });

export const calculateSumMoney = (array, keyObj) => {
  const total = array?.reduce(function (prevValue, currentValue) {
    return prevValue + currentValue[keyObj];
  }, 0);
  return formatVND(total);
};

export const removeNullAndUndefinedProperties = (obj) => {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    let hasProperties = value && Object.keys(value).length > 0;
    if (value === null || value === undefined) {
      delete obj[key];
    } else if (typeof value !== "string" && hasProperties) {
      removeNullAndUndefinedProperties(value);
    }
  });
  return obj;
};

export const removeEmptyStringProperties = (obj) => {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    let hasProperties = value && Object.keys(value).length > 0;
    if (value === "") {
      delete obj[key];
    } else if (typeof value !== "string" && hasProperties) {
      removeEmptyStringProperties(value);
    }
  });
  return obj;
};
