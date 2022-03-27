import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.scss";

export const Carousel = () => {
  // custom button next, prev carousel
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className='carousel__prev' onClick={onClick}>
        <ion-icon name='chevron-back-outline'></ion-icon>
      </div>
    );
  }
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className='carousel__next' onClick={onClick}>
        <ion-icon name='chevron-forward-outline'></ion-icon>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <div className='carousel'>
      <Slider {...settings}>
        <div className='carousel__item'>
          <img src='./assets/home-background.jpg' alt='' />
          <div className='carousel__main'>
            <div className='container'>
              <h2 className='carousel__heading'>Heading</h2>
              <div className='carousel__features'>
                <span>Adventure</span>
                <span>Thriller</span>
                <span>Comedy</span>
              </div>
              <button className='carousel__btn btn btn__primary'>
                Watch me <ion-icon name='play-circle-outline'></ion-icon>
              </button>
            </div>
          </div>
        </div>
        <div className='carousel__item'>
          <img src='https://wallpaperaccess.com/full/2033384.jpg' alt='' />
          <div className='carousel__main'>
            <div className='container'>
              <h2 className='carousel__heading'>Batman</h2>
              <div className='carousel__features'>
                <span>Adventure</span>
                <span>Thriller</span>
                <span>Comedy</span>
              </div>
              <button className='carousel__btn btn btn__primary'>
                Watch me <ion-icon name='play-circle-outline'></ion-icon>
              </button>
            </div>
          </div>
        </div>
        <div className='carousel__item'>
          <img
            src='https://theculturednerd.org/wp-content/uploads/2020/06/order-of-the-phoenix-cover.jpg'
            alt=''
          />
          <div className='carousel__main'>
            <div className='container'>
              <h2 className='carousel__heading'>Harry Poster</h2>
              <div className='carousel__features'>
                <span>Adventure</span>
                <span>Thriller</span>
                <span>Comedy</span>
              </div>
              <button className='carousel__btn btn btn__primary'>
                Watch me <ion-icon name='play-circle-outline'></ion-icon>
              </button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};
