import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAIL,
  UPDATE_USER_INFO_SUCCESS,
} from "redux/constants/user.constant";

const initialState = {};

export const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_INFO_REQUEST:
      return { ...state };
    case UPDATE_USER_INFO_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return { ...state };
    case UPDATE_USER_INFO_FAIL:
      return { ...state };

    default:
      return state;
  }
};
