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

// format 2019-01-01T10:10:00 -> 10:10
export const formatISOtoHours = (iso) => {
  let hours = new Date(iso).getHours();
  let minutes = new Date(iso).getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${hours}:${minutes}`;
};
