import axiosClient from "apis/axiosClient";
import {
  GET_MOVIE_FILTER_REQUEST,
  GET_MOVIE_FILTER_SUCCESS,
  GET_MOVIE_FILTER_FAIL,
  GET_CINEMA_FILTER_REQUEST,
  GET_CINEMA_FILTER_SUCCESS,
  GET_CINEMA_FILTER_FAIL,
  GET_OPENDAY_FILTER,
  GET_SHOWTIME_FILTER,
  GET_ID_BOOKING,
  GET_OPENDAY_FILTER_START,
  GET_OPENDAY_FILTER_FINISH,
} from "redux/constants/movieFilter.constant";

export const getMovieFilterAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MOVIE_FILTER_REQUEST });
    const { data } = await axiosClient.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP02`);
    dispatch({ type: GET_MOVIE_FILTER_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: GET_MOVIE_FILTER_FAIL, payload: err });
  }
};

export const getCinemaFilterAction = (idMovie) => async (dispatch) => {
  try {
    dispatch({ type: GET_CINEMA_FILTER_REQUEST });
    const { data } = await axiosClient.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idMovie}`);
    dispatch({ type: GET_CINEMA_FILTER_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: GET_CINEMA_FILTER_FAIL, payload: err });
  }
};

export const getDayFilterAction = (data) => async (dispatch) => {
  dispatch({ type: GET_OPENDAY_FILTER_START });
  dispatch({ type: GET_OPENDAY_FILTER_FINISH, payload: data });
};

export const getShowtimeFilterAction = (data) => async (dispatch, useState) => {
  const { movieFilter } = useState();
  const dataShowtime = movieFilter.dataOpenday.filter(
    (item) => item.ngayChieuGioChieu.split("T")[0] === data.ngayChieuGioChieu.split("T")[0]
  );
  dispatch({ type: GET_SHOWTIME_FILTER, payload: dataShowtime });
};

export const getIdBookingAction = (idBooking) => async (dispatch) => {
  dispatch({ type: GET_ID_BOOKING, payload: idBooking });
};
