import {
  GET_MOVIE_DETAIL_REQUEST,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_FAIL,
  GET_CALENDAR_SHOW_REQUEST,
  GET_CALENDAR_SHOW_SUCCESS,
  GET_CALENDAR_SHOW_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
} from "../../constants/movie/movieDetail.constant";

const initialState = {
  isLoading: true,
  movieDetail: null,
  calendarShowList: null,
  commentList: null,
  togglePostComment: false,
  error: null,
};

export const movieDetail = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MOVIE_DETAIL_REQUEST:
      return { ...state, isLoading: true };
    case GET_MOVIE_DETAIL_SUCCESS:
      return { ...state, isLoading: false, movieDetail: payload };
    case GET_MOVIE_DETAIL_FAIL:
      return { ...state, isLoading: false, error: payload };

    // get danh sách lịch chiếu phim
    case GET_CALENDAR_SHOW_REQUEST:
      return { ...state };
    case GET_CALENDAR_SHOW_SUCCESS:
      return { ...state, calendarShowList: payload };
    case GET_CALENDAR_SHOW_FAIL:
      return { ...state, error: payload };

    // get danh sách comment
    case GET_COMMENTS_REQUEST:
      return { ...state };
    case GET_COMMENTS_SUCCESS:
      return { ...state, commentList: payload };
    case GET_COMMENTS_FAIL:
      return { ...state, error: payload };

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
