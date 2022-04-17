import {
  GET_CINEMA_FILTER_REQUEST,
  GET_CINEMA_FILTER_SUCCESS,
  GET_CINEMA_FILTER_FAIL,
  GET_OPENDAY_FILTER,
  GET_SHOWTIME_FILTER,
  GET_ID_BOOKING,
} from "../constants/movieFilter.constant";
const initialState = {
  dataCinema: null,
  dataOpenday: null,
  dataShowtime: null,
  idBooking: null,
  error: null,
};

export const movieFilter = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CINEMA_FILTER_REQUEST:
      return { ...state, dataCinema: null, dataOpenday: null, dataShowtime: null, idBooking: null };
    case GET_CINEMA_FILTER_SUCCESS:
      return { ...state, dataCinema: payload };
    case GET_CINEMA_FILTER_FAIL:
      return { ...state, error: payload };

    case GET_OPENDAY_FILTER:
      return { ...state, dataOpenday: payload, dataShowtime: null, idBooking: null };
    case GET_SHOWTIME_FILTER:
      return { ...state, dataShowtime: payload, idBooking: null };
    case GET_ID_BOOKING:
      return { ...state, idBooking: payload };

    default:
      return state;
  }
};
