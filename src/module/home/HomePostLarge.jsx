import { TextClamp } from "assets/styles/mixin";
import ImageResize from "components/image/ImageResize";
import { articles } from "constants/articles";
import { path } from "constants/path";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHomePostLarge = styled.div`
  width: 50%;
  flex-shrink: 0;
  .post-content {
    padding: 10px 0;
  }
  .post-image {
    background-color: var(--bg-skeleton);
    border-radius: 15px;
    aspect-ratio: 16/9;
    object-fit: cover;
    object-position: top;
  }
  .post-title {
    color: var(--white);
    ${TextClamp.multilines(2)}
  }
  .post-desc {
    ${TextClamp.multilines(2)}
    color: var(--white);
  }
  @media screen and (max-width: 1023.98px) {
    width: 100%;
    .post-content {
      margin-left: 0;
    }
  }
  @media screen and (max-width: 767.98px) {
    padding-top: 0;
    .post-image {
      border-radius: 15px 15px 0 0;
    }
    .post-content {
      border-radius: 0 0 15px 15px;
    }
  }
`;

const HomePostLarge = () => {
  const { id, coverImg, title, introduction } = articles[0];
  return (
    <StyledHomePostLarge>
      <ImageResize width="720" to={`${path.article}/${id}`} className="post-image" url={coverImg} />
      <div className="post-content">
        <Link to={`${path.article}/${id}`} className="post-title">
          <h3>{title}</h3>
        </Link>
        <Link to={`${path.article}/${id}`} className="post-desc">
          {introduction}
        </Link>
      </div>
    </StyledHomePostLarge>
  );
};

export default HomePostLarge;
