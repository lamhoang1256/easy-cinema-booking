import React from "react";
import "./sidebar.scss";

import { Collapse } from "antd";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <Collapse defaultActiveKey={["1"]} onChange={callback}>
          <Panel header='Quản lí người dùng' key='1'>
            <ul className='sidebar-list'>
              <Link to='/admin/user-management'>
                <li className='sidebar-item'>
                  <ion-icon name='film-outline'></ion-icon>Danh sách người dùng
                </li>
              </Link>
            </ul>
          </Panel>
          <Panel header='Quản lí phim' key='2'>
            <ul className='sidebar-list'>
              <Link to='/admin/movie-management'>
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
              <li className='sidebar-item'>
                <ion-icon name='film-outline'></ion-icon>Thông tin cụm rạp
              </li>
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
// export const Sidebar = () => {
//   return (
//     <div className='sidebar'>
//       <div className='sidebar-container'>
//         <div className='sidebar-logo'>CINEPLEX</div>
// <ul className='sidebar-list'>
//   <li className='sidebar-item'>
//     <ion-icon name='film-outline'></ion-icon>Quản lí phim
//   </li>
//   <li className='sidebar-item'>
//     <ion-icon name='people-outline'></ion-icon>Quản lí người dùng
//   </li>
//   <li className='sidebar-item'>
//     <ion-icon name='videocam-outline'></ion-icon>Quản lí rạp
//   </li>
// </ul>
//       </div>
//     </div>
//   );
// };
