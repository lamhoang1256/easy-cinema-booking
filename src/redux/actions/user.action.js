import axiosClient from "apis/axiosClient";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
} from "redux/constants/user.constant";

// Đăng nhập tài khoản
export const loginUser = (dataToLogin) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const response = await axiosClient.post("QuanLyNguoiDung/DangNhap", dataToLogin);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data.content });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};

// Đăng ký tài khoản người dùng
export const registerUser = (dataToRegister) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const response = await axiosClient.post("/QuanLyNguoiDung/DangKy", dataToRegister);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data.content });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};

// Đăng xuất
export const logoutAction = () => {
  return {
    type: LOGOUT_USER,
  };
};

// Cập nhật thông tin người dùng
export const updateUserAction = (dataToUpdateUser) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
    const response = await axiosClient.put(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      dataToUpdateUser
    );
    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: response.data.content });
    dispatch({ type: LOGOUT_USER });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};

// Lấy thông tin chi tiết của người dùng (bao gồm thông tin cơ bản + lịch sử đặt vé)
export const getDetailUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });
    const response = await axiosClient.post("QuanLyNguoiDung/ThongTinTaiKhoan");
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: response.data.content });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};
