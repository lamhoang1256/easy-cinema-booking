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
    height: 58px;
    font-size: 1.8rem;
    font-weight: 500;
    text-transform: capitalize;
    ${TextClamp.multilines(2)}
  }
  .card-meta {
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
  if (!movie) return null;
  return (
    <StyledMovieCard>
      <div className="card-poster">
        <Image url={"/" + movie.poster.split("public/")[1]} className="card-image" alt="poster" />
      </div>
      <div className="card-info">
        <Link to={`detail/${movie.id}`}>
          <h3 className="card-title">{movie.name}</h3>
        </Link>
        <div className="card-meta">
          <span className="card-duration">{movie.duration} phút</span>
          <span className="card-score">{movie.rating}</span>
        </div>
        <Button kind="purple" className="card-watch" to={`detail/${movie.id}`}>
          Watch Now
        </Button>
      </div>
    </StyledMovieCard>
  );
};

// createdAt: "2022-06-16T02:44:48.000Z"
// description: "Stephen Strange sử dụng một phép thuật bị cấm mở ra cánh cửa đến đa vũ trụ, với sự giúp đỡ của các đồng minh thần bí cả cũ và mới, vượt qua thực tại để đối đầu với 1 kẻ thù mới, bí ẩn ,nguy hiểm và đáng sợ hơn"
// duration: 128
// id: 4
// name: "DOCTOR STRANGE IN THE MULTIVERSE OF MADNESS"
// poster: "public/default/images/movies/doctor-strange.jpeg"
// rating: 4.9
// releaseDate: "2022-05-04"
// status: "now-showing"
// trailer: "https://www.youtube.com/watch?v=aWzlQ2N6qqg"
// updatedAt: "2022-06-16T02:44:48.000Z"

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
