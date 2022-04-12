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
} from "../constants/movieDetail.constant";

const initialState = { loading: true, loadingComment: false, dataCinema: null };

export const movieDetail = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DETAIL_MOVIE_REQUEST:
      return { ...state, loading: true };
    case GET_DETAIL_MOVIE_SUCCESS:
      return { ...state, loading: false, data: payload };
    case GET_DETAIL_MOVIE_FAIL:
      return { ...state, loading: false, error: payload };

    // danh sách rạp đang chiếu phim này
    case GET_DETAIL_CINEMA_REQUEST:
      return { ...state, loadingCinema: true };
    case GET_DETAIL_CINEMA_SUCCESS:
      return { ...state, loadingCinema: false, dataCinema: payload };
    case GET_DETAIL_CINEMA_FAIL:
      return { ...state, loadingCinema: false, error: payload };

    //comment
    case GET_DETAIL_COMMENT_REQUEST:
      return { ...state, loadingComment: true };
    case GET_DETAIL_COMMENT_SUCCESS:
      return { ...state, loadingComment: false, dataComment: payload };
    case GET_DETAIL_COMMENT_FAIL:
      return { ...state, loadingComment: false, error: payload };
    default:
      return state;
  }
};
