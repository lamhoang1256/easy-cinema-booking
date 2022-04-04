import React from "react";
import "./footer.scss";

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-container'>
          <div className='footer-top'>
            <div className='footer-logo'>LOGO</div>
            <ul className='footer-list'>
              <li className='footer-item'>
                <a href='#' className='footer-link'>
                  Lịch chiếu
                </a>
              </li>
              <li className='footer-item'>
                <a href='#' className='footer-link'>
                  Cụm rạp
                </a>
              </li>
              <li className='footer-item'>
                <a href='#' className='footer-link'>
                  Tin tức
                </a>
              </li>
              <li className='footer-item'>
                <a href='#' className='footer-link'>
                  Ứng dụng
                </a>
              </li>
            </ul>
            <div className='footer-github'>
              <a href='https://github.com/lamhoang1256'>
                <ion-icon name='logo-github'></ion-icon>
              </a>
            </div>
          </div>
          <div className='footer-bottom'>All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
};
