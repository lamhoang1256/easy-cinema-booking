import axiosClient from "./axiosClient";
export const moviesApi = {
  //lấy toàn bộ dữ liệu danh sách phim (mã nhóm: 01, 02, 03, ... 13)
  getMovieListApi: (groupCode) => {
    const path = `/QuanLyPhim/LayDanhSachPhim?maNhom=GP${groupCode}`;
    return axiosClient.get(path);
  },

  //lấy chi tiết phim thông qua id
  getMovieDetailApi: (movieCode) => {
    const path = `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieCode}`;
    return axiosClient.get(path);
  },

  //lấy thông tin lịch chiếu của phim theo id
  getCalendarShowApi: (movieCode) => {
    const path = `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieCode}`;
    return axiosClient.get(path);
  },

  //lấy thông tin phòng vé
  getTicketRoomApi: (ticketRoom) => {
    const path = `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${ticketRoom}`;
    return axiosClient.get(path);
  },

  //đặt vé
  buyTicketApi: (requestBuyTicket) => {
    const path = `/QuanLyDatVe/DatVe`;
    return axiosClient.post(path, requestBuyTicket);
  },

  //lấy thông tin cụm rạp
  getCinemaApi: (groupCode) => {
    const path = `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP${groupCode}`;
    return axiosClient.get(path);
  },

  // chỉnh sửa thông tin phim
  editMovieApi: (requestMovieEdit) => {
    const path = `/QuanLyPhim/CapNhatPhimUpload`;
    return axiosClient.post(path, requestMovieEdit);
  },

  // thêm phim mới
  addNewMovieApi: (requestNewMovie) => {
    const path = `/QuanLyPhim/ThemPhimUploadHinh`;
    return axiosClient.post(path, requestNewMovie);
  },

  // xóa phim
  deleteMovieApi: (movieCode) => {
    const path = `/QuanLyPhim/XP?MaPhim=${movieCode}`;
    return axiosClient.delete(path);
  },
};
