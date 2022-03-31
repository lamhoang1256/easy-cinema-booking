import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.scss";

export const Header = () => {
  const headerNav = [
    { display: "Lịch chiếu", path: "/" },
    { display: "Cụm rạp", path: "/" },
    { display: "Tin tức", path: "/" },
    { display: "Ứng dụng", path: "/" },
  ];

  // change background Navbar from Transparent to White when scroll
  const [isWhiteNav, setIsWhiteNav] = useState(false);
  // lắng nghe sự kiện scroll trang
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setIsWhiteNav(true) : setIsWhiteNav(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  // xử lí toggle menu
  const [isShowMenu, setIsShowMenu] = useState(false);
  const handleToggleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  return (
    <header className={`header ${isWhiteNav ? "header--white" : ""}`}>
      <div className='header__container'>
        <div className='container'>
          <div className='header__top'>
            <Link to='/' className='header__logo'>
              <img src={`${process.env.REACT_APP_PUBLIC}/assets/logo-star-cineplex.png`} alt='' />
            </Link>
            <div className={`header__action ${isShowMenu ? "is-show" : ""}`}>
              {/* navbar link */}
              <ul className='navbar'>
                {headerNav.map((item, index) => (
                  <li className='navbar__item' key={index}>
                    <NavLink to={item.path} className='navbar__link'>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
              {/* navbar register, login */}
              <div className='header__auth'>
                <button className='header__register btn btn__secondary'>Đăng ký</button>
                <button className='header__login btn btn__primary'>Đăng nhập</button>
              </div>
              {/* navbar mobile close menu */}
              <div className='navbar__close' onClick={handleToggleMenu}>
                <ion-icon name='close-outline'></ion-icon>
              </div>
            </div>
            {/* navbar mobile open menu */}
            <div className='navbar__open' onClick={handleToggleMenu}>
              <ion-icon name='list-outline'></ion-icon>
            </div>
          </div>
        </div>
      </div>
      {/* overplay */}
      {isShowMenu && <div className='header__overplay' onClick={handleToggleMenu}></div>}
    </header>
  );
};
