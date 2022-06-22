import { Link } from "react-router-dom";
import { dataFakeNews } from "constants/dataFakeNews";
import styled from "styled-components";
import Image from "components/image/Image";
import { TextClamp } from "assets/styles/mixin";

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
    @media screen and (max-width: 767.98px) {
      gap: 10px;
    }
  }
  .related-image {
    min-width: 200px;
    flex-shrink: 0;
    background-color: var(--bg-skeleton);
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  .related-title h3 {
    ${TextClamp.multilines(2)}
    color: var(--white);
  }
  .related-desc {
    ${TextClamp.multilines(3)}
  }
  .related-desc p {
    color: var(--gray-color);
  }
`;

const PostRelated = () => {
  const postRelatedList = dataFakeNews.filter((news) => news.id !== 1);
  return (
    <StyledPostRelated>
      {postRelatedList?.map(({ id, thumbnail, title, content }) => (
        <Link to={`/news/${id}`} key={id} className="related-item">
          <Image url={thumbnail} alt="thumbnail" className="related-image" />
          <div className="related-content">
            <div className="related-title" dangerouslySetInnerHTML={{ __html: title }} />
            <div className="related-desc" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </Link>
      ))}
    </StyledPostRelated>
  );
};

export default PostRelated;
