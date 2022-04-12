const formatDateToHour = (time) => {
  const formatDate = new Date(time).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatDate;
};

export default formatDateToHour;
