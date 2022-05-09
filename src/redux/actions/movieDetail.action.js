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
import { moviesApi } from "apis/moviesApi";
import { commentsApi } from "apis/commentsApi";

// lấy thông tin phim chi tiết qua id
export const getMovieDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_MOVIE_DETAIL_REQUEST });
    const { data } = await moviesApi.getMovieDetailApi(id);
    dispatch({ type: GET_MOVIE_DETAIL_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({ type: GET_MOVIE_DETAIL_FAIL, payload: error });
  }
};

// lấy danh sách cụm rạp đang chiếu phim này
export const getCalendarShowMovieDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CALENDAR_SHOW_REQUEST });
    const { data } = await moviesApi.getCalendarShowApi(id);

    const systemCinema = data.content.heThongRapChieu;
    // tạo mảng chứa tất cả maLichChieu và thêm một số property sử dụng cho việc hiển thị dữ liệu: tenHeThongRap, tenCumRap, logo
    const calendarShowList = systemCinema?.reduce((colect1, systemCinemaItem) => {
      return [
        ...colect1,
        ...systemCinemaItem.cumRapChieu?.reduce((colect2, cumRapChieuItem) => {
          return [
            ...colect2,
            ...cumRapChieuItem.lichChieuPhim?.reduce((colect3, lichChieuPhimItem) => {
              return [
                ...colect3,
                {
                  ...lichChieuPhimItem,
                  tenHeThongRap: systemCinemaItem.tenHeThongRap,
                  tenCumRap: cumRapChieuItem.tenCumRap,
                  logo: systemCinemaItem.logo,
                },
              ];
            }, []),
          ];
        }, []),
      ];
    }, []);

    // tạo mảng ngày không bị trùng lặp và sắp xếp lại thứ tự
    const arrayDay = [
      ...new Set(calendarShowList?.map((item) => item.ngayChieuGioChieu?.slice(0, 10))),
    ].sort();

    // dựa trên mảng ngày vừa tạo, tạo ra mảng dữ liệu chính bằng cách lọc ra item theo ngày
    // sau đó return về systemCinemaFilterByDay để render
    const systemCinemaFilterByDay = arrayDay.map((date) => {
      const calendarShowListFilterByDay = calendarShowList.filter(
        (item) => item.ngayChieuGioChieu.slice(0, 10) === date
      );

      const systemCinemaRemoveDuplicate = calendarShowListFilterByDay?.filter(
        (itemIncrease, indexIncrease, arr) =>
          indexIncrease === arr.findIndex((t) => t.tenHeThongRap === itemIncrease.tenHeThongRap)
      );
      const systemCinema = systemCinemaRemoveDuplicate.map((heThongRapItem) => {
        const calendarShowListFilterBySystemCinema = calendarShowListFilterByDay?.filter(
          (item) => item.tenHeThongRap === heThongRapItem.tenHeThongRap
        );
        const cinemaGroupRemoveDuplicate = calendarShowListFilterBySystemCinema?.filter(
          (itemIncrease, indexIncrease, arr) =>
            indexIncrease === arr.findIndex((t) => t.tenCumRap === itemIncrease.tenCumRap)
        );

        const cumRapChieu = cinemaGroupRemoveDuplicate.map((cumRapChieu) => {
          const lichChieuPhim = calendarShowListFilterBySystemCinema.filter(
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
      return { date, heThongRap: systemCinema };
    });

    dispatch({
      type: GET_CALENDAR_SHOW_SUCCESS,
      payload: systemCinemaFilterByDay,
    });
  } catch (error) {
    dispatch({ type: GET_CALENDAR_SHOW_FAIL, payload: error });
  }
};

// lấy danh sách bình luận về phim
export const getCommentList = (idMovie) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENTS_REQUEST });
    const response = await commentsApi.getCommentsApi();
    //lấy ra các comment có mã phim trùng với mã phim trên url của trang hiện tại
    const commentList = response.data.filter((comment) => comment.idMovie == idMovie);
    dispatch({ type: GET_COMMENTS_SUCCESS, payload: commentList });
  } catch (error) {
    dispatch({ type: GET_COMMENTS_FAIL, payload: error });
  }
};

// đăng nhận xét mới về phim
export const postComment = (requestComment) => async (dispatch) => {
  try {
    dispatch({ type: POST_COMMENT_REQUEST });
    const { data } = await commentsApi.postCommentApi(requestComment);
    dispatch({ type: POST_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_COMMENT_FAIL, payload: error });
  }
};
