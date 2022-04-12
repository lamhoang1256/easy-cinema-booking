import axios from "axios";
import moment from "moment";
import axiosClient from "apis/axiosClient";
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

// lấy danh sách cụm rạp đang chiếu phim này
export const getCinemaDetailMovieAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_CINEMA_REQUEST });
    const { data } = await axiosClient.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
    console.log(data.content.heThongRapChieu);

    // lọc lấy tất cả các ngày có chiếu phim này
    const arrDay = data.content.heThongRapChieu.map((cinema) => {
      // console.log(cinema);
      return cinema.cumRapChieu.map((showtime) => {
        return showtime.lichChieuPhim.map((openday) => {
          return moment(openday.ngayChieuGioChieu).utc().format("DD/MM/YYYY");
        });
      });
    });

    // gộp các ngày riêng lẻ thành 1 mảng và không trùng lặp các ngày với nhau (sắp xếp tăng dần)
    const filterDay = arrDay.map((item) => {
      let arrUniqueDay = [];
      item.map((e) => (arrUniqueDay = arrUniqueDay.concat(e)));
      return [...new Set(arrUniqueDay)].sort((a, b) => a - b);
    });
    console.log(filterDay);

    dispatch({ type: GET_DETAIL_CINEMA_SUCCESS, payload: data.content });
  } catch (err) {
    dispatch({ type: GET_DETAIL_CINEMA_FAIL, payload: err });
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
