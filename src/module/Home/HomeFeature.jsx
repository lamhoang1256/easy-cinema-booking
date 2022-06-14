import styled from "styled-components";
import { dataFakeNews } from "constants/dataFakeNews";
import PostRelated from "components/post/PostRelated";
import HomePostLarge from "./HomePostLarge";

const StyledHomeFeature = styled.div`
  padding-top: 100px;
  .grid-layout {
    display: flex;
    gap: 40px;
    margin-top: 30px;
    @media screen and (max-width: 1023.98px) {
      flex-direction: column;
    }
  }
`;

const HomeFeature = () => {
  if (!dataFakeNews) return null;
  return (
    <StyledHomeFeature id="article">
      <h2 className="heading">Tin tức</h2>
      <div className="grid-layout">
        <HomePostLarge />
        <PostRelated />
      </div>
    </StyledHomeFeature>
  );
};

export default HomeFeature;
