import { memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ImageResize from "components/image/ImageResize";
import { TextClamp } from "assets/styles/mixin";
import { articles } from "constants/articles";

const StyledPostRelated = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: var(--darker-color);
  border-radius: 20px;
  .related-item {
    display: flex;
    height: calc(100% / 3);
    gap: 20px 10px;
  }
  .lazy-load-image-background {
    flex-shrink: 0;
  }
  .related-image {
    width: 200px;
    aspect-ratio: 16/9;
    background-color: var(--bg-skeleton);
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  .related-image span {
    display: block;
    width: 100%;
    height: 100%;
  }
  .related-title {
    ${TextClamp.multilines(2)}
    color: var(--white);
  }
  .related-desc {
    ${TextClamp.multilines(3)}
    color: var(--gray-color);
  }
  @media screen and (max-width: 767.98px) {
    .related-item {
      gap: 10px;
    }
  }
`;

const PostRelated = ({ limit = 0 }) => {
  const postRelatedList = articles.filter((news) => news.id !== articles[0].id);
  const limitPost = limit === 0 ? postRelatedList.length : limit;
  return (
    <StyledPostRelated>
      {postRelatedList?.slice(0, limitPost).map(({ id, coverImg, title, introduction }) => (
        <Link to={`/news/${id}`} key={id} className="related-item">
          <ImageResize width="200" url={coverImg} alt="coverImg" className="related-image" />
          <div className="related-content">
            <h3 className="related-title">{title}</h3>
            <div className="related-desc">{introduction}</div>
          </div>
        </Link>
      ))}
    </StyledPostRelated>
  );
};

export default memo(PostRelated);
