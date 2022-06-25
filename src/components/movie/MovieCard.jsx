import styled from "styled-components";
import { path } from "constants/path";
import ImageResize from "components/image/ImageResize";
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
    aspect-ratio: 2/3;
  }
  .card-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MovieCard = ({ movie }) => {
  if (!movie) return null;
  const { poster, id, name } = movie;
  const tmdbId = movie.tmdbId ? movie.tmdbId : "0";
  return (
    <StyledMovieCard>
      <div className="card-media">
        <ImageResize url={poster} width="200" className="card-poster" alt="poster" />
      </div>
      <MovieTitle to={`${path.detail}/${id}?tmdbId=${tmdbId}`}>{name}</MovieTitle>
    </StyledMovieCard>
  );
};

export default MovieCard;
