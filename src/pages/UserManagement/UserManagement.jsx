import React, { useEffect, useState } from "react";
import { usersApi } from "apis/usersApi";

export const UserManagement = () => {
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const { data } = await usersApi.getUserListApi();
        setUserList(data.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserList();
  }, []);

  console.log(userList);

  return (
    <div className='movie-history'>
      <table className='movie-history-table'>
        <thead className='movie-history-head'>
          <tr className='movie-history-row'>
            <th>Tên tài khoản</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Mật khẩu</th>
            <th>Mã loại người dùng</th>
          </tr>
        </thead>

        {/* table body */}
        <tbody className='movie-history-body'>
          {userList &&
            userList.map((user, index) => (
              <tr className='movie-history-row' key={index}>
                <td>{user.taiKhoan}</td>
                <td>{user.hoTen}</td>
                <td>{user.email}</td>
                <td>{user.soDt}</td>
                <td>{user.matKhau}</td>
                <td>{user.maLoaiNguoiDung}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
/*
<tbody className='movie-history-body'>
          {userProfile &&
            userProfile.thongTinDatVe.length !== 0 &&
            userProfile.thongTinDatVe.map((item, index) => (
              <tr className='movie-history-row' key={index}>
                <td>{item.tenPhim}</td>
                <td>
                  <img className='movie-history-thumb' src={item.hinhAnh} />
                </td>
                <td>
                  {new Date(item.ngayDat).toLocaleDateString()}{" "}
                  {new Date(item.ngayDat).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{item.danhSachGhe[0].tenHeThongRap}</td>
                <td>
                  <div className='movie-history-chairs'>
                    {/* {getIdChair(item.danhSachGhe).map((seat, index) => (
                    <span key={index}>{seat}</span>
                  ))} 
                  </div>
                </td>
                <td>{(item.giaVe * item.danhSachGhe.length).toLocaleString("en-US")} VNĐ</td>
              </tr>
            ))}
                </tbody> */
