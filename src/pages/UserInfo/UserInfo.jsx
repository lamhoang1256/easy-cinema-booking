import React from "react";
import { Tabs } from "antd";

import "./userInfo.scss";

export const UserInfo = () => {
  const { TabPane } = Tabs;

  return (
    <div className='user-info'>
      <div
        className='new-detail-top'
        style={{
          backgroundImage: `url("${process.env.PUBLIC_URL}/assets/background-news.png"
          )`,
        }}
      >
        <div className='new-detail-heading'>
          <h2>Thông tin tài khoản</h2>
        </div>
      </div>
      <div className='user-info-wrapper'>
        <div className='container'>
          <div className='user-info-top'>
            <div className='user-info-avatar'>
              <img src={`${process.env.PUBLIC_URL}/assets/avatar/avatar-boss-baby.jpg`} alt='' />
            </div>
            <div className='user-info-name'>
              <h2>Nguyen Hoang Lam</h2>
              <p>lamhoang@gmail.com</p>
            </div>
          </div>
          <Tabs tabPosition={"left"}>
            <TabPane tab='Thông tin cơ bản' key='1'>
              Content of Tab 1
            </TabPane>
            <TabPane tab='Chỉnh sửa thông tin' key='2'>
              Chỉnh sửa thông tin
            </TabPane>
            <TabPane tab='Lịch sử đặt vé' key='3'>
              Lịch sử đặt vé
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
