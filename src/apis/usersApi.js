import axiosClient from "./axiosClient";

export const usersApi = {
  getUserListApi: () => {
    const path = `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`;
    return axiosClient.get(path);
  },
  searchUser: (username) => {
    const path = `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${username}`;
    return axiosClient.get(path);
  },
};
