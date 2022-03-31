import React from "react";
import { SideNew } from "../../../../components/SubNew/SideNew";
import "./news.scss";

export const News = () => {
  return (
    <div className='news'>
      <h2 className='news__heading'>Top news</h2>
      <div className='news__container'>
        <div className='news__main'>
          <div className='news__main-image'>
            <img
              src='https://c4.wallpaperflare.com/wallpaper/701/535/762/doraemon-antarctica-cold-snow-penguins-wallpaper-preview.jpg'
              alt=''
            />
          </div>
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
        <SideNew />
      </div>
    </div>
  );
};
