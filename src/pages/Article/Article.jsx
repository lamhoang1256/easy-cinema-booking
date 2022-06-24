import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostRelated from "components/post/PostRelated";
import { articles } from "constants/articles";
import Description from "components/text/Description";
import styled from "styled-components";

const StyledArticle = styled.div`
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
  .article-post img {
    margin: 20px auto;
    border-radius: 10px;
  }
`;

const Article = () => {
  const { id } = useParams();
  const news = articles.filter((news) => news.id == id)[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!news) {
    return (
      <div className="container">
        <Description>Tin tức này không tồn tại</Description>
      </div>
    );
  }
  return (
    <StyledArticle>
      <div className="container">
        <div className="grid-layout">
          <div className="column1">
            <div className="article-post">
              <h1 className="article-title">{news.title}</h1>
              <span className="article-date">
                {new Date(news.createTime).toLocaleDateString("vi-VI")}
              </span>
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
    </StyledArticle>
  );
};
export default Article;
