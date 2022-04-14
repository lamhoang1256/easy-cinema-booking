import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "../MovieCard/MovieCard";
import Slider from "react-slick";
import "./movieList.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MovieList = () => {
  const { data, loading } = useSelector((state) => state.movieList);

  // custom button next, prev carousel
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className='movie-list-group-prev' onClick={onClick}>
        <ion-icon name='chevron-back-outline'></ion-icon>
      </div>
    );
  }
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className='movie-list-group-next' onClick={onClick}>
        <ion-icon name='chevron-forward-outline'></ion-icon>
      </div>
    );
  }
  const settings = {
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 740,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='movie-list'>
      <div className='movie-list-boxed'>
        <h2 className='movie-list-heading'>Phim đang chiếu</h2>
        <div className='movie-list-group'>
          {!true ? (
            <Slider {...settings}>
              {data.isShowingMovie.map((item, index) => (
                <MovieCard movie={item} key={index}></MovieCard>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {[1, 2, 3, 4, 5].map((item) => (
                <div className='skeleton-card' key={item}>
                  <Skeleton height={340} borderRadius={10} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      <div className='movie-list-boxed'>
        <h2 className='movie-list-heading'>Phim sắp chiếu</h2>
        <div className='movie-list-group'>
          <Slider {...settings}>
            {!loading &&
              data.comingSoonMovie.map((item, index) => (
                <MovieCard movie={item} key={index}></MovieCard>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
