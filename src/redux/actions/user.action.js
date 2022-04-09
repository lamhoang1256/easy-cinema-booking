import axiosClient from "apis/axiosClient";
import {
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from "redux/constants/user.constant";

// Đăng nhập tài khoản
export const loginAction = (dataToLogin) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const response = await axiosClient.post("QuanLyNguoiDung/DangNhap", dataToLogin);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.content });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};

// Đăng ký tài khoản người dùng
export const registerAction = (dataToRegister) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const response = await axiosClient.post("/QuanLyNguoiDung/DangKy", dataToRegister);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data.content });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};

// Đăng xuất
export const logoutAction = () => {
  return {
    type: USER_LOGOUT,
  };
};

// Cập nhật thông tin người dùng
export const updateUserAction = (dataToUpdateUser) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const response = await axiosClient.put(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      dataToUpdateUser
    );
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: response.data.content });
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};
