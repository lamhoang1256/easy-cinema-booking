import { Modal } from "antd";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupRegister } from "constants/schemaYupRegister";
import "./modalEditUser.scss";
import { useEffect, useState } from "react";
import { usersApi } from "apis/usersApi";

const ModalEditUser = ({ usernameEdit, setIsModalEditUserVisible, isModalEditUserVisible }) => {
  // console.log(userInfoEdit);
  const [userInfoEdit, setUserInfoEdit] = useState(null);
  console.log(usernameEdit);
  const {
    register,
    handleSubmit,
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
  };

  const handleOk = () => {
    setIsModalEditUserVisible(false);
  };

  const handleCancel = () => {
    setIsModalEditUserVisible(false);
  };

  useEffect(() => {
    const fetchUserEdit = async () => {
      try {
        // await setUserInfoEdit(null);
        const { data } = await usersApi.getUserToEdit(usernameEdit);
        setUserInfoEdit(data.content);
      } catch (error) {
        console.log(error?.response?.data?.content);
      }
    };
    fetchUserEdit();
  }, [usernameEdit]);

  console.log("re-render");

  return (
    <Modal
      title={`Cập nhật thông tin người dùng`}
      visible={isModalEditUserVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <form className='user-info-edit' onSubmit={handleSubmit(handleUpdateUser)}>
        {/* Tên tài khoản */}
        <div className='user-info-edit-group'>
          <h3>Tên tài khoản</h3>
          <input
            type='text'
            value={userInfoEdit?.taiKhoan}
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
            value={userInfoEdit?.hoTen}
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
            value={userInfoEdit?.email}
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
            value={userInfoEdit?.soDT}
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
            value={userInfoEdit?.matKhau}
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
            value={userInfoEdit?.matKhau}
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
    </Modal>
  );
};

export default ModalEditUser;
