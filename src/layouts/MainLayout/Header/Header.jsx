import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.scss";

const headerNav = [
  { display: "Lịch chiếu", path: "/" },
  { display: "Cụm rạp", path: "/" },
  { display: "Tin tức", path: "/" },
  { display: "Ứng dụng", path: "/" },
];

export const Header = () => {
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
      <div className='header-container'>
        <div className='container'>
          <div className='header-top'>
            <Link to='/' className='header-logo'>
              <img src={`${process.env.REACT_APP_PUBLIC}/assets/logo-star-cineplex.png`} alt='' />
            </Link>
            <div className={`header-action ${isShowMenu ? "is-show" : ""}`}>
              {/* navbar link */}
              <ul className='navbar'>
                {headerNav.map((item, index) => (
                  <li className='navbar-item' key={index}>
                    <NavLink to={item.path} className='navbar-link'>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
              {/* navbar register, login */}
              <div className='header-auth'>
                <button className='header-register btn btn-secondary'>Đăng ký</button>
                <button className='header-login btn btn--primary'>Đăng nhập</button>
              </div>
              {/* navbar mobile close menu */}
              <div className='navbar-close' onClick={handleToggleMenu}>
                <ion-icon name='close-outline'></ion-icon>
              </div>
            </div>
            {/* navbar mobile open menu */}
            <div className='navbar-open' onClick={handleToggleMenu}>
              <ion-icon name='list-outline'></ion-icon>
            </div>
          </div>
        </div>
      </div>
      {/* overplay */}
      {isShowMenu && <div className='header-overplay' onClick={handleToggleMenu}></div>}
    </header>
  );
};
