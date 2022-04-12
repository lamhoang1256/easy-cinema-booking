export const filterDayCinema = (array) => {
  let arrDay = [];
  array.map((openday) => {
    arrDay.push(openday.ngayChieuGioChieu);
  });
  return [...new Set(arrDay)]
    .sort((a, b) => a - b)
    .map((item, index) => {
      return <div key={index}>{item}</div>;
    });
};
