import React from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { dataCarouselHome } from "../../../../constants/dataCarouselHome";
import { openModalTrailerAction } from "../../../../redux/actions/modalTrailer.action";
import "./carousel.scss";

export const Carousel = () => {
  const dispatch = useDispatch();

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
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  // handle when click Watch me
  const handleShowTrailer = (urlTrailer) => {
    dispatch(openModalTrailerAction(urlTrailer));
  };

  return (
    <div className='carousel'>
      <Slider {...settings}>
        {dataCarouselHome.map((item) => (
          <div className='carousel__item' key={item.id}>
            <img src={`${process.env.REACT_APP_PUBLIC}/${item.img}`} alt={item.img} />
            <div className='carousel__main'>
              <div className='container'>
                <h2 className='carousel__heading'>{item.name}</h2>
                <div className='carousel__desc'>{item.desc}</div>
                <div className='carousel__features'>
                  {item.features.map((feature, index) => (
                    <span key={index}>{feature}</span>
                  ))}
                </div>
                <div className='carousel__info'>
                  <div className='carousel__info-rate'>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star-half'></ion-icon>
                  </div>
                  <div className='carousel__info-label'>
                    <ion-icon name='calendar-outline'></ion-icon> {item.year}
                  </div>
                  <div className='carousel__info-label'>
                    <ion-icon name='alarm-outline'></ion-icon> {item.min} min
                  </div>
                </div>
                <button
                  className='carousel__btn btn btn__primary'
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
