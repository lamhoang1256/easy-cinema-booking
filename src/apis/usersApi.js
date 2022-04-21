import axiosClient from "./axiosClient";

export const usersApi = {
  getUserListApi: () => {
    const path = `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`;
    return axiosClient.get(path);
  },
};
