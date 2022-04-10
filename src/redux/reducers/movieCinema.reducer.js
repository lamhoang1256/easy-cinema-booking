import {
  GET_CINEMA_REQUEST,
  GET_CINEMA_SUCCESS,
  GET_CINEMA_FAIL,
} from "redux/constants/movieCinema.constant";

const initialState = {
  isLoading: true,
  dataCinema: null,
};

export const movieCinema = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CINEMA_REQUEST:
      return { ...state, isLoading: true };
    case GET_CINEMA_SUCCESS:
      return { ...state, isLoading: false, dataCinema: payload };
    case GET_CINEMA_FAIL:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
