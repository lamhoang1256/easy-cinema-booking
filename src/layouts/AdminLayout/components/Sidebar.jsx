import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutAction } from "redux/actions/user/user.action";
import "./sidebar.scss";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
    window.location.reload();
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <Link to='/admin'>
          <h2 className='sidebar-heading'>Cineplex Admin</h2>
        </Link>
        <ul>
          <li className='sidebar-item'>
            <NavLink end to='/admin'>
              <ion-icon name='people-outline'></ion-icon>
              Trang tổng quan
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink to='/admin/user-manage'>
              <ion-icon name='people-outline'></ion-icon>
              Quản lí người dùng
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink to='/admin/movie-manage'>
              <ion-icon name='videocam-outline'></ion-icon>Quản lí phim
            </NavLink>
          </li>
          <li className='sidebar-item'>
            <NavLink to='/admin/cinema-manage'>
              <ion-icon name='storefront-outline'></ion-icon>Quản lí rạp
            </NavLink>
          </li>
          <li>
            <button className='btn btn--info sidebar-logout' onClick={handleLogout}>
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
