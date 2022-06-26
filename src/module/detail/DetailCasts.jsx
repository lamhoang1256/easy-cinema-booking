import useSWR from "swr";
import styled from "styled-components";
import { fetcher, tmdbAPI } from "apis/tmdbApi";
import { TextClamp } from "assets/styles/mixin";
import ImageResize from "components/image/ImageResize";
import { useSearchParams } from "react-router-dom";

const StyledDetailCasts = styled.div`
  margin-top: 40px;
  .cast-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 20px 10px;
  }
  .cast-avatar {
    border-radius: 6px;
    aspect-ratio: 2/3;
  }
  .cast-name {
    text-align: center;
    ${TextClamp.multilines(2)}
  }
  @media screen and (max-width: 767.98px) {
    .cast-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const DetailCasts = () => {
  const [searchParams] = useSearchParams();
  const tmdbId = searchParams.get("tmdbId");
  const { data } = useSWR(tmdbAPI.getMovieMeta(tmdbId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <StyledDetailCasts>
      <h2 className="heading-sub">Casts</h2>
      <div className="cast-list">
        {cast.slice(0, 18).map((item) => (
          <div className="cast-item" key={item.id}>
            <ImageResize
              width="150"
              className="cast-avatar"
              imageError={`${tmdbAPI.imageOriginal("3bOGNsHlrswhyW79uvIHH1V43JI.jpg")}`}
              url={`${tmdbAPI.imageOriginal(item.profile_path)}`}
            ></ImageResize>
            <span className="cast-name">{item.name}</span>
          </div>
        ))}
      </div>
    </StyledDetailCasts>
  );
};

export default DetailCasts;
