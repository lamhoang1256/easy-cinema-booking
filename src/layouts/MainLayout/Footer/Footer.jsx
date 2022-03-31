import React from "react";
import "./footer.scss";

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer__container'>
          <div className='footer__top'>
            <div className='footer__logo'>LOGO</div>
            <ul className='footer__list'>
              <li className='footer__item'>
                <a href='#' className='footer__link'>
                  Lịch chiếu
                </a>
              </li>
              <li className='footer__item'>
                <a href='#' className='footer__link'>
                  Cụm rạp
                </a>
              </li>
              <li className='footer__item'>
                <a href='#' className='footer__link'>
                  Tin tức
                </a>
              </li>
              <li className='footer__item'>
                <a href='#' className='footer__link'>
                  Ứng dụng
                </a>
              </li>
            </ul>
            <div className='footer__github'>
              <a href='https://github.com/lamhoang1256'>
                <ion-icon name='logo-github'></ion-icon>
              </a>
            </div>
          </div>
          <div className='footer__bottom'>All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
};
