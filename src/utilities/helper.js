export const formatVND = (money) =>
  money?.toLocaleString("vi", { style: "currency", currency: "VND" });

export const calculateSumMoney = (array, keyObj) => {
  const total = array?.reduce(function (prevValue, currentValue) {
    return prevValue + currentValue[keyObj];
  }, 0);
  return formatVND(total);
};

export const sortArrayDescending = (array, key) => array.sort((a, b) => b[key] - a[key]);

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

export const commaSeparation = (array, key) => {
  const count = array.length - 1;
  return array.map((item, index) => {
    if (index === count) return <span key={index}>{item[key]}</span>;
    return <span key={index}>{item[key] + ", "}</span>;
  });
};

export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
