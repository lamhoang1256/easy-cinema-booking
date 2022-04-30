import React from "react";
import { NavLink } from "react-router-dom";
import { Collapse } from "antd";
import "./sidebar.scss";

const { Panel } = Collapse;
export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <ul>
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
        </ul>
      </div>
    </div>
  );
};
