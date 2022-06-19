import { TextClamp } from "assets/styles/_mixin";
import FieldText from "components/field/FieldText";
import Image from "components/image/Image";
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
  }
  .categories {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .summary {
    margin-top: 10px;
    font-size: 1.75rem;
    ${TextClamp.multilines(4)}
  }
  .meta {
    display: flex;
    gap: 30px;
  }
`;

const DetailHeader = ({ detail, detailTmdb }) => {
  return (
    <StyledDetailHeader>
      <div className="poster">
        <Image
          url={`https://image.tmdb.org/t/p/original/${detailTmdb?.poster_path}`}
          alt="poster"
        />
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
            <span>{detail?.releaseDate}</span>
          </FieldText>
        </div>
      </div>
    </StyledDetailHeader>
  );
};

export default DetailHeader;
