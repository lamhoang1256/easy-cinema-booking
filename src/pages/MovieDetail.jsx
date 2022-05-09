import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "hooks/useMediaQuery";
// component
import RightSideNews from "components/RightSideNews/RightSideNews";
import AddComment from "components/AddComment/AddComment";
import Comment from "module/MovieDetail/Comment";
import DetailShowtime from "module/MovieDetail/DetailShowtime";
import DetailShowtimeMobile from "module/MovieDetail/DetailShowtimeMobile";
import ModalTrailer from "components/ModalTrailer/ModalTrailer";
import LoadingAnimation from "components/LoadingAnimation/LoadingAnimation";
import {
  getMovieDetail,
  getCommentList,
  getCalendarShowMovieDetail,
} from "redux/actions/movieDetail.action";
import { openModalTrailer } from "redux/actions/modalTrailer.action";
import { formatLocaleDateString } from "utilities/formatDate";

const MovieDetail = () => {
  const { idDetail } = useParams();
  const dispatch = useDispatch();
  const { isLoading, movieDetail, togglePostComment } = useSelector((state) => state.movieDetail);
  const isMobile = useMediaQuery("(max-width:767.98px)");

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
      {isLoading && <LoadingAnimation />}
      {!isLoading && (
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

                  <div className='movie-detail-detail'>
                    <h3>Chi tiết phim</h3>
                    <MovieDetailItem label='Tên phim'>
                      <span className='movie-detail-title'>{movieDetail.tenPhim}</span>
                    </MovieDetailItem>
                    <MovieDetailItem label='Ngày công chiếu'>
                      {formatLocaleDateString(movieDetail.ngayKhoiChieu)}
                    </MovieDetailItem>
                    <MovieDetailItem label='Điểm đánh giá'>
                      {movieDetail.danhGia / 2 + "/ 5"}
                    </MovieDetailItem>
                    <MovieDetailItem label='Đạo diễn'>Adam Wingard</MovieDetailItem>
                    <MovieDetailItem label='Diễn viên'>
                      Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown
                    </MovieDetailItem>
                  </div>
                </div>
                <div>
                  <h3 className='text--primary'>Tóm tắt phim</h3>
                  <p className='movie-detail-desc'>{movieDetail.moTa}</p>
                </div>
                {isMobile ? <DetailShowtimeMobile /> : <DetailShowtime />}
                <div className='comment'>
                  <h3 className='text--primary'>Đánh giá</h3>
                  <Comment />
                </div>
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

const MovieDetailItem = ({ label, children }) => (
  <p>
    <span className='label'>{label}:</span>
    {children}
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

export default MovieDetail;
