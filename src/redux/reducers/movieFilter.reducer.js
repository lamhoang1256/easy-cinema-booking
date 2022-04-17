import {
  GET_MOVIE_FILTER_REQUEST,
  GET_MOVIE_FILTER_SUCCESS,
  GET_MOVIE_FILTER_FAIL,
  GET_CINEMA_FILTER_REQUEST,
  GET_CINEMA_FILTER_SUCCESS,
  GET_CINEMA_FILTER_FAIL,
  GET_OPENDAY_FILTER_START,
  GET_OPENDAY_FILTER_FINISH,
  GET_SHOWTIME_FILTER,
  GET_ID_BOOKING,
} from "../constants/movieFilter.constant";
const initialState = {
  dataMovie: null,
  dataCinema: null,
  dataOpenday: null,
  dataShowtime: null,
  idBooking: null,
  error: null,
};

export const movieFilter = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MOVIE_FILTER_REQUEST:
      return {
        ...state,
        dataMovie: null,
        dataCinema: null,
        dataOpenday: null,
        dataShowtime: null,
        idBooking: null,
      };
    case GET_MOVIE_FILTER_SUCCESS:
      return { ...state, dataMovie: payload };
    case GET_MOVIE_FILTER_FAIL:
      return { ...state, error: payload };

    case GET_CINEMA_FILTER_REQUEST:
      return { ...state, dataCinema: null, dataOpenday: null, dataShowtime: null, idBooking: null };
    case GET_CINEMA_FILTER_SUCCESS:
      return { ...state, dataCinema: payload };
    case GET_CINEMA_FILTER_FAIL:
      return { ...state, error: payload };

    case GET_OPENDAY_FILTER_START:
      return { ...state, dataOpenday: null, dataShowtime: null, idBooking: null };
    case GET_OPENDAY_FILTER_FINISH:
      return { ...state, dataOpenday: payload };

    case GET_SHOWTIME_FILTER:
      return { ...state, dataShowtime: payload, idBooking: null };
    case GET_ID_BOOKING:
      return { ...state, idBooking: payload };

    default:
      return state;
  }
};
