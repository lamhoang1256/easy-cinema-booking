import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "redux/constants/user.constant";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  errorLogin: null,
  errorRegister: null,
  errorUpdate: null,
};

export const user = (state = initialState, { type, payload }) => {
  switch (type) {
    // login
    case USER_LOGIN_REQUEST:
      return { ...state };
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return { ...state, userInfo: payload, errorLogin: null };
    case USER_LOGIN_FAIL:
      return { ...state, userInfo: null, errorLogin: payload };

    // register
    case USER_REGISTER_REQUEST:
      return { ...state };
    case USER_REGISTER_SUCCESS:
      return { ...state, userInfo: payload, errorRegister: null };
    case USER_REGISTER_FAIL:
      return { ...state, userInfo: null, errorRegister: payload };

    //update
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { ...state };
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, errorUpdate: payload };

    // logout
    case USER_LOGOUT:
      localStorage.removeItem("userInfo");
      return { ...state, userInfo: null, errorLogin: null, errorRegister: null, errorUpdate: null };

    default:
      return state;
  }
};
