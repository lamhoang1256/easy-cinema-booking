import { useState, useRef, useEffect } from "react";

export const useCountDownBooking = (initMinutes, initSeconds) => {
  const idSetInterval = useRef();
  const ONE_SECONDS = 1000;
  const [minutes, setMinutes] = useState(initMinutes);
  const [seconds, setSeconds] = useState(initSeconds);

  const countdown = () => {
    idSetInterval.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(idSetInterval.current);
        } else {
          setMinutes(minutes - 1);
          setSeconds(() => 59);
        }
      }
    }, ONE_SECONDS * 1);
  };

  useEffect(() => {
    countdown();
    return () => {
      clearInterval(idSetInterval.current);
    };
  }, [seconds]);
  return { idSetInterval, minutes, seconds };
};
