import styled from "styled-components";
import MovieCard from "./MovieCard";
import { v4 as uuidv4 } from "uuid";
import Pagination from "components/pagination/Pagination";
import MovieCardSkeleton from "./MovieCardSkeleton";

const StyledMovieList = styled.div`
  margin-top: 20px;
  .heading {
    color: var(--white);
    margin-bottom: 10px;
  }
  .swiper-slide {
    width: 185px;
    height: auto;
  }
  .movie-list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 20px;
  }
  @media screen and (max-width: 400px) {
    .movie-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const MovieList = ({ loading, data, heading, pagination, handlePageChange }) => {
  if (loading) {
    return (
      <StyledMovieList>
        <h3>{heading}</h3>
        <div className="movie-list">
          {Array(7)
            .fill(0)
            .map(() => (
              <MovieCardSkeleton key={uuidv4()} />
            ))}
        </div>
      </StyledMovieList>
    );
  }
  return (
    <StyledMovieList>
      <h3>{heading}</h3>
      <div className="movie-list">
        {data?.length > 0 && data.map((item) => <MovieCard movie={item} key={item.id}></MovieCard>)}
      </div>
      <Pagination pagination={pagination} onPageChange={handlePageChange}></Pagination>
    </StyledMovieList>
  );
};

export default MovieList;
