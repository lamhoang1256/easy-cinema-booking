import {
  GET_CINEMA_FILTER_REQUEST,
  GET_CINEMA_FILTER_SUCCESS,
  GET_CINEMA_FILTER_FAIL,
  GET_OPENDAY_FILTER,
  GET_SHOWTIME_FILTER,
} from "../constants/movieFilter.constant";
const initialState = {
  dataCinema: null,
  dataOpenday: null,
  dataShowtime: null,
  error: null,
};

export const movieFilter = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CINEMA_FILTER_REQUEST:
      return { ...state };
    case GET_CINEMA_FILTER_SUCCESS:
      return { ...state, dataCinema: payload };
    case GET_CINEMA_FILTER_FAIL:
      return { ...state, error: payload };

    case GET_OPENDAY_FILTER:
      return { ...state, dataOpenday: payload };
    case GET_SHOWTIME_FILTER:
      return { ...state, dataShowtime: payload };

    default:
      return state;
  }
};
