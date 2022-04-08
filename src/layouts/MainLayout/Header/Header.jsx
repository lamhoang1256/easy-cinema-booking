import { dataFakeAvatar } from "constants/dataFakeAvatar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutAction } from "redux/actions/auth.action";
import "./header.scss";

const headerNav = [
  { display: "Lịch chiếu", path: "/" },
  { display: "Cụm rạp", path: "/" },
  { display: "Tin tức", path: "/" },
  { display: "Ứng dụng", path: "/" },
];

export const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  // xử lí toggle menu
  const [isShowMenu, setIsShowMenu] = useState(false);
  const handleToggleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  // change background Navbar from Transparent to White when scroll > 10
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
              {userInfo ? (
                <div className='header-avatar'>
                  <img src={`${process.env.REACT_APP_PUBLIC}/assets/${dataFakeAvatar[0].url}`} />
                  <div className='header-user'>
                    <Link to='/user' className='header-user-item'>
                      Thông tin tài khoản
                    </Link>
                    <div className='header-user-item' onClick={handleLogout}>
                      Đăng xuất
                    </div>
                  </div>
                </div>
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
