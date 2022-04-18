import axiosClient from "./axiosClient";
export const moviesApi = {
  //lấy toàn bộ dữ liệu danh sách phim (mã nhóm: 01, 02, 03, ... 13)
  getMovieList: (groupCode) => {
    const path = `QuanLyPhim/LayDanhSachPhim?maNhom=GP${groupCode}`;
    return axiosClient.get(path);
  },
  //lấy chi tiết phim thông qua id
  getMovieDetail: (movieCode) => {
    const path = `QuanLyPhim/LayThongTinPhim?MaPhim=${movieCode}`;
    return axiosClient.get(path);
  },
  //lấy thông tin lịch chiếu của phim theo id
  getCalendarShow: (movieCode) => {
    const path = `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieCode}`;
    return axiosClient.get(path);
  },
  //lấy thông tin phòng vé
  getTicketRoom: (ticketRoom) => {
    const path = `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${ticketRoom}`;
    return axiosClient.get(path);
  },
  //đặt vé
  buyTicket: (requestBuyTicket) => {
    const path = `QuanLyDatVe/DatVe`;
    return axiosClient.post(path, requestBuyTicket);
  },
  //lấy thông tin cụm rạp
  getCinema: (groupCode) => {
    const path = `QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP${groupCode}`;
    return axiosClient.get(path);
  },
};
