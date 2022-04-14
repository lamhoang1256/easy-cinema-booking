import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModalTrailerAction } from "redux/actions/modalTrailer.action";
import "./movieCard.scss";

export const MovieCard = (props) => {
  const { movie } = props;
  const dispatch = useDispatch();
  // check điểm đánh giá từ API và tạo các ngôi sao rating
  const score = movie.danhGia;
  const createStarRating = () => {
    let rating = "";
    if (score % 2 === 0) {
      for (let i = 0; i < score / 2; i++) {
        rating += "<ion-icon name='star'></ion-icon>";
      }
    } else {
      for (let i = 0; i < Math.floor(score / 2); i++) {
        rating += "<ion-icon name='star'></ion-icon>";
      }
      rating += "<ion-icon name='star-half'></ion-icon>";
    }
    return rating;
  };
  // tạo thời lượng phim cho đẹp
  const timeMovie = ((movie.maPhim * movie.danhGia) / 500).toFixed(0);

  return (
    <>
      {movie ? (
        <div className='movie-card'>
          <div className='movie-card-thumb'>
            <img src={movie.hinhAnh} className='movie-card-image' alt='movie-card-thumb' />
            <div className='movie-card-score'>{movie.danhGia / 2}</div>
            <div className='movie-card-overplay'></div>
            <div className='movie-card-play'>
              <ion-icon
                onClick={() => {
                  dispatch(openModalTrailerAction(movie.trailer));
                }}
                name='play-circle-outline'
              ></ion-icon>
            </div>
          </div>
          <div className='movie-card-info'>
            <Link to={`detail/${movie.maPhim}`}>
              <h3 className='movie-card-title'>{movie.tenPhim}</h3>
            </Link>
            <div>
              <div className='movie-card-rate'>
                <div
                  className='movie-card-stars'
                  dangerouslySetInnerHTML={{ __html: createStarRating() }}
                ></div>
                <div>{movie.danhGia / 2}</div>
              </div>
              <div className='movie-card-time'>
                {timeMovie < 100 ? +timeMovie + 100 : timeMovie} phút
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading Movie Card"
      )}
    </>
  );
};

// DATA MẪU
// {
//  "maPhim": 1521,
//  "tenPhim": "Specter 445",
//  "biDanh": "specter-445",
//  "trailer": "https://www.youtube.com/embed/LTDaET-JweU",
//  "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/southpaw.jpg",
//  "moTa": "A cryptic message from Bond's past sends him on a trail to ",
//  "maNhom": "GP13",
//  "ngayKhoiChieu": "2021-11-04T16:24:27.64",
//  "danhGia": 8,
//  "hot": true,
//  "dangChieu": true,
//  "sapChieu": false
//},
