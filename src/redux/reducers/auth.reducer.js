import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "redux/constants/auth.constants";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  errorLogin: null,
  errorRegister: null,
};

export const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state };
    case LOGIN_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return { ...state, userInfo: payload, errorLogin: null };
    case LOGIN_FAIL:
      return { ...state, userInfo: null, errorLogin: payload };
    // register
    case REGISTER_REQUEST:
      return { ...state };
    case REGISTER_SUCCESS:
      return { ...state, userInfo: payload, errorRegister: null };
    case REGISTER_FAIL:
      return { ...state, errorRegister: payload };
    case LOGOUT:
      localStorage.removeItem("userInfo");
      return { ...state, userInfo: null, errorLogin: null, errorRegister: null };
    default:
      return state;
  }
};
