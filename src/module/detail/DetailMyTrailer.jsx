import styled from "styled-components";

const StyledDetailMyTrailer = styled.div`
  margin-top: 40px;
  .trailer {
    width: 100%;
    aspect-ratio: 16/9;
  }
`;

const DetailMyTrailer = ({ url }) => {
  const arraySplited = url?.split("?v=");
  const embedId = arraySplited[arraySplited?.length - 1];
  return (
    <StyledDetailMyTrailer>
      <iframe
        className="trailer"
        src={`https://www.youtube.com/embed/${embedId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </StyledDetailMyTrailer>
  );
};

export default DetailMyTrailer;
