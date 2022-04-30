import React from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { dataCarouselHome } from "constants/dataCarouselHome";
import { openModalTrailer } from "redux/actions/movie/modalTrailer.action";
import "./carousel.scss";

export const Carousel = () => {
  const dispatch = useDispatch();

  // custom button next, prev carousel
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className='carousel-prev' onClick={onClick}>
        <ion-icon name='chevron-back-outline'></ion-icon>
      </div>
    );
  }
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className='carousel-next' onClick={onClick}>
        <ion-icon name='chevron-forward-outline'></ion-icon>
      </div>
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  // handle when click Watch me
  const handleShowTrailer = (urlTrailer) => {
    dispatch(openModalTrailer(urlTrailer));
  };

  return (
    <div className='carousel'>
      <Slider {...settings}>
        {dataCarouselHome.map((item) => (
          <div className='carousel-boxed' key={item.id}>
            <img
              className='carousel-banner'
              src={`${process.env.REACT_APP_PUBLIC}/${item.img}`}
              alt={item.img}
            />
            <div className='carousel-main'>
              <div className='container'>
                <h2 className='carousel-heading'>{item.name}</h2>
                <div className='carousel-desc'>{item.desc}</div>
                <div className='carousel-features'>
                  {item.features.map((feature, index) => (
                    <span key={index}>{feature}</span>
                  ))}
                </div>
                <div className='carousel-info'>
                  <div className='carousel-info-rate'>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star-half'></ion-icon>
                  </div>
                  <div className='carousel-info-label'>
                    <ion-icon name='calendar-outline'></ion-icon> {item.year}
                  </div>
                  <div className='carousel-info-label'>
                    <ion-icon name='alarm-outline'></ion-icon> {item.min} min
                  </div>
                </div>
                <button
                  className='carousel-btn btn btn--primary'
                  onClick={() => handleShowTrailer(item.trailer)}
                >
                  Watch me <ion-icon name='play-circle-outline'></ion-icon>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
