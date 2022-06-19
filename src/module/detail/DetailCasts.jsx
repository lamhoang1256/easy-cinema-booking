import { TextClamp } from "assets/styles/_mixin";
import Image from "components/image/Image";
import styled from "styled-components";

const StyledDetailCasts = styled.div`
  margin-top: 40px;
  .cast-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .cast-item {
    width: 140px;
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
  return (
    <StyledDetailCasts>
      <h2 className="heading-sub">Casts</h2>
      <div className="cast-list">
        {Array(4)
          .fill(0)
          .map((item) => (
            <div className="cast-item">
              <Image
                className="cast-avatar"
                url="https://image.tmdb.org/t/p/original/42ZVDXhLkEsSjNLpQ8OtMHrL67H.jpg"
              ></Image>
              <h3 className="cast-name">Chris Evans</h3>
            </div>
          ))}
      </div>
    </StyledDetailCasts>
  );
};

export default DetailCasts;
