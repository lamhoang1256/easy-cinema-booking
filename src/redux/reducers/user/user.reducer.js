import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
} from "redux/constants/user/user.constant";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  userProfile: null,
  isLoading: true,
  errorLogin: null,
  errorRegister: null,
  errorUpdate: null,
};

export const user = (state = initialState, { type, payload }) => {
  switch (type) {
    // login user
    case LOGIN_USER_REQUEST:
      return { ...state };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return { ...state, userInfo: payload, errorLogin: null };
    case LOGIN_USER_FAIL:
      return { ...state, userInfo: null, errorLogin: payload };

    // register user
    case REGISTER_USER_REQUEST:
      return { ...state };
    case REGISTER_USER_SUCCESS:
      return { ...state, userInfo: payload, errorRegister: null };
    case REGISTER_USER_FAIL:
      return { ...state, userInfo: null, errorRegister: payload };

    // get profile user
    case GET_USER_PROFILE_REQUEST:
      return { ...state, isLoading: true };
    case GET_USER_PROFILE_SUCCESS:
      return { ...state, isLoading: false, userProfile: payload };
    case GET_USER_PROFILE_FAIL:
      return { ...state, isLoading: false, errorUpdate: payload };

    //update profile user
    case UPDATE_USER_PROFILE_REQUEST:
      return { ...state };
    case UPDATE_USER_PROFILE_SUCCESS:
      return { ...state };
    case UPDATE_USER_PROFILE_FAIL:
      return { ...state, errorUpdate: payload };

    // logout user
    case LOGOUT_USER:
      localStorage.removeItem("userInfo");
      return { ...state, userInfo: null, errorLogin: null, errorRegister: null, errorUpdate: null };

    default:
      return state;
  }
};
