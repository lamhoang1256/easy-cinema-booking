import { fetcher, tmdbAPI } from "apis/tmdbApi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

const StyledDetailTrailer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  .trailer {
    width: 100%;
    aspect-ratio: 16/9;
  }
  .trailer-list {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  @media screen and (max-width: 767.98px) {
    .trailer-list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
const StyledMyTrailer = styled.div`
  .my-trailer {
    width: 100%;
    aspect-ratio: 16/9;
  }
`;

const MyTrailer = ({ embedId }) => (
  <StyledMyTrailer>
    <h2 className="heading-sub">Trailer</h2>
    <iframe
      className="my-trailer"
      src={`https://www.youtube.com/embed/${embedId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </StyledMyTrailer>
);

const DetailTrailer = ({ myTrailer }) => {
  const arraySplited = myTrailer?.split("?v=");
  const embedId = arraySplited[arraySplited?.length - 1];

  const [searchParams] = useSearchParams();
  const tmdbId = searchParams.get("tmdbId");
  const { data } = useSWR(tmdbAPI.getMovieMeta(tmdbId, "videos"), fetcher);
  if (!data) return <MyTrailer embedId={embedId} />;
  const { results } = data;
  if (!results || results.length <= 0) return <MyTrailer embedId={embedId} />;
  return (
    <StyledDetailTrailer>
      <MyTrailer embedId={embedId} />
      <div className="trailer-list">
        {results.slice(0, 6).map((item) => (
          <iframe
            key={item.key}
            className="trailer"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ))}
      </div>
    </StyledDetailTrailer>
  );
};

export default DetailTrailer;
