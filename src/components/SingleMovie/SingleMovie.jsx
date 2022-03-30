import React from "react";
import "./singleMovie.scss";

export const SingleMovie = (props) => {
  const { movie } = props;
  const score = movie.danhGia;
  // check điểm đánh giá và tạo các ngôi sao rating
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

  return (
    <>
      {movie ? (
        <div className='singleMovie'>
          <div className='singleMovie__thumb'>
            <img src={movie.hinhAnh} className='singleMovie__image' alt='singleMovie-thumb' />
            <div className='singleMovie__score'>{movie.danhGia}</div>
            <div className='singleMovie__overplay'>
              <ion-icon name='play-circle-outline'></ion-icon>
            </div>
          </div>
          <div className='singleMovie__info'>
            <h3 className='singleMovie__title'>{movie.tenPhim}</h3>
            <div>
              <div
                className='singleMovie__rate'
                dangerouslySetInnerHTML={{ __html: createStarRating() }}
              ></div>
              <div className='singleMovie__time'>120 phút</div>
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};
