import { tmdbAPI } from "apis/tmdbApi";
import { TextClamp } from "assets/styles/mixin";
import FieldText from "components/field/FieldText";
import ImageResize from "components/image/ImageResize";
import moment from "moment";
import styled from "styled-components";

const StyledDetailHeader = styled.div`
  line-height: 2;
  display: flex;
  gap: 40px;
  .heading {
    margin-top: 10px;
    line-height: 1.8;
  }
  .poster {
    width: 240px;
    height: 360px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    transform: translateY(-40%);
    background-color: var(--bg-skeleton);
    span,
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .categories {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .summary {
    margin-top: 10px;
    font-size: 1.75rem;
    ${TextClamp.multilines(2)}
  }
  .meta {
    display: flex;
    gap: 10px 30px;
  }
  @media screen and (max-width: 767.98px) {
    flex-direction: column;
    .heading {
      font-size: 2.6rem;
    }
    .content {
      margin-top: -140px;
    }
    .meta {
      flex-direction: column;
    }
  }
`;

const DetailHeader = ({ detail, detailTmdb }) => {
  const poster = detail?.poster ? detail?.poster : tmdbAPI.imageOriginal(detailTmdb?.poster_path);
  const name = detail?.name ? detail?.name : detailTmdb?.original_title;
  const description = detail?.description ? detail?.description : detailTmdb?.overview;
  const rating = detail?.rating ? detail?.rating : detailTmdb?.vote_average;
  const duration = detail?.duration ? detail.duration : detailTmdb?.runtime;
  const releaseDate = detail?.releaseDate ? detail?.releaseDate : detailTmdb?.release_date;
  return (
    <StyledDetailHeader>
      <div className="poster">
        <ImageResize width="240" url={poster} alt="poster" />
      </div>
      <div className="content">
        <h1 className="heading">{name}</h1>
        {detailTmdb?.genres?.length > 0 ? (
          <div className="categories">
            {detailTmdb?.genres.map((genre) => (
              <span className="tag" key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="categories">
            <span className="tag">Animation</span>
            <span className="tag">Adventure</span>
            <span className="tag">Action</span>
          </div>
        )}
        <p className="summary">{description}</p>
        <div className="meta">
          <FieldText>
            <span className="tag">Rating:</span>
            <span>{rating}</span>
          </FieldText>
          <FieldText>
            <span className="tag">Duration:</span>
            <span>{duration} minutes</span>
          </FieldText>
          <FieldText>
            <span className="tag">Release Date:</span>
            <span>{moment(releaseDate).format("lll")}</span>
          </FieldText>
        </div>
      </div>
    </StyledDetailHeader>
  );
};

export default DetailHeader;
