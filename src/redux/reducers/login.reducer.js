import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAIL } from "redux/constants/login.constants";
const initialState = { userInfo: null, errorLogin: null };

export const login = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state };
    case LOGIN_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return { ...state, userInfo: payload, errorLogin: null };
    case LOGIN_FAIL:
      return { ...state, userInfo: null, errorLogin: payload };
    default:
      return state;
  }
};
