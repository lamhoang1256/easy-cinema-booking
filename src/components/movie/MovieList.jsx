import styled from "styled-components";
import MovieCard from "./MovieCard";
import Pagination from "components/pagination/Pagination";

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
`;

const MovieList = ({ data, heading, pagination, handlePageChange }) => {
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
