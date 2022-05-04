export const countDownTimeBooking = (
  idSetInterval,
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  setIsShowModalAlert
) => {
  const ONE_SECONDS = 1000;
  idSetInterval = setInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        setIsShowModalAlert(true);
        clearInterval(idSetInterval);
      } else {
        setMinutes(minutes - 1);
        setSeconds(() => 59);
      }
    }
  }, ONE_SECONDS * 1);
};
