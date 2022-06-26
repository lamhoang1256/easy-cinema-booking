import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import SearchCard from "./SearchCard";
import Pagination from "components/pagination/Pagination";
import MovieCardSkeleton from "components/movie/MovieCardSkeleton";

const StyledSearchList = styled.div`
  .movie-list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 20px;
  }
  .notfound {
    margin-top: 20px;
  }
  @media screen and (max-width: 400px) {
    .movie-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const SearchList = ({ loading, data, pagination, handlePageChange }) => {
  if (loading) {
    return (
      <StyledSearchList>
        <div className="movie-list">
          {Array(14)
            .fill(0)
            .map(() => (
              <MovieCardSkeleton key={uuidv4()} />
            ))}
        </div>
      </StyledSearchList>
    );
  }
  return (
    <StyledSearchList>
      {data?.length === 0 && <h3 className="notfound">Not movie found</h3>}
      {data?.length > 0 && (
        <>
          <div className="movie-list">
            {data.map((item) => (
              <SearchCard movie={item} key={item.id} />
            ))}
          </div>
          <Pagination pagination={pagination} onPageChange={handlePageChange}></Pagination>
        </>
      )}
    </StyledSearchList>
  );
};

export default SearchList;
