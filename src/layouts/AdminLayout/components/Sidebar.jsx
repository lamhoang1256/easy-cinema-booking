import React from "react";
import { Link } from "react-router-dom";
import { Collapse } from "antd";
import "./sidebar.scss";

const { Panel } = Collapse;
export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header='Quản lí người dùng' key='1'>
            <ul className='sidebar-list'>
              <Link to='/admin/user-manage'>
                <li className='sidebar-item'>
                  <ion-icon name='film-outline'></ion-icon>Danh sách người dùng
                </li>
              </Link>
            </ul>
          </Panel>
          <Panel header='Quản lí phim' key='2'>
            <ul className='sidebar-list'>
              <Link to='/admin/movie-manage'>
                <li className='sidebar-item'>
                  <ion-icon name='film-outline'></ion-icon>Danh sách phim
                </li>
              </Link>
            </ul>
          </Panel>
          <Panel header='Quản lí phòng vé' key='3'>
            <ul className='sidebar-list'>
              <li className='sidebar-item'>
                <ion-icon name='film-outline'></ion-icon>Lịch chiếu phim
              </li>
            </ul>
          </Panel>
          <Panel header='Quản lí rạp' key='4'>
            <ul className='sidebar-list'>
              <Link to='/admin/cinema-manage'>
                <li className='sidebar-item'>
                  <ion-icon name='film-outline'></ion-icon>Tất cả cụm rạp
                </li>
              </Link>
              <li className='sidebar-item'>
                <ion-icon name='people-outline'></ion-icon>Thông tin lịch chiếu
              </li>
            </ul>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
