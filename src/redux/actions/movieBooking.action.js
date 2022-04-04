import axios from "axios";
import {
  GET_MOVIE_BOOKING_REQUEST,
  GET_MOVIE_BOOKING_SUCCESS,
  GET_MOVIE_BOOKING_FAIL,
} from "../constants/movieBooking.constant";

export const getMovieBookingAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MOVIE_BOOKING_REQUEST });
    const response = await axios.get(
      "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=40343",
      {
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzAiLCJIZXRIYW5TdHJpbmciOiIxNC8xMC8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NjU3MDU2MDAwMDAiLCJuYmYiOjE2Mzc0Mjc2MDAsImV4cCI6MTY2NTg1MzIwMH0.RAzH9H37ZyQ8ZT6A62fw3_bDfJOCq0A9vz08qT262EU",
        },
      }
    );
    dispatch({ type: GET_MOVIE_BOOKING_SUCCESS, payload: response.data.content });
  } catch (err) {
    dispatch({ type: GET_MOVIE_BOOKING_FAIL, payload: err });
  }
};
