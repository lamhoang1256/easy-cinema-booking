import React from "react";
import "./movieHistory.scss";

export const MovieHistory = () => {
  return (
    <div className='movie-history'>
      <table className='movie-history-table'>
        <thead className='movie-history-head'>
          <tr className='movie-history-row'>
            <th>Tên phim</th>
            <th>Hình ảnh</th>
            <th>Ngày đặt</th>
            <th>Rạp</th>
            <th>Số ghế</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        {/* body */}
        <tbody className='movie-history-body'>
          <tr className='movie-history-row'>
            <td>Cuộc chiến bắt đầu sau 5 giây</td>
            <td>
              <img
                className='movie-history-thumb'
                src='https://movienew.cybersoft.edu.vn/hinhanh/avengers-infinity-war.jpg'
                alt=''
              />
            </td>
            <td>12/12/2022</td>
            <td>CVG - Bình Tân</td>
            <td className='movie-history-chairs'>
              1,2,3,4,7,1,2,3,4,71,2,3,4,71,2,3,4,71,2,3,4,71,2,3,4,71,2,3,4,71,2,3,4,71,2,3,4,71,2,3,4,71,2,3,4,71,2,3,4,71,2,3,4,7
            </td>
            <td>430.000 VNĐ</td>
          </tr>
          <tr className='movie-history-row'>
            <td>Loạn nhịp</td>
            <td>
              <img
                className='movie-history-thumb'
                src='https://movienew.cybersoft.edu.vn/hinhanh/avengers-infinity-war.jpg'
                alt=''
              />
            </td>
            <td>12/12/2022</td>
            <td>CVG - Bình Tân</td>
            <td>1,2,3,4,7</td>
            <td>430.000 VNĐ</td>
          </tr>
          <tr className='movie-history-row'>
            <td>Loạn nhịp</td>
            <td>
              <img
                className='movie-history-thumb'
                src='https://movienew.cybersoft.edu.vn/hinhanh/avengers-infinity-war.jpg'
                alt=''
              />
            </td>
            <td>12/12/2022</td>
            <td>CVG - Bình Tân</td>
            <td>1,2,3,4,7</td>
            <td>430.000 VNĐ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
