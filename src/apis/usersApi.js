import axiosClient from "./axiosClient";

export const usersApi = {
  getUserListApi: () => {
    const path = `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`;
    return axiosClient.get(path);
  },

  searchUserApi: (username) => {
    const path = `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP00&tuKhoa=${username}`;
    return axiosClient.get(path);
  },

  deleteUserApi: (username) => {
    const path = `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${username}`;
    return axiosClient.delete(path);
  },

  getUserToEdit: (username) => {
    const path = `/QuanLyNguoiDung/LayThongTinNguoiDung?TaiKhoan=${username}`;
    return axiosClient.post(path);
  },

  editUserApi: (requestInfoUser) => {
    const path = `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    return axiosClient.post(path, requestInfoUser);
  },
};
