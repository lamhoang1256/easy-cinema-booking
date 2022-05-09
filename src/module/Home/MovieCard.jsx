import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModalTrailer } from "redux/actions/movie/modalTrailer.action";
import { createStarRating } from "utilities/createStarRating";

const imageLoadError = `${process.env.PUBLIC_URL}/assets/images/chore/error-load-image.png`;
const MovieCard = (props) => {
  const dispatch = useDispatch();
  const { movie } = props;
  const movieDuration = ((movie.maPhim * movie.danhGia) / 500).toFixed(0);
  const [srcImg, setSrcImg] = useState(props.movie.hinhAnh);

  return (
    <>
      {movie ? (
        <div className='movie-card'>
          <div className='movie-card-thumb'>
            <img
              src={srcImg}
              className='movie-card-image'
              alt='movie-card-thumb'
              onError={() => {
                setSrcImg(imageLoadError);
              }}
            />
            <div className='movie-card-score'>{movie.danhGia / 2}</div>
            <div className='movie-card-overplay'></div>
            <div className='movie-card-play'>
              <ion-icon
                onClick={() => {
                  dispatch(openModalTrailer(movie.trailer));
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
                  dangerouslySetInnerHTML={{ __html: createStarRating(movie.danhGia) }}
                ></div>
                <div>{movie.danhGia / 2}</div>
              </div>
              <div className='movie-card-time'>
                {movieDuration < 100 ? +movieDuration + 100 : movieDuration} phút
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

export default MovieCard;

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
