import ImageResize from "components/image/ImageResize";
import styled from "styled-components";
import MovieTitle from "./MovieTitle";

const StyledMovieCard = styled.div`
  .lazy-load-image-loaded {
    width: 100%;
    height: 100%;
  }
  .card-media {
    border-radius: 4px;
    overflow: hidden;
    background-color: var(--bg-skeleton);
    aspect-ratio: 2/2.7;
  }
  .card-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MovieCard = ({ movie }) => {
  if (!movie) return null;
  const posterCard = movie.poster;
  return (
    <StyledMovieCard>
      <div className="card-media">
        <ImageResize url={posterCard} width="200" className="card-poster" alt="poster" />
      </div>
      <MovieTitle to={`detail/${movie.id}`}>{movie.name}</MovieTitle>
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
