import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "components/Banner/Banner";
import PostRelated from "components/post/PostRelated";
import { dataFakeNews } from "constants/dataFakeNews";
import Description from "components/text/Description";
import styled from "styled-components";
import Section from "components/section/Section";

const StyledNewsDetail = styled.div`
  .article-top {
    position: relative;
    height: 30vh;
    width: 100%;
    padding-top: 80px;
    background-size: cover;
    background-repeat: no-repeat;
    @include flexbox(center, center);
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }
    @include tablet {
      height: 30vh;
    }
  }
  .article-title h3 {
    color: #fff;
    font-size: 2.4rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .article-date {
    color: var(--gray-light);
  }
  .article-main {
    display: flex;
    gap: 30px;
    padding: 60px 0 20px;
  }
  .article-left {
    flex-basis: 65%;
    @include tablet {
      flex: 1;
    }
  }
  .article-right {
    flex-basis: 35%;
    @include tablet {
      display: none;
    }
  }
  .article-post {
    img {
      margin: 20px auto;
      border-radius: 10px;
    }
  }
`;

const urlBanner = `/assets/images/background/news.png`;
const NewsDetail = () => {
  const { idNewsDetail } = useParams();
  const news = dataFakeNews.filter((news) => news.id == idNewsDetail)[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!news) {
    return (
      <div className="container">
        <Description>Tin tức này không tồn tại</Description>;
      </div>
    );
  }
  return (
    <StyledNewsDetail>
      <Banner urlBanner={`url(${urlBanner})`} heading={"Trang tin chi tiết"} />
      <div className="container">
        <div className="grid-layout">
          <div className="column1">
            <div className="article-post">
              <span
                className="article-date"
                dangerouslySetInnerHTML={{ __html: news.createdAt }}
              ></span>
              <h1 className="article-title" dangerouslySetInnerHTML={{ __html: news.title }} />
              <Description
                lineHeight={1.9}
                className="article-content"
                dangerouslySetInnerHTML={{ __html: news.content }}
              ></Description>
            </div>
          </div>
          <div className="column2">
            <PostRelated />
          </div>
        </div>
      </div>
    </StyledNewsDetail>
  );
};
export default NewsDetail;
