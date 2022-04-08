import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  REGISTER_FAIL,
} from "redux/constants/auth.constants";
const initialState = { userInfo: null, errorLogin: null, errorRegister: null };

export const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state };
    case LOGIN_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return { ...state, userInfo: payload, errorLogin: null };
    case LOGIN_FAIL:
      return { ...state, userInfo: null, errorLogin: payload };
    case REGISTER_FAIL:
      return { ...state, userInfo: null, errorRegister: payload };
    default:
      return state;
  }
};
