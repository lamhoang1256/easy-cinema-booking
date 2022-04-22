import { Modal } from "antd";
import { useEffect, useState } from "react";
import { usersApi } from "apis/usersApi";
import "./modalEditUser.scss";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupRegister } from "constants/schemaYupRegister";

const ModalEditUser = ({ usernameEdit, setIsModalEditUserVisible, isModalEditUserVisible }) => {
  // console.log(usernameEdit);
  const [userInfoEdit, setUserInfoEdit] = useState(null);
  // const [username, setUsername] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupRegister) });

  const handleUpdateUser = (data) => {
    const dataToUpdateUser = {
      taiKhoan: data.username,
      matKhau: data.password,
      email: data.email,
      soDt: data.phone,
      maNhom: "GP00",
      hoTen: data.fullname,
      maLoaiNguoiDung: "KhachHang",
    };
    console.log(dataToUpdateUser);

    const editUser = async (dataToUpdateUser) => {
      try {
        const data = await usersApi.editUserApi(dataToUpdateUser);
        console.log(data);
      } catch (error) {
        console.log(error.response?.data?.content);
      }
    };
    editUser(dataToUpdateUser);
  };

  const handleOk = () => {
    setIsModalEditUserVisible(false);
  };

  const handleCancel = () => {
    setIsModalEditUserVisible(false);
  };

  const fetchUserEdit = async () => {
    try {
      const { data } = await usersApi.getUserToEdit(usernameEdit);
      // console.log(data.content);
      // setUserInfoEdit(res.data.content);
      // setUsername(data.content.taiKhoan);
      reset({
        username: data.content.taiKhoan,
        fullname: data.content.hoTen,
        phone: data.content.soDT,
        email: data.content.email,
        password: data.content.matKhau,
        password_repeat: data.content.matKhau,
      });
    } catch (error) {
      console.log(error?.response?.data?.content);
    }
  };

  useEffect(() => {
    fetchUserEdit();
  }, [usernameEdit]);

  return (
    <Modal
      title={`Cập nhật thông tin người dùng`}
      visible={isModalEditUserVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      // footer={null}
    >
      {/* {userInfoEdit && ( */}
      <form className='user-info-edit' onSubmit={handleSubmit(handleUpdateUser)}>
        <div className='user-info-edit-group'>
          <h3>Tên tài khoản </h3>
          <input
            type='text'
            defaultValue={userInfoEdit?.taiKhoan}
            placeholder='Tên tài khoản'
            {...register("username")}
          />
          {errors.username && <span className='text--primary'>{errors.username.message}</span>}
        </div>

        {/* Họ và tên */}
        <div className='user-info-edit-group'>
          <h3>Họ và tên</h3>
          <input
            type='text'
            placeholder='Họ và tên'
            defaultValue={userInfoEdit?.hoTen}
            {...register("fullname")}
          />
          {errors.fullname && <span className='text--primary'>{errors.fullname.message}</span>}
        </div>

        {/* Email */}
        <div className='user-info-edit-group'>
          <h3>Email</h3>
          <input
            type='email'
            placeholder='Email'
            defaultValue={userInfoEdit?.email}
            {...register("email")}
          />
          {errors.email && <span className='text--primary'>{errors.email.message}</span>}
        </div>

        {/* Số điện thoại */}
        <div className='user-info-edit-group'>
          <h3>Số điện thoại</h3>
          <input
            type='text'
            placeholder='Số điện thoại'
            defaultValue={userInfoEdit?.soDT}
            {...register("phone")}
          />
          {errors.phone && <span className='text--primary'>{errors.phone.message}</span>}
        </div>

        {/* Mật khẩu */}
        <div className='user-info-edit-group'>
          <h3>Mật khẩu</h3>
          <input
            type='password'
            placeholder='Mật khẩu'
            defaultValue={userInfoEdit?.matKhau}
            {...register("password")}
          />
          {errors.password && <span className='text--primary'>{errors.password.message}</span>}
        </div>

        {/* Xác nhận mật khẩu */}
        <div className='user-info-edit-group'>
          <h3>Xác nhận mật khẩu</h3>
          <input
            type='password'
            placeholder='Xác nhận mật khẩu'
            defaultValue={userInfoEdit?.matKhau}
            {...register("password_repeat")}
          />
          {errors.password_repeat && (
            <span className='text--primary'>{errors.password_repeat.message}</span>
          )}
        </div>
        {/* SUBMIT */}
        <button type='submit' className='user-info-edit-submit btn btn--primary'>
          Chỉnh sửa
        </button>
      </form>
      {/* )} */}
    </Modal>
  );
};

export default ModalEditUser;
