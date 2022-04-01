import React from "react";
import { Link } from "react-router-dom";
import { dataNews } from "../../constants/dataNews";
import "./sideNew.scss";

export const SideNew = () => {
  const dataSideNews = dataNews.filter((news) => news.id !== 1);

  return (
    <div className='news__side'>
      {dataSideNews &&
        dataSideNews.map((news, index) => (
          <Link to={`/news/${news.id}`} className='news__item' key={index}>
            <div className='news__image'>
              <img src={news.thumbnail} alt='' />
            </div>
            <div className='news__content'>
              <p className='news__time'>
                <ion-icon name='time-outline'></ion-icon> {news.createdAt}
              </p>
              <div className='news__title' dangerouslySetInnerHTML={{ __html: news.title }}></div>
              <div className='news__desc' dangerouslySetInnerHTML={{ __html: news.content }}></div>
            </div>
          </Link>
        ))}

      {/* <div className='news__sub-item'>
        <img
          src='https://c4.wallpaperflare.com/wallpaper/542/422/481/anime-doraemon-nobita-nobi-shizuka-minamoto-hd-wallpaper-preview.jpg'
          alt=''
        />
        <div className='news__content'>
          <p className='news__time'>
            <ion-icon name='time-outline'></ion-icon> Sep 13 ,2022
          </p>
          <h3 className='news__title'>Doraemon movie 2022</h3>
          <p className='news__desc'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, molestias saepe.
            Id error, quasi amet inventore deserunt quam? Incidunt est laboriosam ipsum architecto
            dignissimos, impedit rem dicta ad maiores odit.
          </p>
        </div>
      </div>
      <div className='news__sub-item'>
        <img
          src='https://c4.wallpaperflare.com/wallpaper/542/422/481/anime-doraemon-nobita-nobi-shizuka-minamoto-hd-wallpaper-preview.jpg'
          alt=''
        />
        <div className='news__content'>
          <p className='news__time'>
            <ion-icon name='time-outline'></ion-icon> Sep 13 ,2022
          </p>
          <h3 className='news__title'>Doraemon movie 2022</h3>
          <p className='news__desc'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, molestias saepe.
            Id error, quasi amet inventore deserunt quam? Incidunt est laboriosam ipsum architecto
            dignissimos, impedit rem dicta ad maiores odit.
          </p>
        </div>
      </div> */}
    </div>
  );
};
