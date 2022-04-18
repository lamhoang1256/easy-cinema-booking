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
} from "../constants/movieFilter.constant";
const initialState = {
  movieList: null,
  cinemaList: null,
  opendayList: null,
  showtimeList: null,
  idBooking: null,
  error: null,
};

export const movieFilter = (state = initialState, { type, payload }) => {
  switch (type) {
    case MOVIE_FILTER_FILM_REQUEST:
      return {
        ...state,
        cinemaList: null,
        opendayList: null,
        showtimeList: null,
        idBooking: null,
      };
    case MOVIE_FILTER_FILM_SUCCESS:
      return { ...state, movieList: payload };
    case MOVIE_FILTER_FILM_FAIL:
      return { ...state, error: payload };

    case MOVIE_FILTER_CINEMA_REQUEST:
      return { ...state, opendayList: null, showtimeList: null, idBooking: null };
    case MOVIE_FILTER_CINEMA_SUCCESS:
      return { ...state, cinemaList: payload };
    case MOVIE_FILTER_CINEMA_FAIL:
      return { ...state, error: payload };

    case MOVIE_FILTER_OPENDAY:
      return { ...state, opendayList: payload, showtimeList: null, idBooking: null };

    case MOVIE_FILTER_SHOWTIME:
      return { ...state, showtimeList: payload, idBooking: null };
    case MOVIE_FILTER_BOOKING_ID:
      return { ...state, idBooking: payload };

    default:
      return state;
  }
};
