import axios from "axios";
import axiosClient from "apis/axiosClient";
import {
  GET_DETAIL_MOVIE_REQUEST,
  GET_DETAIL_MOVIE_SUCCESS,
  GET_DETAIL_MOVIE_FAIL,
  GET_DETAIL_CINEMA_REQUEST,
  GET_DETAIL_CINEMA_SUCCESS,
  GET_DETAIL_CINEMA_FAIL,
  GET_DETAIL_COMMENT_REQUEST,
  GET_DETAIL_COMMENT_SUCCESS,
  GET_DETAIL_COMMENT_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
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

// lấy thông tin phim chi tiết qua id
export const postCommentAction = (dataToPostComment) => async (dispatch) => {
  try {
    dispatch({ type: POST_COMMENT_REQUEST });
    const { data } = await axiosClient.post(
      `https://62459f866b7ecf057c216c44.mockapi.io/api/comments`,
      dataToPostComment
    );
    dispatch({ type: POST_COMMENT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: POST_COMMENT_FAIL, payload: err });
  }
};

// lấy danh sách cụm rạp đang chiếu phim này
export const getCinemaDetailMovieAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_CINEMA_REQUEST });
    const { data } = await axiosClient.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);

    // kiểm tra có lịch chiếu hay không, nếu không có thông báo hiện tại chưa có lịch chiếu
    const isEmptyData = data.content.heThongRapChieu?.length === 0;
    const heThongRapChieu = data.content.heThongRapChieu;

    // BƯỚC 1: tạo mảng chứa tất cả maLichChieu,
    // thêm một số property sử dụng cho việc hiển thị dữ liệu: tenHeThongRap, tenCumRap, logo
    const arrayAllLichChieuPhimAddProp = heThongRapChieu?.reduce((colect1, heThongRapChieuItem) => {
      return [
        ...colect1,
        ...heThongRapChieuItem.cumRapChieu?.reduce((colect2, cumRapChieuItem) => {
          return [
            ...colect2,
            ...cumRapChieuItem.lichChieuPhim?.reduce((colect3, lichChieuPhimItem) => {
              return [
                ...colect3,
                {
                  ...lichChieuPhimItem,
                  tenHeThongRap: heThongRapChieuItem.tenHeThongRap,
                  tenCumRap: cumRapChieuItem.tenCumRap,
                  logo: heThongRapChieuItem.logo,
                },
              ];
            }, []),
          ];
        }, []),
      ];
    }, []);

    // BƯỚC 2: tạo mảng ngày
    const arrayDay = [
      ...new Set(arrayAllLichChieuPhimAddProp?.map((item) => item.ngayChieuGioChieu?.slice(0, 10))),
    ].sort();

    // BƯỚC 3: dựa trên mảng ngày, tạo ra mảng dữ liệu chính bằng cách lọc ra item theo ngày
    // sau đó return về arrayHeThongRapChieuFilterByDay để render
    const arrayHeThongRapChieuFilterByDay = arrayDay.map((date) => {
      const arrayLichChieuPhimFilterByDay = arrayAllLichChieuPhimAddProp.filter(
        (item) => item.ngayChieuGioChieu.slice(0, 10) === date
      );

      const arrayHeThongRapRemoveDup = arrayLichChieuPhimFilterByDay?.filter(
        (itemIncrease, indexIncrease, arr) =>
          indexIncrease === arr.findIndex((t) => t.tenHeThongRap === itemIncrease.tenHeThongRap)
      );
      const arrayHeThongRapItem = arrayHeThongRapRemoveDup.map((heThongRapItem) => {
        const arrayLichChieuPhimFilterByHeThongRap = arrayLichChieuPhimFilterByDay?.filter(
          (item) => item.tenHeThongRap === heThongRapItem.tenHeThongRap
        );
        const arrayCumRapChieuRemoveDup = arrayLichChieuPhimFilterByHeThongRap?.filter(
          (itemIncrease, indexIncrease, arr) =>
            indexIncrease === arr.findIndex((t) => t.tenCumRap === itemIncrease.tenCumRap)
        );

        const cumRapChieu = arrayCumRapChieuRemoveDup.map((cumRapChieu) => {
          const lichChieuPhim = arrayLichChieuPhimFilterByHeThongRap.filter(
            (lichChieuPhim) => lichChieuPhim.tenCumRap === cumRapChieu.tenCumRap
          );
          return {
            tenCumRap: cumRapChieu.tenCumRap,
            maLichChieu: cumRapChieu.maLichChieu,
            lichChieuPhim,
          };
        });
        return {
          tenHeThongRap: heThongRapItem.tenHeThongRap,
          logo: heThongRapItem.logo,
          cumRapChieu,
        };
      });

      return { date, heThongRap: arrayHeThongRapItem };
    });
    console.log(arrayHeThongRapChieuFilterByDay, isEmptyData);
    // return { arrayHeThongRapChieuFilterByDay, isEmptyData };

    dispatch({ type: GET_DETAIL_CINEMA_SUCCESS, payload: arrayHeThongRapChieuFilterByDay });
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
