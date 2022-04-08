import { dataFakeAvatar } from "constants/dataFakeAvatar";
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
  const userLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

  // change background Navbar from Transparent to White when scroll
  const [isWhiteNav, setIsWhiteNav] = useState(false);
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
  console.log(`${process.env.REACT_APP_PUBLIC}/assets/${dataFakeAvatar[0].url}`);

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
              {userLocalStorage ? (
                <Link to='/user'>
                  <img
                    className='header-avatar'
                    src={`${process.env.REACT_APP_PUBLIC}/assets/${dataFakeAvatar[0].url}`}
                  />
                </Link>
              ) : (
                <div className='header-auth'>
                  <Link to='/auth/register'>
                    <button className='header-register btn btn-secondary'>Đăng ký</button>
                  </Link>
                  <Link to='/auth/login'>
                    <button className='header-login btn btn--primary'>Đăng nhập</button>
                  </Link>
                </div>
              )}
              {/* <div className='header-auth'>
                <Link to='/auth/register'>
                  <button className='header-register btn btn-secondary'>Đăng ký</button>
                </Link>
                <Link to='/auth/login'>
                  <button className='header-login btn btn--primary'>Đăng nhập</button>
                </Link>
              </div> */}
              {/* navbar mobile close menu */}
              <div className='header-close' onClick={handleToggleMenu}>
                <ion-icon name='close-outline'></ion-icon>
              </div>
            </div>
            {/* navbar mobile open menu */}
            <div className='header-open' onClick={handleToggleMenu}>
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
