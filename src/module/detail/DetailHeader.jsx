import { formatLocaleDateString } from "utilities/formatDate";
import styled from "styled-components";
import FieldText from "components/field/FieldText";
import DetailDescription from "./DetailDescription";
import Image from "components/image/Image";
import { TextClamp } from "assets/styles/_mixin";

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
    ${TextClamp.multilines(4)}
  }
  .meta {
    display: flex;
    gap: 30px;
  }
`;

const DetailHeader = ({ data }) => {
  return (
    <StyledDetailHeader>
      <div className="poster">
        <Image
          url={`https://image.tmdb.org/t/p/original//6DrHO1jr3qVrViUO6s6kFiAGM7.jpg`}
          alt="poster"
        />
      </div>
      <div className="content">
        <h1 className="heading">{data?.name}</h1>
        <div className="categories">
          <span className="tag">Animation</span>
          <span className="tag">Science Fiction</span>
          <span className="tag">Adventure</span>
          <span className="tag">Action</span>
          <span className="tag">Family</span>
        </div>
        <div className="summary">{data?.description}</div>
        <div className="meta">
          <FieldText>
            <span className="tag">Rating:</span>
            <span>12</span>
          </FieldText>
          <FieldText>
            <span className="tag">Duration:</span>
            <span>12 minutes</span>
          </FieldText>
          <FieldText>
            <span className="tag">Release Date:</span>
            <span>12</span>
          </FieldText>
        </div>
      </div>

      {/* <FieldText>
        <span className="tag">Release Date:</span>
        {formatLocaleDateString(data?.releaseDate)}
      </FieldText>
      <FieldText>
        <span className="tag">Rating:</span>
        <DetailDescription>{data?.rating}</DetailDescription>
      </FieldText>
      <FieldText>
        <span className="tag">Summary:</span>
        <DetailDescription>{data?.description}</DetailDescription>
      </FieldText> */}
    </StyledDetailHeader>
  );
};

export default DetailHeader;
