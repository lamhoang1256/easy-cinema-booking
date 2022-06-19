import useSWR from "swr";
import { fetcher, tmdbAPI } from "apis/tmdbApi";
import { TextClamp } from "assets/styles/_mixin";
import Image from "components/image/Image";
import styled from "styled-components";

const StyledDetailCasts = styled.div`
  margin-top: 40px;
  .cast-list {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 10px;
  }
  .cast-avatar {
    border-radius: 6px;
  }
  .cast-name {
    text-align: center;
    ${TextClamp.multilines(2)}
  }
`;

const DetailCasts = () => {
  const movieId = "508947";
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <StyledDetailCasts>
      <h2 className="heading-sub">Casts</h2>
      <div className="cast-list">
        {cast.slice(0, 16).map((item) => (
          <div className="cast-item">
            <Image
              className="cast-avatar"
              url={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
            ></Image>
            <h3 className="cast-name">{item.name}</h3>
          </div>
        ))}
      </div>
    </StyledDetailCasts>
  );
};

export default DetailCasts;
