import axiosClient from "apis/axiosClient";
import {
  GET_DETAIL_MOVIE_REQUEST,
  GET_DETAIL_MOVIE_SUCCESS,
  GET_DETAIL_MOVIE_FAIL,
} from "../constants/movieDetail.constant";

export const getDetailMovieAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_MOVIE_REQUEST });
    const { data } = await axiosClient.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
    dispatch({ type: GET_DETAIL_MOVIE_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: GET_DETAIL_MOVIE_FAIL, payload: err });
  }
};
