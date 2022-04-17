import { moviesApi } from "apis/moviesApi";
import {
  MOVIE_SEARCH_FILM_REQUEST,
  MOVIE_SEARCH_FILM_SUCCESS,
  MOVIE_SEARCH_FILM_FAIL,
  MOVIE_SEARCH_CINEMA_REQUEST,
  MOVIE_SEARCH_CINEMA_SUCCESS,
  MOVIE_SEARCH_CINEMA_FAIL,
  MOVIE_SEARCH_OPENDAY,
  MOVIE_SEARCH_SHOWTIME,
  MOVIE_SEARCH_BOOKING_ID,
} from "redux/constants/movieSearch.constant";

// Chọn phim -> chọn rạp -> chọn ngày chiếu -> chọn suất chiếu
// lấy danh sách các tên phim
export const fetchMovieListToSearch = () => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_SEARCH_FILM_REQUEST });
    const { data } = await moviesApi.getMovieList("02");
    dispatch({ type: MOVIE_SEARCH_FILM_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: MOVIE_SEARCH_FILM_FAIL, payload: err });
  }
};

// lấy danh sách các rạp có chiếu phim vừa chọn
export const fetchCinemaListToSearch = (movieCode) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_SEARCH_CINEMA_REQUEST });
    const { data } = await moviesApi.getCalendarShow(movieCode);
    dispatch({ type: MOVIE_SEARCH_CINEMA_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: MOVIE_SEARCH_CINEMA_FAIL, payload: err });
  }
};

// lấy danh sách các ngày có chiếu phim ở rạp vừa chọn
export const fetchOpendayListToSearch = (data) => async (dispatch) => {
  dispatch({ type: MOVIE_SEARCH_OPENDAY, payload: data });
};

// lấy danh sách các suất chiếu có trong ngày vừa chọn
export const fetchShowtimeListToSearch = (data) => async (dispatch, useState) => {
  const { movieSearch } = useState();
  const opendayList = movieSearch.opendayList.filter(
    (item) => item.ngayChieuGioChieu.split("T")[0] === data.ngayChieuGioChieu.split("T")[0]
  );
  dispatch({ type: MOVIE_SEARCH_SHOWTIME, payload: opendayList });
};

// lấy mã phòng chiếu để tiến hành chuyển sang trang đặt vé
export const getIdToBooking = (idBooking) => async (dispatch) => {
  dispatch({ type: MOVIE_SEARCH_BOOKING_ID, payload: idBooking });
};
