import { useEffect } from "react";
import { usersApi } from "apis/usersApi";
import { Modal } from "antd";
import Swal from "sweetalert2";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupRegister } from "constants/schemaYupRegister";
// components
import InputText from "components/temp/InputText";
import ErrorValidation from "components/Message/ErrorValidation";

const ModalEdit = (props) => {
  const { usernameEdit, setIsShowModalEdit, isShowModalEdit, fetchUserList } = props;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupRegister) });

  // get information user need edit
  const getUserEdit = async () => {
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

  const handleEditUser = (data) => {
    const requestUserEdit = {
      taiKhoan: data.username,
      matKhau: data.password,
      email: data.email,
      soDt: data.phone,
      hoTen: data.fullname,
      maLoaiNguoiDung: data.role,
      maNhom: "GP00",
    };
    // get edited data and post to server to update
    const editUser = async (requestUserEdit) => {
      try {
        const response = await usersApi.editUserApi(requestUserEdit);
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
    editUser(requestUserEdit);
  };

  const onCloseModal = () => {
    setIsShowModalEdit(false);
  };

  useEffect(() => {
    if (usernameEdit !== null) getUserEdit();
  }, [usernameEdit]);

  return (
    <Modal
      title={`Cập nhật thông tin người dùng`}
      visible={isShowModalEdit}
      onCancel={onCloseModal}
      footer={null}
    >
      <form className="user-info-edit" onSubmit={handleSubmit(handleEditUser)}>
        <div className="user-info-edit-group">
          <InputText
            label="Họ và tên"
            name="fullname"
            control={control}
            type="text"
            placeholder="Họ và tên"
          />
          <ErrorValidation errorMessage={errors.fullname?.message} />
        </div>

        <div className="user-info-edit-group">
          <InputText
            label="Email"
            name="email"
            control={control}
            type="email"
            placeholder="Email"
          />
          <ErrorValidation errorMessage={errors.email?.message} />
        </div>

        <div className="user-info-edit-group">
          <InputText
            label="Số điện thoại"
            name="phone"
            control={control}
            type="text"
            placeholder="Số điện thoại"
          />
          <ErrorValidation errorMessage={errors.phone?.message} />
        </div>

        <div className="user-info-edit-group">
          <InputText
            label="Mật khẩu"
            name="password"
            control={control}
            type="password"
            placeholder="Mật khẩu"
          />
          <ErrorValidation errorMessage={errors.password?.message} />
        </div>

        <div className="user-info-edit-group">
          <InputText
            label="Xác nhận mật khẩu"
            name="password_repeat"
            control={control}
            type="password"
            placeholder="Xác nhận mật khẩu"
          />
          <ErrorValidation errorMessage={errors.password_repeat?.message} />
        </div>

        <div className="user-info-edit-group">
          <h3>Quyền quản trị</h3>
          <select name="role" className="user-info-edit-role" {...register("role")}>
            <option value="KhachHang">Khách Hàng</option>
            <option value="QuanTri">Quản Trị</option>
          </select>
        </div>
        {/* SUBMIT */}
        <button type="submit" className="user-info-edit-submit btn btn--primary">
          Chỉnh sửa
        </button>
      </form>
    </Modal>
  );
};

export default ModalEdit;
