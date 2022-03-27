import React from "react";
import { NavLink } from "react-router-dom";
import { Carousel } from "./Carousel/Carousel";
import "./header.scss";

export const Header = () => {
  return (
    <header className='header'>
      {/* Hero Slider */}
      <Carousel></Carousel>
      <div className='header__container'>
        <div className='container'>
          <div className='header__top'>
            <div className='header__logo'>
              <img src='./assets/logo-star-cineplex.png' alt='' />
            </div>
            <div className='header__action'>
              <ul className='navbar'>
                <li className='navbar__item'>
                  <NavLink to='/' className='navbar__link'>
                    Lịch chiếu
                  </NavLink>
                </li>
                <li className='navbar__item'>
                  <NavLink to='/' className='navbar__link'>
                    Cụm rạp
                  </NavLink>
                </li>
                <li className='navbar__item'>
                  <NavLink to='/' className='navbar__link'>
                    Tin tức
                  </NavLink>
                </li>
                <li className='navbar__item'>
                  <NavLink to='/' className='navbar__link'>
                    Ứng dụng
                  </NavLink>
                </li>
              </ul>
              <div className='header__auth'>
                <button className='header__register btn btn__secondary'>Register</button>
                <button className='header__login btn btn__primary'>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
