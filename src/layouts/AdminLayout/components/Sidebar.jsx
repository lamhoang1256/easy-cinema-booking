import React from "react";
import "./sidebar.scss";

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <div className='sidebar-logo'>CINEPLEX</div>
        <ul className='sidebar-list'>
          <li className='sidebar-item'>
            <ion-icon name='film-outline'></ion-icon>Quản lí phim
          </li>
          <li className='sidebar-item'>
            <ion-icon name='people-outline'></ion-icon>Quản lí người dùng
          </li>
          <li className='sidebar-item'>
            <ion-icon name='videocam-outline'></ion-icon>Quản lí rạp
          </li>
        </ul>
      </div>
    </div>
  );
};
