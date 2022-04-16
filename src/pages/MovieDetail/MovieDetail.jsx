import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  getDetailMovieAction,
  getCommentMovieAction,
  getCinemaDetailMovieAction,
} from "redux/actions/movieDetail.action";
import { openModalTrailerAction } from "redux/actions/modalTrailer.action";
import { useMediaQuery } from "hooks/useMediaQuery";
import "./movieDetail.scss";

export const MovieDetail = () => {
  const { id } = useParams(); // lấy id từ thanh url
  const dispatch = useDispatch();
  const { dataMovie, loading, togglePostComment } = useSelector((state) => state.movieDetail);
  // kiểm tra xem người dùng đang ở điện thoại hay không để load giao diện cinema
  const isMobile = useMediaQuery("(max-width:767.98px)");

  // get data detail movie from API thông qua id
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getDetailMovieAction(id));
    dispatch(getCinemaDetailMovieAction(id));
  }, []);
  useEffect(() => {
    dispatch(getCommentMovieAction(id));
  }, [togglePostComment]);

  return (
    <>
      {!loading ? (
        <div className='movie-detail'>
          <div
            className='movie-detail-top'
            style={{ backgroundImage: `url(${dataMovie.hinhAnh})` }}
          ></div>
          <div className='container'>
            <div className='movie-detail-main'>
              <div className='movie-detail-left'>
                <div className='movie-detail-info'>
                  {/* Thumbnail phim */}
                  <div className='movie-card-thumb'>
                    <img
                      src={dataMovie.hinhAnh}
                      className='movie-card-image'
                      alt='movie-card-thumb'
                    />
                    <div className='movie-card-score'>{dataMovie.danhGia / 2}</div>
                    <div className='movie-card-overplay'></div>
                    <div className='movie-card-play'>
                      <ion-icon
                        onClick={() => {
                          dispatch(openModalTrailerAction(dataMovie.trailer));
                        }}
                        name='play-circle-outline'
                      ></ion-icon>
                    </div>
                  </div>
                  {/* Chi tiết phim */}
                  <div className='movie-detail-detail'>
                    <h3>Chi tiết phim</h3>
                    <p>
                      <span className='label'>Tên phim:</span>
                      <span className='movie-detail-title'>{dataMovie.tenPhim}</span>
                    </p>
                    <p>
                      <span className='label'>Ngày công chiếu:</span>
                      <span>{new Date(dataMovie.ngayKhoiChieu).toLocaleDateString("vi-VI")}</span>
                    </p>
                    <p>
                      <span className='label'>Điểm đánh giá:</span>
                      <span>{dataMovie.danhGia / 2} / 5</span>
                    </p>
                    <p>
                      <span className='label'>Đạo diễn:</span>
                      <span>Adam Wingard</span>
                    </p>
                    <p>
                      <span className='label'>Diễn viên:</span>
                      <span>Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown</span>
                    </p>
                  </div>
                </div>
                {/* Tóm tắt phim */}
                <div>
                  <h3 className='text--primary'>Tóm tắt phim</h3>
                  <p className='movie-detail-desc'>{dataMovie.moTa}</p>
                </div>
                {/* Lịch chiếu phim */}
                {isMobile ? <DetailShowtimeMobile /> : <DetailShowtime />}
                {/* Nhận xét phim (comment) */}
                <div className='comment'>
                  <h3 className='text--primary'>Đánh giá</h3>
                  <Comment />
                </div>
                {/* Thêm nhận xét phim */}
                <AddComment />
              </div>
              {/* Phần tin tức bên phải */}
              <div className='movie-detail-right'>
                <RightSideNews />
              </div>
            </div>
          </div>
          <ModalTrailer />
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};

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
