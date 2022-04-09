import axiosClient from "apis/axiosClient";
import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
} from "redux/constants/user.constant";

export const updateUserAction = (dataToUpdateUser) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_INFO_REQUEST });
    const response = await axiosClient.put(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      dataToUpdateUser
    );
    dispatch({ type: UPDATE_USER_INFO_SUCCESS, payload: response.data.content });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_INFO_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};
