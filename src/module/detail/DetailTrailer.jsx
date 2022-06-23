import { fetcher, tmdbAPI } from "apis/tmdbApi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

const StyledDetailTrailer = styled.div`
  margin-top: 30px;
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

const DetailTrailer = () => {
  const [searchParams] = useSearchParams();
  const tmdbId = searchParams.get("tmdbId");
  const { data } = useSWR(tmdbAPI.getMovieMeta(tmdbId, "videos"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <StyledDetailTrailer>
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
