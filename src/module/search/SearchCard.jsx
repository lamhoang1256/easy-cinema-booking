import styled from "styled-components";
import { path } from "constants/path";
import ImageResize from "components/image/ImageResize";
import { tmdbAPI } from "apis/tmdbApi";
import MovieTitle from "components/movie/MovieTitle";

const StyledSearchCard = styled.div`
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

const SearchCard = ({ movie }) => {
  if (!movie) return null;
  const { poster_path, id, original_title } = movie;
  const tmdbId = id ? id : "0";
  return (
    <StyledSearchCard>
      <div className="card-media">
        <ImageResize
          url={tmdbAPI.image500(poster_path)}
          width="200"
          className="card-poster"
          alt="poster"
        />
      </div>
      <MovieTitle to={`${path.detailTmdb}?tmdbId=${tmdbId}`}>{original_title}</MovieTitle>
    </StyledSearchCard>
  );
};

export default SearchCard;
