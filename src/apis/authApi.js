import axiosClient from "./axiosClient";

export const authApi = {
  loginUserApi: (requestLogin) => {
    const path = `/QuanLyNguoiDung/DangNhap`;
    return axiosClient.post(path, requestLogin);
  },

  registerUserApi: (requestRegister) => {
    const path = `/QuanLyNguoiDung/DangKy`;
    return axiosClient.post(path, requestRegister);
  },

  updateUserApi: (requestUpdate) => {
    const path = `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    return axiosClient.put(path, requestUpdate);
  },

  getUserProfileApi: () => {
    const path = `/QuanLyNguoiDung/ThongTinTaiKhoan`;
    return axiosClient.post(path);
  },
};
