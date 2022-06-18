import axiosClient from "./axiosClient";
import axiosClient2 from "./axiosClient2";

export const usersApi = {
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

  userGetAll: (params) => {
    const path = `/api/users/all`;
    return axiosClient2.get(path, { params });
  },
  userGetSingle: (id) => {
    const path = `/api/users/${id}`;
    return axiosClient2.get(path);
  },
  userUpdate: (id, data) => {
    const path = `/api/users/${id}`;
    return axiosClient2.put(path, data);
  },
  userSignIn: (user) => {
    const path = `/api/auth/sign-in`;
    return axiosClient2.post(path, user);
  },
  userSignUp: (user) => {
    const path = `/api/auth/sign-up`;
    return axiosClient2.post(path, user);
  },
};
