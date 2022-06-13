import styled from "styled-components";
const StyledMovieCardSkeleton = styled.div`
  .poster {
    aspect-ratio: 2/2.7;
    background-color: var(--bg-skeleton);
    border-radius: 12px;
  }
  .title {
    border-radius: 6px;
    margin: 10px 0;
    height: 40px;
    background-color: var(--bg-skeleton);
  }
  .meta {
    border-radius: 4px;
    margin: 6px 0;
    height: 16px;
    background-color: var(--bg-skeleton);
  }
  .button {
    border-radius: 6px;
    height: 44px;
    background-color: var(--bg-skeleton);
  }
`;

const MovieCardSkeleton = () => {
  return (
    <StyledMovieCardSkeleton>
      <div className="poster"></div>
      <div className="title"></div>
      <div className="meta"></div>
      <div className="button"></div>
    </StyledMovieCardSkeleton>
  );
};

export default MovieCardSkeleton;
