import {
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
} from "../constants/movieComment.constant";

const initialState = { loadingComment: false };

export const movieComment = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COMMENT_REQUEST:
      return { ...state, loadingComment: true };
    case GET_COMMENT_SUCCESS:
      return { ...state, loadingComment: false, dataComment: payload };
    case GET_COMMENT_FAIL:
      return { ...state, loadingComment: false, error: payload };
    default:
      return state;
  }
};
