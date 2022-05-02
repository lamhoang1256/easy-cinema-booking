import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import ModalEditUser from "./components/ModalEditUser";
import { usersApi } from "apis/usersApi";
import { sweetAlert } from "utilities/sweetAlert";
import { createKeyForObj } from "utilities/createKeyForObject";
import "./userManage.scss";

const UserManage = () => {
  const [userList, setUserList] = useState(null);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [usernameEdit, setUsernameEdit] = useState(null);

  const showModalEdit = (username) => {
    setUsernameEdit(username);
    setIsShowModalEdit(true);
  };

  // get all data user to render table
  const fetchUserList = async () => {
    try {
      const { data } = await usersApi.getUserListApi();
      const userListHasKey = createKeyForObj(data.content);
      setUserList(userListHasKey);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchUser = (username) => {
    if (username === "") {
      fetchUserList();
      return;
    }
    const fetchSearchedUser = async () => {
      try {
        const { data } = await usersApi.searchUserApi(username);
        const userListSearch = createKeyForObj(data.content);
        setUserList(userListSearch);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchedUser();
  };

  const handleDeleteUser = async (username) => {
    try {
      const response = await usersApi.deleteUserApi(username);
      if (response) {
        sweetAlert(
          "success",
          "Xóa người dùng thành công!",
          `Bạn đã xóa thành công tài khoản có tên ${username}!`
        );
        fetchUserList();
      }
    } catch (error) {
      sweetAlert("error", "Xóa người dùng thất bại!", error.response?.data?.content);
    }
  };

  useEffect(() => {
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
      title: "Phân quyền",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (maLoaiNguoiDung) => {
        if (maLoaiNguoiDung === "KhachHang") {
          return <Tag color='cyan'>{maLoaiNguoiDung.toUpperCase()}</Tag>;
        }
        if (maLoaiNguoiDung === "QuanTri")
          return <Tag color='volcano'>{maLoaiNguoiDung.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Xóa",
      dataIndex: "taiKhoan",
      key: "delete",
      render: (taiKhoan) => (
        <div
          className='user-manage-delete'
          onClick={() => {
            handleDeleteUser(taiKhoan);
          }}
        >
          <ion-icon name='trash-outline'></ion-icon>
        </div>
      ),
    },
    {
      title: "Sửa",
      dataIndex: "taiKhoan",
      key: "edit",
      render: (taiKhoan) => (
        <div className='user-manage-edit' onClick={() => showModalEdit(taiKhoan)}>
          <ion-icon name='create-outline'></ion-icon>
        </div>
      ),
    },
  ];

  return (
    <div className='user-manage'>
      <div className='user-manage-top'>
        <h2>Quản lí người dùng</h2>
        <div className='search-top'>
          <div className='search-top-icon'>
            <ion-icon name='search-outline'></ion-icon>
          </div>
          <input
            onKeyDown={(e) => handleSearchUser(e.target.value)}
            className='search-top-input'
            type='text'
            placeholder='Tìm tài khoản...'
          />
        </div>
      </div>
      <Table columns={columns} dataSource={userList} />

      <ModalEditUser
        usernameEdit={usernameEdit}
        isShowModalEdit={isShowModalEdit}
        setIsShowModalEdit={setIsShowModalEdit}
        fetchUserList={fetchUserList}
      />
    </div>
  );
};

export default UserManage;
