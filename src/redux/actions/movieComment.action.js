import axios from "axios";
import {
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
} from "../constants/movieComment.constant";

export const getCommentMovieAction = (idMovie) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST });
    const response = await axios.get("https://62459f866b7ecf057c216c44.mockapi.io/api/comments");
    //lấy ra các comment có mã phim trùng với mã phim trên url của trang hiện tại
    const dataComment = response.data.filter((comment) => comment.idMovie == idMovie);
    dispatch({ type: GET_COMMENT_SUCCESS, payload: dataComment });
  } catch (err) {
    dispatch({ type: GET_COMMENT_FAIL, payload: err });
  }
};
