import { moviesApi } from "apis/moviesApi";
import {
  MOVIE_FILTER_FILM_REQUEST,
  MOVIE_FILTER_FILM_SUCCESS,
  MOVIE_FILTER_FILM_FAIL,
  MOVIE_FILTER_CINEMA_REQUEST,
  MOVIE_FILTER_CINEMA_SUCCESS,
  MOVIE_FILTER_CINEMA_FAIL,
  MOVIE_FILTER_OPENDAY,
  MOVIE_FILTER_SHOWTIME,
  MOVIE_FILTER_BOOKING_ID,
} from "redux/constants/movieFilter.constant";

// Chọn phim -> chọn rạp -> chọn ngày chiếu -> chọn suất chiếu
// lấy danh sách các tên phim
export const fetchMovieListToSearch = () => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_FILTER_FILM_REQUEST });
    const { data } = await moviesApi.getMovieList("02");
    dispatch({ type: MOVIE_FILTER_FILM_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: MOVIE_FILTER_FILM_FAIL, payload: err });
  }
};

// lấy danh sách các rạp có chiếu phim vừa chọn
export const fetchCinemaListToSearch = (movieCode) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_FILTER_CINEMA_REQUEST });
    const { data } = await moviesApi.getCalendarShow(movieCode);
    dispatch({ type: MOVIE_FILTER_CINEMA_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: MOVIE_FILTER_CINEMA_FAIL, payload: err });
  }
};

// lấy danh sách các ngày có chiếu phim ở rạp vừa chọn
export const fetchOpendayListToSearch = (data) => async (dispatch) => {
  dispatch({ type: MOVIE_FILTER_OPENDAY, payload: data });
};

// lấy danh sách các suất chiếu có trong ngày vừa chọn
export const fetchShowtimeListToSearch = (data) => async (dispatch, useState) => {
  const { movieFilter } = useState();
  const opendayList = movieFilter.opendayList.filter(
    (openday) => openday.ngayChieuGioChieu.split("T")[0] === data.ngayChieuGioChieu.split("T")[0]
  );
  dispatch({ type: MOVIE_FILTER_SHOWTIME, payload: opendayList });
};

// lấy mã phòng chiếu để tiến hành chuyển sang trang đặt vé
export const getIdToBooking = (idBooking) => async (dispatch) => {
  dispatch({ type: MOVIE_FILTER_BOOKING_ID, payload: idBooking });
};
