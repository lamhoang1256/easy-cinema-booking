import styled from "styled-components";
const StyledMovieCardSkeleton = styled.div`
  .poster {
    aspect-ratio: 2/3;
    background-color: var(--bg-skeleton);
    border-radius: 4px;
  }
  .title {
    border-radius: 4px;
    margin: 10px 0;
    height: 30px;
    background-color: var(--bg-skeleton);
  }
`;

const MovieCardSkeleton = () => {
  return (
    <StyledMovieCardSkeleton>
      <div className="poster"></div>
      <div className="title"></div>
    </StyledMovieCardSkeleton>
  );
};

export default MovieCardSkeleton;
