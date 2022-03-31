import axios from "axios";
import {
  GET_DETAIL_MOVIE_REQUEST,
  GET_DETAIL_MOVIE_SUCCESS,
  GET_DETAIL_MOVIE_FAIL,
} from "../constants/movieDetail.constant";

export const getDetailMovieAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_MOVIE_REQUEST });
    const { data } = await axios.get(
      `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      {
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzAiLCJIZXRIYW5TdHJpbmciOiIxNC8xMC8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NjU3MDU2MDAwMDAiLCJuYmYiOjE2Mzc0Mjc2MDAsImV4cCI6MTY2NTg1MzIwMH0.RAzH9H37ZyQ8ZT6A62fw3_bDfJOCq0A9vz08qT262EU",
        },
      }
    );
    dispatch({ type: GET_DETAIL_MOVIE_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: GET_DETAIL_MOVIE_FAIL, payload: err });
  }
};
