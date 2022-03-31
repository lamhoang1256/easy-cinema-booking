import React from "react";
import { Comment } from "./components/Comment";
import "./movieDetail.scss";

// biDanh: "southpaww-696"
// dangChieu: false
// danhGia: 8
// hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/southpaw.jpg"
// hot: true
// maNhom: "GP13"
// maPhim: 1506
// moTa: "Boxer Billy Hope turns to trainer Tick Willis to help him get his life back on track after losing his wife in a tragic accident and his daughter to child protection services."
// ngayKhoiChieu: "2021-08-21T00:00:00"
// sapChieu: true
// tenPhim: "Southpaww 696"
// trailer: "https://www.youtube.com/embed/Mh2ebPxhoLs"

export const MovieDetail = () => {
  const backgroundURL = "https://movie0706.cybersoft.edu.vn/hinhanh/vi-anh-van-tin_gp09.jpg";
  return (
    <div className='movieDetail'>
      <div
        className='movieDetail__top'
        style={{
          backgroundImage: `url(
            ${backgroundURL}
          )`,
        }}
      ></div>
      <div className='container'>
        <div className='movieDetail__container'>
          <div className='movieDetail__left'>
            <div className='movieDetail__info'>
              {/* Thumbnail phim */}
              <div className='singleMovie__thumb'>
                <img src={backgroundURL} className='singleMovie__image' alt='singleMovie-thumb' />
                <div className='singleMovie__score'>{4}</div>
                <div className='singleMovie__overplay'>
                  <div className='singleMovie__play'>
                    <ion-icon
                      // onClick={() => {
                      //   dispatch(openModalTrailerAction(movie.trailer));
                      // }}
                      name='play-circle-outline'
                    ></ion-icon>
                  </div>
                </div>
              </div>
              {/* Chi tiết phim */}
              <div className='movieDetail__detail'>
                <h2>Chi tiết phim</h2>
                <p>
                  <span className='label'>Ngày công chiếu:</span>
                  <span>13/09/2003</span>
                </p>
                <p>
                  <span className='label'>Thể loại:</span>
                  <span>Phiêu lưu, Hành động, Gia đình</span>
                </p>
                <p>
                  <span className='label'>Đạo diễn:</span>
                  <span>Adam Wingard</span>
                </p>
                <p>
                  <span className='label'>Diễn viên:</span>
                  <span>Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown</span>
                </p>
                <p>
                  <span className='label'>Ngôn ngữ:</span>
                  <span>Việt Nam</span>
                </p>
              </div>
            </div>
            {/* Tóm tắt phim */}
            <div className='movieDetail__desc'>
              <h3>Tóm tắt phim</h3>
              <p>
                Phim là bản tình ca ngọt ngào nhưng cũng thấm đượm nước mắt dựa trên cuốn hồi ký
                cùng tên của ca sĩ, nhạc sĩ người Mỹ Jeremy Camp. Phim kể về chính anh và Melissa
                Lynn Henning-Camp - người con gái mình yêu, người vợ và cũng là một trong những
                người có ảnh hưởng lớn nhất tới âm nhạc và cuộc đời của Jeremy từ lúc hai người gặp
                gỡ, kết hôn rồi đồng hành cùng nhau chiến đấu với căn bệnh ung thư đang dần cướp đi
                sinh mạng của Melissa.
              </p>
            </div>
            {/* Đánh giá phim (comment) */}
            <div className='comment'>
              <h3>Đánh giá</h3>
              <div className='comment__list'>
                <Comment />
                <Comment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
