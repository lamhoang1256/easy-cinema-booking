import React from "react";
import "./singleMovie.scss";

export const SingleMovie = (props) => {
  const { movie } = props;
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
              <div className='singleMovie__rate'>
                <ion-icon name='star'></ion-icon>
                <ion-icon name='star'></ion-icon>
                <ion-icon name='star'></ion-icon>
                <ion-icon name='star'></ion-icon>
                <ion-icon name='star-half'></ion-icon>
              </div>
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
