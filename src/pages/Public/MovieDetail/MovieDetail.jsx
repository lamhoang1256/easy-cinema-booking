import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "hooks/useMediaQuery";
// component
import { RightSideNews } from "components/RightSideNews/RightSideNews";
import { AddComment } from "components/AddComment/AddComment";
import { Comment } from "./components/Comment/Comment";
import { DetailShowtime } from "./components/DetailShowtime/DetailShowtime";
import { DetailShowtimeMobile } from "./components/DetailShowtime/DetailShowtimeMobile";
import { ModalTrailer } from "components/ModalTrailer/ModalTrailer";
import { LoadingAnimation } from "components/LoadingAnimation/LoadingAnimation";
// action
import {
  getMovieDetail,
  getCommentList,
  getCalendarShowMovieDetail,
} from "redux/actions/movie/movieDetail.action";
import { openModalTrailer } from "redux/actions/movie/modalTrailer.action";
import { formatLocaleDateString } from "utilities/formatDate";
import "./movieDetail.scss";

export const MovieDetail = () => {
  const { idDetail } = useParams(); // get idDetail from url
  const dispatch = useDispatch();
  const { movieDetail, isLoadingMovieDetail, togglePostComment } = useSelector(
    (state) => state.movieDetail
  );
  // check breakpoint user to load UI Showtime
  const isMobile = useMediaQuery("(max-width:767.98px)");

  // get data detail movie from API with idDetail
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getMovieDetail(idDetail));
    dispatch(getCalendarShowMovieDetail(idDetail));
  }, []);

  useEffect(() => {
    dispatch(getCommentList(idDetail));
  }, [togglePostComment]);

  return (
    <>
      {isLoadingMovieDetail && <LoadingAnimation />}
      {!isLoadingMovieDetail && (
        <div className='movie-detail'>
          <div className='movie-detail-top'>
            <div
              className='movie-detail-banner'
              style={{ backgroundImage: `url(${movieDetail.hinhAnh})` }}
            ></div>
            <h2>Chi tiết phim</h2>
          </div>
          <div className='container'>
            <div className='movie-detail-main'>
              <div className='movie-detail-left'>
                <div className='movie-detail-info'>
                  {/* Thumbnail movie */}
                  <div className='movie-card-thumb'>
                    <img
                      src={movieDetail.hinhAnh}
                      className='movie-card-image'
                      alt='movie-card-thumb'
                    />
                    <div className='movie-card-score'>{movieDetail.danhGia / 2}</div>
                    <div className='movie-card-overplay'></div>
                    <div className='movie-card-play'>
                      <ion-icon
                        onClick={() => {
                          dispatch(openModalTrailer(movieDetail.trailer));
                        }}
                        name='play-circle-outline'
                      ></ion-icon>
                    </div>
                  </div>
                  {/* Info movie */}
                  <div className='movie-detail-detail'>
                    <h3>Chi tiết phim</h3>
                    {MovieDetailField("Tên phim", movieDetail.tenPhim, "movie-detail-title")}
                    {MovieDetailField(
                      "Ngày công chiếu",
                      formatLocaleDateString(movieDetail.ngayKhoiChieu)
                    )}
                    {MovieDetailField("Điểm đánh giá", movieDetail.danhGia / 2 + "/ 5")}
                    {MovieDetailField("Đạo diễn", "Adam Wingard")}
                    {MovieDetailField(
                      "Diễn viên",
                      "Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown"
                    )}
                  </div>
                </div>
                {/* Summary movie */}
                <div>
                  <h3 className='text--primary'>Tóm tắt phim</h3>
                  <p className='movie-detail-desc'>{movieDetail.moTa}</p>
                </div>
                {/* Showtime */}
                {isMobile ? <DetailShowtimeMobile /> : <DetailShowtime />}
                {/* Comment */}
                <div className='comment'>
                  <h3 className='text--primary'>Đánh giá</h3>
                  <Comment />
                </div>
                {/* Add Comment */}
                <AddComment />
              </div>

              <div className='movie-detail-right'>
                <RightSideNews />
              </div>
            </div>
          </div>
          <ModalTrailer />
        </div>
      )}
    </>
  );
};

const MovieDetailField = (label, content, className) => (
  <p>
    <span className='label'>{label}:</span>
    <span className={className}>{content}</span>
  </p>
);

// DỮ LIỆU MẪU TRẢ VỀ CỦA MOVIE DETAIL TỪ API
// {
//   "statusCode": 200,
//   "message": "Xử lý thành công!",
//   "content": {
//     "maPhim": 8189,
//     "tenPhim": "Lừa đểu gặp lừa đảo 3",
//     "biDanh": "lua-deu-gap-lua-dao-3",
//     "trailer": "https://www.youtube.com/embed/T36HGZagV5w",
//     "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/lua-deu-gap-lua-dao-3_gp13.jpg",
//     "moTa": "Lừa Đểu Gặp Lừa Đảo xoay quanh lần gặp gỡ oan gia giữa siêu lừa đảo Tower cùng cô nàng bị lừa tình Ina, cả 2 sẽ cùng hợp tác trong phi vụ lừa lại tên lừa đểu Petch - tên bạn trai bội bạc của Ina bằng những chiêu trò lừa đảo không hồi kết.",
//     "maNhom": "GP13",
//     "hot": false,
//     "dangChieu": true,
//     "sapChieu": false,
//     "ngayKhoiChieu": "2021-09-10T00:00:00",
//     "danhGia": 10
//   },
//   "dateTime": "2022-03-31T17:33:55.2292515+07:00",
//   "messageConstants": null
// }
