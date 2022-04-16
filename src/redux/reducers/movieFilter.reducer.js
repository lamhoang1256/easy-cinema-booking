import {
  GET_CINEMA_FILTER_REQUEST,
  GET_CINEMA_FILTER_SUCCESS,
  GET_CINEMA_FILTER_FAIL,
} from "../constants/movieFilter.constant";
const initialState = {
  dataCinema: null,
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

    default:
      return state;
  }
};
