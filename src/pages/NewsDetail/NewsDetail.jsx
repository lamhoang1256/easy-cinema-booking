import React from "react";
import "./newDetail.scss";
import { dataNews } from "../../constants/dataNews";

export const NewsDetail = () => {
  console.log(dataNews);
  return (
    <div className='newDetail'>
      <div
        className='newDetail__top'
        style={{
          backgroundImage: `url("./assets/background-news.png"
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
            <div
              className='newDetail__content'
              dangerouslySetInnerHTML={{ __html: dataNews.map((item) => item.content) }}
            ></div>
          </div>
          {/* Phần tin tức bên phải */}
          <div className='newDetail__right'>
            {/* <SideNew /> */}
            123
          </div>
        </div>
      </div>
    </div>
  );
};
