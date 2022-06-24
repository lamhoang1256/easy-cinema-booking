import { useEffect, useState } from "react";

export const useDebounce = (value = " ", timeout = 600) => {
  const [valueDebounce, setValueDebounce] = useState("");
  useEffect(() => {
    const timerId = setTimeout(() => {
      setValueDebounce(value);
    }, timeout);
    return () => {
      clearTimeout(timerId);
    };
  }, [value, timeout]);
  return valueDebounce;
};
