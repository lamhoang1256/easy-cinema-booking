import axios from "axios";
import axiosClient from "apis/axiosClient";
import {
  GET_DETAIL_MOVIE_REQUEST,
  GET_DETAIL_MOVIE_SUCCESS,
  GET_DETAIL_MOVIE_FAIL,
  GET_DETAIL_COMMENT_REQUEST,
  GET_DETAIL_COMMENT_SUCCESS,
  GET_DETAIL_COMMENT_FAIL,
} from "../constants/movieDetail.constant";

// lấy thông tin phim chi tiết qua id
export const getDetailMovieAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_MOVIE_REQUEST });
    const { data } = await axiosClient.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
    dispatch({ type: GET_DETAIL_MOVIE_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: GET_DETAIL_MOVIE_FAIL, payload: err });
  }
};

// lấy danh sách bình luận về phim
export const getCommentMovieAction = (idMovie) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_COMMENT_REQUEST });
    const response = await axios.get("https://62459f866b7ecf057c216c44.mockapi.io/api/comments");
    //lấy ra các comment có mã phim trùng với mã phim trên url của trang hiện tại
    const dataComment = response.data.filter((comment) => comment.idMovie == idMovie);
    dispatch({ type: GET_DETAIL_COMMENT_SUCCESS, payload: dataComment });
  } catch (err) {
    dispatch({ type: GET_DETAIL_COMMENT_FAIL, payload: err });
  }
};
