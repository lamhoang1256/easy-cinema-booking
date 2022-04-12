import React from "react";
import { Link } from "react-router-dom";
import { RightSideNews } from "components/RightSideNews/RightSideNews";
import { dataFakeNews } from "constants/dataFakeNews";
import "./article.scss";

export const Article = () => {
  return (
    <>
      {dataFakeNews && (
        <div className='news'>
          <h2 className='news-heading'>Top news</h2>
          <div className='news-container'>
            <div className='news-main'>
              <Link to={`news/${dataFakeNews[0].id}`} className='news-main-image'>
                <img className='news-thumb' src={dataFakeNews[0].thumbnail} alt='news-image' />
              </Link>
              <div className='news-content'>
                <p className='news-time'>
                  <ion-icon name='time-outline'></ion-icon> {dataFakeNews[0].createdAt}
                </p>
                <Link
                  to={`news/${dataFakeNews[0].id}`}
                  dangerouslySetInnerHTML={{ __html: dataFakeNews[0].title }}
                ></Link>
                <Link
                  to={`news/${dataFakeNews[0].id}`}
                  className='news-desc'
                  dangerouslySetInnerHTML={{ __html: dataFakeNews[0].content }}
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
