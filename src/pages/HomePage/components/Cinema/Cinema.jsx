import React from "react";
import { Tabs } from "antd";
import "./cinema.scss";

export const Cinema = () => {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }

  return (
    <div className='cinema'>
      <div className='container'>
        <Tabs defaultActiveKey='1' onChange={callback} tabPosition='top'>
          <TabPane
            tab={
              <img
                className='cinema-icon'
                src={`${process.env.REACT_APP_PUBLIC}/assets/images/cinema/cinema-mega.png`}
              />
            }
            key='1'
          >
            <Tabs defaultActiveKey='1' tabPosition='left'>
              <TabPane
                tab={
                  <div className='cinema-boxed'>
                    <div className='cinema-boxed-img'>
                      <img
                        src={`${process.env.REACT_APP_PUBLIC}/assets/images/cinema/image-caothang.jpg`}
                        alt=''
                      />
                    </div>
                    <div className='cinema-boxed-info'>
                      <p>CGV - Aeon Bình Tân</p>
                      <p>Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường </p>
                    </div>
                  </div>
                }
                key='1'
              >
                <div className='cinema-boxed'>
                  <div className='cinema-boxed-img'>
                    <img
                      src={`${process.env.REACT_APP_PUBLIC}/assets/images/cinema/image-caothang.jpg`}
                      alt=''
                    />
                  </div>
                  <div className='cinema-boxed-info'>
                    <p>CGV - Aeon Bình Tân</p>
                    <p>Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường </p>
                  </div>
                </div>
              </TabPane>
              <TabPane tab='Hai Bà Trưng' key='2'>
                Raya Raya 120 phút - Điểm Tix 10 Thứ tư, 20 tháng 04, 2022 15:41 ~ 17:41
              </TabPane>
              <TabPane tab='Hoàn Kiếm' key='3'>
                Người kiến Người Kiến 120 phút - Điểm Tix 10 Thứ sáu, 09 tháng 07, 2021
              </TabPane>
            </Tabs>
          </TabPane>

          <TabPane tab='Rạp 2' key='2'>
            <Tabs defaultActiveKey='1' tabPosition='left'>
              <TabPane tab='Tân Phú' key='1'>
                John Wick John Wick 120 phút - Điểm Tix 10 Thứ ba, 22 tháng 02, 2022 19:33 ~ 21:33
                Chủ nhật, 19 tháng 09, 2021 07:00 ~ 09:00 Thứ tư, 29 tháng 09, 2021 11:54 ~ 13:54
                Thứ tư, 21 tháng 10, 2020 15:15 ~ 17:15
              </TabPane>
              <TabPane tab='Hai Bà Trưng' key='2'>
                Raya Raya 120 phút - Điểm Tix 10 Thứ tư, 20 tháng 04, 2022 15:41 ~ 17:41
              </TabPane>
              <TabPane tab='Hoàn Kiếm' key='3'>
                Người kiến Người Kiến 120 phút - Điểm Tix 10 Thứ sáu, 09 tháng 07, 2021
              </TabPane>
            </Tabs>
          </TabPane>

          <TabPane tab='Rạp 3' key='3'>
            <Tabs defaultActiveKey='1' tabPosition='left'>
              <TabPane tab='Tân Phú' key='1'>
                John Wick John Wick 120 phút - Điểm Tix 10 Thứ ba, 22 tháng 02, 2022 19:33 ~ 21:33
                Chủ nhật, 19 tháng 09, 2021 07:00 ~ 09:00 Thứ tư, 29 tháng 09, 2021 11:54 ~ 13:54
                Thứ tư, 21 tháng 10, 2020 15:15 ~ 17:15
              </TabPane>
              <TabPane tab='Hai Bà Trưng' key='2'>
                Raya Raya 120 phút - Điểm Tix 10 Thứ tư, 20 tháng 04, 2022 15:41 ~ 17:41
              </TabPane>
              <TabPane tab='Hoàn Kiếm' key='3'>
                Người kiến Người Kiến 120 phút - Điểm Tix 10 Thứ sáu, 09 tháng 07, 2021
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
