import React from "react";
import "./singleMovie.scss";

export const SingleMovie = (props) => {
  const { movie } = props;
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
        <div className='singleMovie'>
          <div className='singleMovie__thumb'>
            <img src={movie.hinhAnh} className='singleMovie__image' alt='singleMovie-thumb' />
            <div className='singleMovie__score'>{movie.danhGia / 2}</div>
            <div className='singleMovie__overplay'>
              <ion-icon name='play-circle-outline'></ion-icon>
            </div>
          </div>
          <div className='singleMovie__info'>
            <h3 className='singleMovie__title'>{movie.tenPhim}</h3>
            <div>
              <div className='singleMovie__rate'>
                <div
                  className='singleMovie__stars'
                  dangerouslySetInnerHTML={{ __html: createStarRating() }}
                ></div>
                <div>{movie.danhGia / 2}</div>
              </div>
              <div className='singleMovie__time'>
                {timeMovie < 100 ? +timeMovie + 100 : timeMovie} phút
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};
