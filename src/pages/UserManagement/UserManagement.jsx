import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { usersApi } from "apis/usersApi";

export const UserManagement = () => {
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const { data } = await usersApi.getUserListApi();
        const dataHasKey = data.content.map(function (item, index) {
          return { ...item, key: index };
        });
        setUserList(dataHasKey);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserList();
  }, []);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ và tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Mã loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (maLoaiNguoiDung) => {
        if (maLoaiNguoiDung === "KhachHang") {
          return <Tag color='cyan'>{maLoaiNguoiDung.toUpperCase()}</Tag>;
        }
        if (maLoaiNguoiDung === "QuanTri") {
          return <Tag color='volcano'>{maLoaiNguoiDung.toUpperCase()}</Tag>;
        }
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={userList} />
    </>
  );
};
