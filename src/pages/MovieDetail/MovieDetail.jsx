import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// component
import { SideNews } from "../../components/SideNews/SideNews";
import { Comment } from "./components/Comment";
import { AddComment } from "../../components/AddComment/AddComment";
import { ModalTrailer } from "../../components/ModalTrailer/ModalTrailer";
// action
import { getDetailMovieAction } from "../../redux/actions/movieDetail.action";
import { openModalTrailerAction } from "../../redux/actions/modalTrailer.action";
import { getCommentMovieAction } from "../../redux/actions/movieComment.action";
import "./movieDetail.scss";

export const MovieDetail = () => {
  window.scrollTo(0, 0);
  const { id } = useParams(); // lấy id từ thanh url
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.movieDetail);
  const { dataComment, loadingComment } = useSelector((state) => state.movieComment);
  if (!loadingComment) {
    console.log(dataComment);
  }
  // get data detail movie from API thông qua id
  useEffect(() => {
    dispatch(getDetailMovieAction(id));
    dispatch(getCommentMovieAction(id));
  }, []);

  return (
    <>
      {!loading ? (
        <div className='movie-detail'>
          <div
            className='movie-detail-top'
            style={{
              backgroundImage: `url(
            ${data.hinhAnh}
          )`,
            }}
          ></div>
          <div className='container'>
            <div className='movie-detail-main'>
              <div className='movie-detail-left'>
                <div className='movie-detail-info'>
                  {/* Thumbnail phim */}
                  <div className='single-movie-thumb'>
                    <img
                      src={data.hinhAnh}
                      className='single-movie-image'
                      alt='single-movie-thumb'
                    />
                    <div className='single-movie-score'>{data.danhGia / 2}</div>
                    <div className='single-movie-overplay'>
                      <div className='single-movie-play'>
                        <ion-icon
                          onClick={() => {
                            dispatch(openModalTrailerAction(data.trailer));
                          }}
                          name='play-circle-outline'
                        ></ion-icon>
                      </div>
                    </div>
                  </div>
                  {/* Chi tiết phim */}
                  <div className='movie-detail-detail'>
                    <h3>Chi tiết phim</h3>
                    <p>
                      <span className='label'>Tên phim:</span>
                      <span className='movie-detail-title'>{data.tenPhim}</span>
                    </p>
                    <p>
                      <span className='label'>Ngày công chiếu:</span>
                      <span>{new Date(data.ngayKhoiChieu).toLocaleDateString("vi-VI")}</span>
                    </p>
                    <p>
                      <span className='label'>Điểm đánh giá:</span>
                      <span>{data.danhGia / 2} / 5</span>
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
                <div className='movie-detail-desc'>
                  <h3>Tóm tắt phim</h3>
                  <p>{data.moTa}</p>
                </div>
                {/* Đánh giá phim (comment) */}
                <div className='comment'>
                  <h3>Đánh giá</h3>
                  <div className='comment-list'>
                    {!loadingComment && <Comment dataComment={dataComment} />}
                  </div>
                </div>
                <AddComment />
              </div>
              {/* Phần tin tức bên phải */}
              <div className='movie-detail-right'>
                <SideNews />
              </div>
            </div>
          </div>
          <ModalTrailer />
        </div>
      ) : (
        "Loading"
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
