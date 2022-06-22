import styled from "styled-components";
import { articles } from "constants/articles";
import PostRelated from "components/post/PostRelated";
import HomePostLarge from "./HomePostLarge";
import Tag from "components/tag/Tag";

const StyledHomeFeature = styled.div`
  padding-top: 100px;
`;

const HomeFeature = () => {
  if (!articles) return null;
  return (
    <StyledHomeFeature id="article">
      <Tag kind="secondary">Tin tức</Tag>
      <div className="grid-layout">
        <HomePostLarge />
        <PostRelated limit={3} />
      </div>
    </StyledHomeFeature>
  );
};

export default HomeFeature;
