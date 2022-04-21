import React, { useEffect, useState } from "react";
import { Table, Tag, Radio, Divider } from "antd";
import { usersApi } from "apis/usersApi";

export const UserManagement = () => {
  const [userList, setUserList] = useState(null);

  const handleSearchUser = (username) => {
    if (username === "") {
      console.log("Vui lòng nhập tên!");
      return;
    }
    const fetchSearchedUser = async () => {
      try {
        const { data } = await usersApi.searchUser(username);
        const dataHasKey = data.content.map(function (item, index) {
          return { ...item, key: index };
        });
        setUserList(dataHasKey);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchedUser();
  };

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
    {
      title: "Xóa",
      dataIndex: "taiKhoan",
      key: "delete",
      render: (taiKhoan) => {
        return (
          <ion-icon
            onClick={() => {
              console.log(taiKhoan);
            }}
            name='trash-outline'
          ></ion-icon>
        );
      },
    },
    {
      title: "Sửa",
      dataIndex: "key",
      key: "edit",
      render: (key) => {
        return (
          <ion-icon
            onClick={() => {
              console.log(key);
            }}
            name='pencil-outline'
          ></ion-icon>
        );
      },
    },
  ];

  const [selectionType, setSelectionType] = useState("checkbox");
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <div className='search-top'>
        <div className='search-top-icon'>
          <ion-icon name='search-outline'></ion-icon>
        </div>
        <input
          onKeyDown={(e) => e.key === "Enter" && handleSearchUser(e.target.value)}
          className='search-top-input'
          type='text'
          placeholder='Tìm...'
        />
      </div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={userList}
      />
    </>
  );
};
