import { MovieCard } from "../MovieCard/MovieCard";
import Slider from "react-slick";
import "./movieList.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

export const MovieList = ({ data, heading }) => {
  return (
    <div className='movie-list'>
      <div className='movie-list-boxed'>
        <h2 className='movie-list-heading text--primary'>{heading}</h2>
        <div className='movie-list-group'>
          {data ? (
            <Slider {...settings}>
              {data.map((item, index) => (
                <MovieCard movie={item} key={index}></MovieCard>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div className='skeleton-card' key={item}>
                  <Skeleton height={340} borderRadius={10} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};
const settings = {
  dots: true,
  slidesToShow: 6,
  slidesToScroll: 2,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        dots: true,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        dots: true,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
      },
    },
    {
      breakpoint: 650,
      settings: {
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
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
