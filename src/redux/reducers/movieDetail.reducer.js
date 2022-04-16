import {
  GET_DETAIL_MOVIE_REQUEST,
  GET_DETAIL_MOVIE_SUCCESS,
  GET_DETAIL_MOVIE_FAIL,
  GET_DETAIL_COMMENT_REQUEST,
  GET_DETAIL_COMMENT_SUCCESS,
  GET_DETAIL_COMMENT_FAIL,
  GET_DETAIL_CINEMA_REQUEST,
  GET_DETAIL_CINEMA_SUCCESS,
  GET_DETAIL_CINEMA_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
} from "../constants/movieDetail.constant";

const initialState = {
  loading: true,
  loadingComment: false,
  error: null,
  dataMovie: null,
  dataCinema: null,
  dataComment: null,
  togglePostComment: false,
};

export const movieDetail = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DETAIL_MOVIE_REQUEST:
      return { ...state, loading: true };
    case GET_DETAIL_MOVIE_SUCCESS:
      return { ...state, loading: false, dataMovie: payload };
    case GET_DETAIL_MOVIE_FAIL:
      return { ...state, loading: false, error: payload };

    // danh sách rạp đang chiếu phim này
    case GET_DETAIL_CINEMA_REQUEST:
      return { ...state, loadingCinema: true };
    case GET_DETAIL_CINEMA_SUCCESS:
      return { ...state, loadingCinema: false, dataCinema: payload };
    case GET_DETAIL_CINEMA_FAIL:
      return { ...state, loadingCinema: false, error: payload };

    // get comment
    case GET_DETAIL_COMMENT_REQUEST:
      return { ...state, loadingComment: true };
    case GET_DETAIL_COMMENT_SUCCESS:
      return { ...state, loadingComment: false, dataComment: payload };
    case GET_DETAIL_COMMENT_FAIL:
      return { ...state, loadingComment: false, error: payload };

    // add new comment
    case POST_COMMENT_REQUEST:
      return { ...state };
    case POST_COMMENT_SUCCESS:
      return { ...state, togglePostComment: !state.togglePostComment };
    case POST_COMMENT_FAIL:
      return { ...state, error: payload };
    default:
      return state;
  }
};
