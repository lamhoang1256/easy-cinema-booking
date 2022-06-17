import axios from "axios";
import axiosClient from "./axiosClient";
import axiosClient2 from "./axiosClient2";
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

  // lấy các cụm rạp theo hệ thống mã rạp VD: lấy các cụm rạp có mã là Galaxy
  getCinemaGroupApi: (cinemaSystemCode) => {
    const path = `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaSystemCode}`;
    return axiosClient.get(path);
  },

  createShowtime: (requestAddShowtime) => {
    const path = `/QuanLyDatVe/TaoLichChieu`;
    return axiosClient.post(path, requestAddShowtime);
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
    const path = `/QuanLyPhim/XoaPhim?MaPhim=${movieCode}`;
    return axiosClient.delete(path);
  },

  // Refactor
  movieDetailApi: (id) => {
    const path = `/api/movies/${id}`;
    return axiosClient2.get(path);
  },
  movieAddNew: (data) => {
    const path = `/api/movies`;
    return axiosClient2.post(path, data);
  },
  movieUpdate: (id, data) => {
    const path = `/api/movies/${id}`;
    return axiosClient2.put(path, data);
  },
  movieDelete: (id) => {
    const path = `/api/movies/${id}`;
    return axiosClient2.delete(path);
  },

  cinemaComplexesGet: (params) => {
    const path = `/api/cinema-complexes`;
    return axiosClient2.get(path, { params });
  },
  cinemaComplexesGetSingle: (id) => {
    const path = `/api/cinema-complexes/${id}`;
    return axiosClient2.get(path);
  },
  cinemasGetAll: (params) => {
    const path = `/api/cinemas/all`;
    return axiosClient2.get(path, { params });
  },
  cinemasGetSingle: (id) => {
    const path = `/api/cinemas/${id}`;
    return axiosClient2.get(path);
  },
  cinemaGetInformation: (id) => {
    const path = `/api/cinemas/${id}`;
    return axiosClient2.get(path);
  },

  // SHOWTIME API (Lịch chiếu API)
  showtimeGetAll: () => {
    const path = `/api/showtimes/all`;
    return axiosClient2.get(path);
  },
  showtimeGetSingle: (id) => {
    const path = `/api/showtimes/${id}`;
    return axiosClient2.get(path);
  },
  showtimeAddNew: (data) => {
    const path = `/api/showtimes`;
    return axiosClient2.post(path, data);
  },
  showtimeUpdate: (id, data) => {
    const path = `/api/showtimes/${id}`;
    return axiosClient2.put(path, data);
  },
  showtimeDelete: (id) => {
    const path = `/api/showtimes/${id}`;
    return axiosClient2.delete(path);
  },

  // BOOKING (Đặt vé)
  bookingAddNew: (data) => {
    const path = `/api/bookings`;
    return axiosClient2.post(path, data);
  },
};
