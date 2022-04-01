import React from "react";
import { dataNews } from "../../constants/dataNews";
import { SideNew } from "../../components/SideNew/SideNew";
import { useParams } from "react-router-dom";
import "./newsDetail.scss";

export const NewsDetail = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  // lọc lấy tin cần đọc theo id trên url
  const dataPost = dataNews.filter((news) => news.id == id)[0];

  return (
    <div className='newDetail'>
      <div
        className='newDetail__top'
        style={{
          backgroundImage: `url("${process.env.PUBLIC_URL}/assets/background-news.png"
          )`,
        }}
      >
        <div className='container'>
          <h2>News Detail</h2>
        </div>
      </div>
      <div className='container'>
        <div className='newDetail__main'>
          <div className='newDetail__left'>
            {dataPost && (
              <div className='newDetail__post'>
                <p dangerouslySetInnerHTML={{ __html: dataPost.createdAt }}></p>
                <h2
                  className='newDetail__title'
                  dangerouslySetInnerHTML={{ __html: dataPost.title }}
                ></h2>
                <div
                  className='newDetail__content'
                  dangerouslySetInnerHTML={{ __html: dataPost.content }}
                ></div>
              </div>
            )}
          </div>
          {/* Phần tin tức bên phải */}
          <div className='newDetail__right'>
            {/* <SideNew /> */}
            <SideNew />
          </div>
        </div>
      </div>
    </div>
  );
};
