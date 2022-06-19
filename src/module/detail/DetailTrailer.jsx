import styled from "styled-components";

const StyledDetailTrailer = styled.div`
  margin-top: 40px;
  .trailer {
    width: 100%;
    aspect-ratio: 16/9;
  }
`;

const DetailTrailer = () => {
  return (
    <StyledDetailTrailer>
      <h2 className="heading-sub">Trailer</h2>
      <iframe
        className="trailer"
        src={`https://www.youtube.com/embed/3ysWTgDB3ns`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </StyledDetailTrailer>
  );
};

export default DetailTrailer;
