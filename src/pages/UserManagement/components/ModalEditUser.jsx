import { useEffect } from "react";
import { usersApi } from "apis/usersApi";
import { Modal } from "antd";
import Swal from "sweetalert2";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupRegister } from "constants/schemaYupRegister";
import InputText from "components/Input/InputText";
import MessageErrorValidation from "components/MessageErrorValidation/MessageErrorValidation";
import "./modalEditUser.scss";

const ModalEditUser = ({ usernameEdit, setIsShowModalEdit, isShowModalEdit, fetchUserList }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schemaYupRegister) });

  const onCloseModal = () => {
    setIsShowModalEdit(false);
  };

  const handleUpdateUser = (data) => {
    const requestUserUpdate = {
      taiKhoan: data.username,
      matKhau: data.password,
      email: data.email,
      soDt: data.phone,
      maNhom: "GP00",
      hoTen: data.fullname,
      maLoaiNguoiDung: data.role,
    };

    const updateUser = async (requestUserUpdate) => {
      try {
        const response = await usersApi.editUserApi(requestUserUpdate);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Sửa thông tin thành công",
            text: `Bạn đã sửa thành công thông tin người dùng!`,
            confirmButtonColor: "#d33",
          });
          fetchUserList();
          onCloseModal();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Sửa thông tin thất bại",
          text: error.response?.data?.content,
          confirmButtonColor: "#d33",
        });
      }
    };

    updateUser(requestUserUpdate);
  };

  const fetchUserEdit = async () => {
    try {
      const { data } = await usersApi.getUserToEdit(usernameEdit);
      reset({
        username: data.content.taiKhoan,
        fullname: data.content.hoTen,
        phone: data.content.soDT,
        role: data.content.maLoaiNguoiDung,
        email: data.content.email,
        password: data.content.matKhau,
        password_repeat: data.content.matKhau,
      });
    } catch (error) {
      console.log(error?.response?.data?.content);
    }
  };

  useEffect(() => {
    if (usernameEdit !== null) fetchUserEdit();
  }, [usernameEdit]);

  return (
    <Modal
      title={`Cập nhật thông tin người dùng`}
      visible={isShowModalEdit}
      onCancel={onCloseModal}
      footer={null}
    >
      <form className='user-info-edit' onSubmit={handleSubmit(handleUpdateUser)}>
        <div className='user-info-edit-group'>
          <h3>Họ và tên</h3>
          <InputText name='fullname' control={control} type='text' placeholder='Họ và tên' />
          <MessageErrorValidation errorMessage={errors.fullname?.message} />
        </div>

        <div className='user-info-edit-group'>
          <h3>Email</h3>
          <InputText name='email' control={control} type='email' placeholder='Email' />
          <MessageErrorValidation errorMessage={errors.email?.message} />
        </div>

        <div className='user-info-edit-group'>
          <h3>Số điện thoại</h3>
          <InputText name='phone' control={control} type='text' placeholder='Số điện thoại' />
          <MessageErrorValidation errorMessage={errors.phone?.message} />
        </div>

        <div className='user-info-edit-group'>
          <h3>Mật khẩu</h3>
          <InputText name='password' control={control} type='password' placeholder='Mật khẩu' />
          <MessageErrorValidation errorMessage={errors.password?.message} />
        </div>

        <div className='user-info-edit-group'>
          <h3>Xác nhận mật khẩu</h3>
          <InputText
            name='password_repeat'
            control={control}
            type='password'
            placeholder='Xác nhận mật khẩu'
          />
          <MessageErrorValidation errorMessage={errors.password_repeat?.message} />
        </div>

        <div className='user-info-edit-group'>
          <h3>Quyền quản trị</h3>
          <select name='role' className='user-info-edit-role' {...register("role")}>
            <option value='KhachHang'>Khách Hàng</option>
            <option value='QuanTri'>Quản Trị</option>
          </select>
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
