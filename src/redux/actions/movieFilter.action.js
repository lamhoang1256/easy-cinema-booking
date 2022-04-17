import axiosClient from "apis/axiosClient";
import {
  GET_CINEMA_FILTER_REQUEST,
  GET_CINEMA_FILTER_SUCCESS,
  GET_CINEMA_FILTER_FAIL,
  GET_OPENDAY_FILTER,
  GET_SHOWTIME_FILTER,
} from "redux/constants/movieFilter.constant";

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
  dispatch({ type: GET_OPENDAY_FILTER, payload: data });
};

export const getShowtimeFilterAction = (data) => async (dispatch, useState) => {
  const { movieFilter } = useState();
  const dataShowtime = movieFilter.dataOpenday.filter(
    (item) => item.ngayChieuGioChieu.split("T")[0] === data.ngayChieuGioChieu.split("T")[0]
  );
  dispatch({ type: GET_SHOWTIME_FILTER, payload: dataShowtime });
};
