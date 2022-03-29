import React from "react";
import { Select } from "antd";
import "./filterBooking.scss";

export const FilterBooking = () => {
  const { Option } = Select;
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div className='filter__booking'>
      <div className='container'>
        <div className='filter'>
          <h2 className='filter__heading'>HỆ THỐNG ĐẶT VÉ ONLINE</h2>
          <p className='filter__desc'>
            Chọn được chỗ ngồi yêu thích, tận hưởng bộ phim tại vị trí thoải mái nhất.
          </p>
          <div className='filter__container'>
            <Select
              showSearch
              placeholder='Tìm phim'
              optionFilterProp='children'
              bordered={false}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value='1'>Not Identified</Option>
              <Option value='2'>Closed</Option>
              <Option value='3'>Communicated</Option>
              <Option value='4'>Identified</Option>
              <Option value='5'>Resolved</Option>
              <Option value='6'>Cancelled</Option>
            </Select>
            {/* Rạp */}
            <div className='filter__cinema'>
              <Select
                defaultValue='Rạp'
                bordered={false}
                style={{ width: "100%" }}
                onChange={handleChange}
              >
                <Option value='jack'>CommunicatedCommunicatedCommunicated</Option>
                <Option value='lucy'>Lucy</Option>
                <Option value='disabled' disabled>
                  Disabled
                </Option>
                <Option value='Yiminghe'>yiminghe</Option>
              </Select>
            </div>
            {/* Ngày xem */}
            <div className='filter__time'>
              <Select
                defaultValue='Ngày xem'
                bordered={false}
                style={{ width: "100%" }}
                onChange={handleChange}
              >
                <Option value='jack'>Jack</Option>
                <Option value='lucy'>Lucy</Option>
                <Option value='disabled' disabled>
                  Disabled
                </Option>
                <Option value='Yiminghe'>yiminghe</Option>
              </Select>
            </div>
            {/* Suất chiếu */}
            <div className='filter__showtime'>
              <Select
                defaultValue='Suất chiếu'
                bordered={false}
                style={{ width: "100%" }}
                onChange={handleChange}
              >
                <Option value='jack'>Jack</Option>
                <Option value='lucy'>Lucy</Option>
                <Option value='disabled' disabled>
                  Disabled
                </Option>
                <Option value='Yiminghe'>yiminghe</Option>
              </Select>
            </div>
            {/* Button mua vé */}
            <button className='filter__btn btn btn__primary'>MUA VÉ NGAY</button>
          </div>
        </div>
      </div>
    </div>
  );
};
