import { moviesApi } from "apis/moviesApi";
import {
  GET_FILTER_FILM_REQUEST,
  GET_FILTER_FILM_SUCCESS,
  GET_FILTER_FILM_FAIL,
  GET_FILTER_CINEMA_REQUEST,
  GET_FILTER_CINEMA_SUCCESS,
  GET_FILTER_CINEMA_FAIL,
  GET_FILTER_OPENDAY,
  GET_FILTER_SHOWTIME,
  GET_FILTER_BOOKING_ID,
} from "redux/constants/movie/movieFilter.constant";

// Chọn phim -> chọn rạp -> chọn ngày chiếu -> chọn suất chiếu
// lấy danh sách các tên phim
export const fetchMovieListToSearch = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FILTER_FILM_REQUEST });
    const { data } = await moviesApi.getMovieListApi("02");
    dispatch({ type: GET_FILTER_FILM_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({ type: GET_FILTER_FILM_FAIL, payload: error });
  }
};

// lấy danh sách các rạp có chiếu phim vừa chọn
export const fetchCinemaListToSearch = (movieCode) => async (dispatch) => {
  try {
    dispatch({ type: GET_FILTER_CINEMA_REQUEST });
    const { data } = await moviesApi.getCalendarShowApi(movieCode);
    dispatch({ type: GET_FILTER_CINEMA_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({ type: GET_FILTER_CINEMA_FAIL, payload: error });
  }
};

// lấy danh sách các ngày có chiếu phim ở rạp vừa chọn
export const fetchOpendayListToSearch = (data) => async (dispatch) => {
  dispatch({ type: GET_FILTER_OPENDAY, payload: data });
};

// lấy danh sách các suất chiếu có trong ngày vừa chọn
export const fetchShowtimeListToSearch = (data) => async (dispatch, useState) => {
  const { movieFilter } = useState();
  const opendayList = movieFilter.opendayList.filter(
    (openday) => openday.ngayChieuGioChieu.split("T")[0] === data.ngayChieuGioChieu.split("T")[0]
  );
  dispatch({ type: GET_FILTER_SHOWTIME, payload: opendayList });
};

// lấy mã phòng chiếu để tiến hành chuyển sang trang đặt vé
export const getIdToBooking = (idTicketRoom) => async (dispatch) => {
  dispatch({ type: GET_FILTER_BOOKING_ID, payload: idTicketRoom });
};
