import React from "react";
import { useParams } from "react-router-dom";
import { dataNews } from "constants/dataNews";
import { RightSideNews } from "components/RightSideNews/RightSideNews";
import "./newsDetail.scss";

export const NewsDetail = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  // lọc lấy tin cần đọc theo id trên url
  const dataPost = dataNews.filter((news) => news.id == id)[0];

  return (
    <div className='new-detail'>
      <div
        className='new-detail-top'
        style={{
          backgroundImage: `url("${process.env.PUBLIC_URL}/assets/images/background-news.png"
          )`,
        }}
      >
        <div className='new-detail-heading'>
          <h2>News Detail</h2>
        </div>
      </div>
      <div className='container'>
        <div className='new-detail-main'>
          <div className='new-detail-left'>
            {dataPost && (
              <div className='new-detail-post'>
                <p dangerouslySetInnerHTML={{ __html: dataPost.createdAt }}></p>
                <h2
                  className='new-detail-title'
                  dangerouslySetInnerHTML={{ __html: dataPost.title }}
                ></h2>
                <div
                  className='new-detail-content'
                  dangerouslySetInnerHTML={{ __html: dataPost.content }}
                ></div>
              </div>
            )}
          </div>
          {/* Phần tin tức bên phải */}
          <div className='new-detail-right'>
            <RightSideNews />
          </div>
        </div>
      </div>
    </div>
  );
};
