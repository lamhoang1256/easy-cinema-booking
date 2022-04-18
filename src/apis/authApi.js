import axiosClient from "./axiosClient";

export const authApi = {
  loginUser: (requestLogin) => {
    const path = `QuanLyNguoiDung/DangNhap`;
    return axiosClient.post(path, requestLogin);
  },
  registerUser: (requestRegister) => {
    const path = `/QuanLyNguoiDung/DangKy`;
    return axiosClient.post(path, requestRegister);
  },
  updateUser: (requestUpdate) => {
    const path = `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    return axiosClient.put(path, requestUpdate);
  },
  getUserProfile: () => {
    const path = `/QuanLyNguoiDung/ThongTinTaiKhoan`;
    return axiosClient.post(path);
  },
};
