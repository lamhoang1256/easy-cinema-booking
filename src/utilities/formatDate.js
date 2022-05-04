export const formatDateToHours = (time) => {
  const formatDate = new Date(time).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatDate;
};

// format 2019-01-01T10:10:00 -> 1/1/2019
export const formatISOtoLocaleDateString = (iso) => {
  return new Date(iso.split("T")[0]).toLocaleDateString("vi-VI");
};

// format 1:3 -> 01:03
export const formatTimeTwoDigit = (num1, num2) => {
  if (num1 < 10) {
    num1 = "0" + num1;
  }
  if (num2 < 10) {
    num2 = "0" + num2;
  }
  return `${num1}:${num2}`;
};

// format 2019-01-01T10:10:00 -> 10:10
export const formatISOtoHours = (iso) => {
  let hours = new Date(iso).getHours();
  let minutes = new Date(iso).getMinutes();
  return formatTimeTwoDigit(hours, minutes);
};

// new Date() -> Wed May 04 2022 09:11:52 GMT+0700 (Giờ Đông Dương) -> format -> 4/5/2022
export const formatLocaleDateString = (time) => new Date(time).toLocaleDateString("vi-VI");
