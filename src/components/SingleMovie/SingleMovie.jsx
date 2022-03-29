import React from "react";
import "./singleMovie.scss";

export const SingleMovie = () => {
  return (
    <div className='singleMovie'>
      <div className='singleMovie__thumb'>
        <img
          src='https://movienew.cybersoft.edu.vn/hinhanh/insideout.jpg'
          className='singleMovie__image'
          alt='singleMovie-thumb'
        />
        <div className='singleMovie__score'>7</div>
        <div className='singleMovie__overplay'>
          <ion-icon name='play-circle-outline'></ion-icon>
        </div>
      </div>
      <div className='singleMovie__info'>
        <h3 className='singleMovie__title'>Age ice 3</h3>
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
  );
};
