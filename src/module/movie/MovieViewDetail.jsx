import ImageResize from "components/image/ImageResize";
import styled from "styled-components";

const StyledMovieViewDetail = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  line-height: 2;
  .poster {
    flex-shrink: 0;
  }
  .poster img {
    width: 220px;
    border-radius: 8px;
  }
`;

const MovieViewDetail = (props) => {
  const { poster, name, description, rating, duration, releaseDate, trailer } = props.data;
  return (
    <StyledMovieViewDetail>
      <div className="poster">
        <ImageResize width="220" url={poster} alt="" />
      </div>
      <div className="content">
        <h2>{name}</h2>
        <p>+ Description: {description}</p>
        <p>+ Rating: {rating} score</p>
        <p>+ Duration: {duration} minutes</p>
        <p>+ Release Date: {releaseDate}</p>
        <p>
          + Trailer: <a href={trailer}>{trailer}</a>
        </p>
      </div>
    </StyledMovieViewDetail>
  );
};

export default MovieViewDetail;
