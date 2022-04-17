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
} from "../constants/movieSearch.constant";
const initialState = {
  movieList: null,
  cinemaList: null,
  opendayList: null,
  showtimeList: null,
  idBooking: null,
  error: null,
};

export const movieSearch = (state = initialState, { type, payload }) => {
  switch (type) {
    case MOVIE_SEARCH_FILM_REQUEST:
      return {
        ...state,
        cinemaList: null,
        opendayList: null,
        showtimeList: null,
        idBooking: null,
      };
    case MOVIE_SEARCH_FILM_SUCCESS:
      return { ...state, movieList: payload };
    case MOVIE_SEARCH_FILM_FAIL:
      return { ...state, error: payload };

    case MOVIE_SEARCH_CINEMA_REQUEST:
      return { ...state, opendayList: null, showtimeList: null, idBooking: null };
    case MOVIE_SEARCH_CINEMA_SUCCESS:
      return { ...state, cinemaList: payload };
    case MOVIE_SEARCH_CINEMA_FAIL:
      return { ...state, error: payload };

    case MOVIE_SEARCH_OPENDAY:
      return { ...state, opendayList: payload, showtimeList: null, idBooking: null };

    case MOVIE_SEARCH_SHOWTIME:
      return { ...state, showtimeList: payload, idBooking: null };
    case MOVIE_SEARCH_BOOKING_ID:
      return { ...state, idBooking: payload };

    default:
      return state;
  }
};
