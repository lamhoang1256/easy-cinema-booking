import {
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_FAIL,
} from "../constants/movieList.constant";

const initialState = { loading: true };

export const movieList = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MOVIE_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_MOVIE_LIST_SUCCESS:
      return { ...state, loading: false, data: payload };
    case GET_MOVIE_LIST_FAIL:
      return { ...state, loading: false, err: payload };
    default:
      return state;
  }
};
