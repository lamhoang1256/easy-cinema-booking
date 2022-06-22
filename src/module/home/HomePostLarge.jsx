import { dataFakeNews } from "constants/dataFakeNews";
import { Link } from "react-router-dom";
import Image from "components/image/Image";
import styled from "styled-components";
import { TextClamp } from "assets/styles/mixin";

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
  .post-title h3 {
    color: var(--white);
    ${TextClamp.multilines(2)}
  }
  .post-desc {
    ${TextClamp.multilines(2)}
  }
  .post-desc p {
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
  const { id, thumbnail, title, content } = dataFakeNews[0];
  return (
    <StyledHomePostLarge>
      <Image to={`news/${id}`} className="post-image" url={thumbnail} />
      <div className="post-content">
        <Link
          to={`news/${id}`}
          className="post-title"
          dangerouslySetInnerHTML={{ __html: title }}
        ></Link>
        <Link
          to={`news/${id}`}
          className="post-desc"
          dangerouslySetInnerHTML={{ __html: content }}
        ></Link>
      </div>
    </StyledHomePostLarge>
  );
};

export default HomePostLarge;
