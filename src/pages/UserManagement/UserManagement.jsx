import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { usersApi } from "apis/usersApi";
import Swal from "sweetalert2";
import ModalEditUser from "./components/ModalEditUser";

export const UserManagement = () => {
  const [userList, setUserList] = useState(null);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [usernameEdit, setUsernameEdit] = useState(null);

  const showModalEdit = async (username) => {
    setUsernameEdit(username);
    setIsShowModalEdit(true);
  };

  // lấy danh sách thông tin user đổ ra table
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

  const handleSearchUser = (username) => {
    if (username === "") {
      fetchUserList();
      return;
    }
    const fetchSearchedUser = async () => {
      try {
        const { data } = await usersApi.searchUserApi(username);
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

  const handleDeleteUser = async (username) => {
    try {
      const response = await usersApi.deleteUserApi(username);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Xóa người dùng thành công",
          text: `Bạn đã xóa thành công tài khoản có tên ${username}!`,
          confirmButtonColor: "#d33",
        });
        fetchUserList();
        return;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Xóa người dùng thất bại",
        text: error.response?.data?.content,
        confirmButtonColor: "#d33",
      });
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
      title: "Mã loại người dùng",
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
        <ion-icon
          onClick={() => {
            handleDeleteUser(taiKhoan);
          }}
          name='trash-outline'
        ></ion-icon>
      ),
    },
    {
      title: "Sửa",
      dataIndex: "taiKhoan",
      key: "edit",
      render: (taiKhoan) => (
        <ion-icon onClick={() => showModalEdit(taiKhoan)} name='pencil-outline'></ion-icon>
      ),
    },
  ];

  return (
    <>
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
      <Table columns={columns} dataSource={userList} />
      <ModalEditUser
        usernameEdit={usernameEdit}
        isShowModalEdit={isShowModalEdit}
        setIsShowModalEdit={setIsShowModalEdit}
        fetchUserList={fetchUserList}
      />
    </>
  );
};
