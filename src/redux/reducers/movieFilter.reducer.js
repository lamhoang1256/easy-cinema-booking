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
} from "../../constants/movie/movieFilter.constant";
const initialState = {
  movieList: null,
  cinemaList: null,
  opendayList: null,
  showtimeList: null,
  idTicketRoom: null,
  error: null,
};

export const movieFilter = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FILTER_FILM_REQUEST:
      return {
        ...state,
        cinemaList: null,
        opendayList: null,
        showtimeList: null,
        idTicketRoom: null,
      };
    case GET_FILTER_FILM_SUCCESS:
      return { ...state, movieList: payload };
    case GET_FILTER_FILM_FAIL:
      return { ...state, error: payload };

    case GET_FILTER_CINEMA_REQUEST:
      return { ...state, opendayList: null, showtimeList: null, idTicketRoom: null };
    case GET_FILTER_CINEMA_SUCCESS:
      return { ...state, cinemaList: payload };
    case GET_FILTER_CINEMA_FAIL:
      return { ...state, error: payload };

    case GET_FILTER_OPENDAY:
      return { ...state, opendayList: payload, showtimeList: null, idTicketRoom: null };

    case GET_FILTER_SHOWTIME:
      return { ...state, showtimeList: payload, idTicketRoom: null };
    case GET_FILTER_BOOKING_ID:
      return { ...state, idTicketRoom: payload };

    default:
      return state;
  }
};
