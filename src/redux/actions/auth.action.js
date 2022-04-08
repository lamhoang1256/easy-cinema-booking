import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "redux/constants/auth.constants";

export const loginAction = (dataToLogin) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const response = await axios.post(
      "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      // { taiKhoan: "nguyenlam", matKhau: "nguyenlam13" },
      dataToLogin,
      {
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzAiLCJIZXRIYW5TdHJpbmciOiIxNC8xMC8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NjU3MDU2MDAwMDAiLCJuYmYiOjE2Mzc0Mjc2MDAsImV4cCI6MTY2NTg1MzIwMH0.RAzH9H37ZyQ8ZT6A62fw3_bDfJOCq0A9vz08qT262EU",
        },
      }
    );
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.content });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};

export const registerAction = (dataToRegister) => async (dispatch) => {
  try {
    console.log(dataToRegister);
    dispatch({ type: REGISTER_REQUEST });
    const response = await axios.post(
      "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      dataToRegister,
      {
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzAiLCJIZXRIYW5TdHJpbmciOiIxNC8xMC8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NjU3MDU2MDAwMDAiLCJuYmYiOjE2Mzc0Mjc2MDAsImV4cCI6MTY2NTg1MzIwMH0.RAzH9H37ZyQ8ZT6A62fw3_bDfJOCq0A9vz08qT262EU",
        },
      }
    );
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.content });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};

// {
//   "statusCode": 200,
//   "message": "Xử lý thành công!",
//   "content": {
//     "taiKhoan": "nguyenlam",
//     "hoTen": "Nguyen Hoang Lam",
//     "email": "nguyenlam13@gmail.com",
//     "soDT": null,
//     "maNhom": "GP00",
//     "maLoaiNguoiDung": "KhachHang",
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibmd1eWVubGFtIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibmd1eWVubGFtMTNAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIktoYWNoSGFuZyIsIm5ndXllbmxhbTEzQGdtYWlsLmNvbSIsIkdQMDAiXSwibmJmIjoxNjQ5MzE4NTkxLCJleHAiOjE2NDkzMjIxOTF9.GGP_SHcdwpWpmt2E0TqXawuOqHDmLofilSKTfKk11PM"
//   },
//   "dateTime": "2022-04-07T15:03:11.2608667+07:00",
//   "messageConstants": null
// }
