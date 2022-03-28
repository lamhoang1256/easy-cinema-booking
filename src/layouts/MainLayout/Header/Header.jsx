import React from "react";
import { NavLink } from "react-router-dom";
import { Carousel } from "./Carousel/Carousel";
import "./header.scss";

export const Header = () => {
  const headerNav = [
    { display: "Lịch chiếu", path: "/" },
    { display: "Cụm rạp", path: "/" },
    { display: "Tin tức", path: "/" },
    { display: "Ứng dụng", path: "/" },
  ];

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
                {headerNav.map((item, index) => (
                  <li className='navbar__item' key={index}>
                    <NavLink to={item.path} className='navbar__link'>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className='header__auth'>
                <button className='header__register btn btn__secondary'>Đăng ký</button>
                <button className='header__login btn btn__primary'>Đăng nhập</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
