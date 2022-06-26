import Button from "components/button/Button";
import ImageResize from "components/image/ImageResize";
import { path } from "constants/path";
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
  button {
    margin-top: 20px;
  }
`;

const MovieViewDetail = (props) => {
  const { id, poster, name, description, rating, duration, releaseDate, trailer, tmdbId } =
    props.data;
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
        <Button to={`${path.detail}/${id}?tmdbId=${tmdbId}`} kind="purple">
          Redirect to Movie Detail Page
        </Button>
      </div>
    </StyledMovieViewDetail>
  );
};

export default MovieViewDetail;
