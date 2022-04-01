import React from "react";
import { Link } from "react-router-dom";
import { SideNew } from "../../../../components/SideNew/SideNew";
import { dataNews } from "../../../../constants/dataNews";
import "./news.scss";

export const News = () => {
  return (
    <>
      {dataNews && (
        <div className='news'>
          <h2 className='news__heading'>Top news</h2>
          <div className='news__container'>
            <div className='news__main'>
              <Link to={`news/${dataNews[0].id}`} className='news__main-image'>
                <img src={dataNews[0].thumbnail} alt='news-image' />
              </Link>
              <div className='news__content'>
                <p className='news__time'>
                  <ion-icon name='time-outline'></ion-icon> {dataNews[0].createdAt}
                </p>
                <Link
                  to={`news/${dataNews[0].id}`}
                  dangerouslySetInnerHTML={{ __html: dataNews[0].title }}
                ></Link>
                <Link
                  to={`news/${dataNews[0].id}`}
                  className='news__desc'
                  dangerouslySetInnerHTML={{ __html: dataNews[0].content }}
                ></Link>
              </div>
            </div>
            <SideNew />
          </div>
        </div>
      )}
    </>
  );
};
