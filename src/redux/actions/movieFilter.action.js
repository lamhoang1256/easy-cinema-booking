import axiosClient from "apis/axiosClient";
import {
  GET_CINEMA_FILTER_REQUEST,
  GET_CINEMA_FILTER_SUCCESS,
  GET_CINEMA_FILTER_FAIL,
} from "redux/constants/movieFilter.constant";

export const getCinemaFilterAction = (idMovie) => async (dispatch) => {
  try {
    dispatch({ type: GET_CINEMA_FILTER_REQUEST });
    const { data } = await axiosClient.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idMovie}`);
    console.log(data.content);
    dispatch({ type: GET_CINEMA_FILTER_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: GET_CINEMA_FILTER_FAIL, payload: err });
  }
};
