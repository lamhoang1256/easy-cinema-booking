import moment from "moment";
import styled from "styled-components";
import { TextClamp } from "assets/styles/mixin";
import FieldText from "components/field/FieldText";
import ImageResize from "components/image/ImageResize";

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
  return (
    <StyledDetailHeader>
      <div className="poster">
        <ImageResize width="240" url={detail?.poster} alt="poster" />
      </div>
      <div className="content">
        <h1 className="heading">{detail?.name}</h1>
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
            <span className="tag">Science Fiction</span>
            <span className="tag">Adventure</span>
            <span className="tag">Action</span>
            <span className="tag">Family</span>
          </div>
        )}
        <div className="summary">{detail?.description}</div>
        <div className="meta">
          <FieldText>
            <span className="tag">Rating:</span>
            <span>{detail?.rating}</span>
          </FieldText>
          <FieldText>
            <span className="tag">Duration:</span>
            <span>{detail?.duration} minutes</span>
          </FieldText>
          <FieldText>
            <span className="tag">Release Date:</span>
            <span>{moment(detail?.releaseDate).format("L")}</span>
          </FieldText>
        </div>
      </div>
    </StyledDetailHeader>
  );
};

export default DetailHeader;
