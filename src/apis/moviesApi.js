import axiosClient from "./axiosClient";
export const moviesApi = {
  //lấy toàn bộ dữ liệu danh sách phim (mã nhóm: 01, 02, 03, ... 13)
  getMovieList: (groupCode) => {
    const path = `QuanLyPhim/LayDanhSachPhim?maNhom=GP${groupCode}`;
    return axiosClient.get(path);
  },
  //lấy thông tin lịch chiếu của phim theo id
  getCalendarShow: (movieCode) => {
    const path = `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieCode}`;
    return axiosClient.get(path);
  },
};
