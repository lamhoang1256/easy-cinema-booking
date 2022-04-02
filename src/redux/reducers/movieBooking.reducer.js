import {
  GET_MOVIE_BOOKING_REQUEST,
  GET_MOVIE_BOOKING_SUCCESS,
  GET_MOVIE_BOOKING_FAIL,
} from "../constants/movieBooking.constant";

const initialState = { loading: true };

export const movieBooking = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MOVIE_BOOKING_REQUEST:
      return { ...state, loading: true };
    case GET_MOVIE_BOOKING_SUCCESS:
      return { ...state, loading: false, dataMovieBooking: payload };
    case GET_MOVIE_BOOKING_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
