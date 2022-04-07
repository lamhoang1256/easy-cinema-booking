import React from "react";
import { Link } from "react-router-dom";
import { RightSideNews } from "../../../../components/RightSideNews/RightSideNews";
import { dataNews } from "../../../../constants/dataNews";
import "./article.scss";

export const Article = () => {
  return (
    <>
      {dataNews && (
        <div className='news'>
          <h2 className='news-heading'>Top news</h2>
          <div className='news-container'>
            <div className='news-main'>
              <Link to={`news/${dataNews[0].id}`} className='news-main-image'>
                <img className='news-thumb' src={dataNews[0].thumbnail} alt='news-image' />
              </Link>
              <div className='news-content'>
                <p className='news-time'>
                  <ion-icon name='time-outline'></ion-icon> {dataNews[0].createdAt}
                </p>
                <Link
                  to={`news/${dataNews[0].id}`}
                  dangerouslySetInnerHTML={{ __html: dataNews[0].title }}
                ></Link>
                <Link
                  to={`news/${dataNews[0].id}`}
                  className='news-desc'
                  dangerouslySetInnerHTML={{ __html: dataNews[0].content }}
                ></Link>
              </div>
            </div>
            <RightSideNews />
          </div>
        </div>
      )}
    </>
  );
};
