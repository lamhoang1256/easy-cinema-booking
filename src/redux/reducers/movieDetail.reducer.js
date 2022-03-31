import {
  GET_DETAIL_MOVIE_REQUEST,
  GET_DETAIL_MOVIE_SUCCESS,
  GET_DETAIL_MOVIE_FAIL,
} from "../constants/movieDetail.constant";

const initialState = { loading: true };

export const movieDetail = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DETAIL_MOVIE_REQUEST:
      return { ...state, loading: true };
    case GET_DETAIL_MOVIE_SUCCESS:
      return { ...state, loading: false, data: payload };
    case GET_DETAIL_MOVIE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
