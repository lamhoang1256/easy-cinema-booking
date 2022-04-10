import axiosClient from "apis/axiosClient";
import {
  GET_CINEMA_REQUEST,
  GET_CINEMA_SUCCESS,
  GET_CINEMA_FAIL,
} from "redux/constants/movieCinema.constant";

export const getCinemaAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CINEMA_REQUEST });
    const response = await axiosClient("QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP13");
    dispatch({ type: GET_CINEMA_SUCCESS, payload: response.data.content });
  } catch (error) {
    dispatch({ type: GET_CINEMA_FAIL });
    console.log(error);
  }
};
