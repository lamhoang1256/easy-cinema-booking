import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from "components/image/Image";
import Button from "components/button/Button";
import { TextClamp } from "assets/styles/_mixin";

const StyledMovieCard = styled.div`
  .lazy-load-image-loaded {
    width: 100%;
    height: 100%;
  }
  .card-poster {
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--bg-skeleton);
    aspect-ratio: 2/2.7;
  }
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card-title {
    margin: 10px 0 6px;
    color: var(--white);
    height: 58px;
    font-size: 1.8rem;
    font-weight: 500;
    text-transform: capitalize;
    ${TextClamp.multilines(2)}
  }
  .card-meta {
    color: #e5e7eb;
    font-weight: 300;
    display: flex;
    font-size: 1.4rem;
    justify-content: space-between;
  }
  .card-watch {
    margin-top: 13px;
    width: 100%;
  }
`;

const MovieCard = ({ movie }) => {
  const duration = ((movie.maPhim * movie.danhGia) / 500).toFixed(0);

  if (!movie) return null;
  return (
    <StyledMovieCard>
      <div className="card-poster">
        <Image url={movie.hinhAnh} className="card-image" alt="poster" />
      </div>
      <div className="card-info">
        <Link to={`detail/${movie.maPhim}`}>
          <h3 className="card-title">{movie.tenPhim}</h3>
        </Link>
        <div className="card-meta">
          <span className="card-duration">{duration < 100 ? +duration + 100 : duration} phút</span>
          <span className="card-score">{movie.danhGia / 2}</span>
        </div>
        <Button kind="purple" className="card-watch" to={`detail/${movie.maPhim}`}>
          Watch Now
        </Button>
      </div>
    </StyledMovieCard>
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
