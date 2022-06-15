import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "redux/actions/user.action";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupRegister } from "constants/schemaYupRegister";
import InputText from "components/InputText/InputText";
import ErrorValidation from "components/Message/ErrorValidation";
import Heading from "components/heading/Heading";
import Button from "components/button/Button";

const StyledProfileEdit = styled.div`
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 40px;
  }
  .form-group {
    width: 300px;
    input {
      width: 100%;
      padding: 15px 20px;
      border-radius: 10px;
      background-color: #f2f3f5;
      border: none;
      outline: none;
      font-size: 1.8rem;
    }
  }
`;

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupRegister) });

  const handleUpdateProfile = ({ username, password, email, phone, fullname }) => {
    const requestRegister = {
      taiKhoan: username,
      matKhau: password,
      email: email,
      soDt: phone,
      maNhom: "GP00",
      hoTen: fullname,
      maLoaiNguoiDung: "KhachHang",
    };
    dispatch(updateUserAction(requestRegister));
  };

  return (
    <StyledProfileEdit>
      <Heading>Chỉnh sửa thông tin</Heading>
      <form className="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="form-group">
          <InputText
            label="Tên tài khoản"
            name="username"
            control={control}
            type="text"
            defaultValue={userProfile.taiKhoan}
            placeholder="Tên tài khoản"
          />
          <ErrorValidation errorMessage={errors.username?.message} />
        </div>
        <div className="form-group">
          <InputText
            label="Họ và tên"
            name="fullname"
            control={control}
            type="text"
            placeholder="Họ và tên"
            defaultValue={userProfile.hoTen}
          />
          <ErrorValidation errorMessage={errors.fullname?.message} />
        </div>
        <div className="form-group">
          <InputText
            label="Email"
            name="email"
            control={control}
            type="email"
            placeholder="Email"
            defaultValue={userProfile.email}
          />
          <ErrorValidation errorMessage={errors.email?.message} />
        </div>
        <div className="form-group">
          <InputText
            label="Số điện thoại"
            name="phone"
            control={control}
            type="text"
            placeholder="Số điện thoại"
            defaultValue={userProfile.soDT}
          />
          <ErrorValidation errorMessage={errors.phone?.message} />
        </div>
        <div className="form-group">
          <InputText
            label="Mật khẩu"
            name="password"
            control={control}
            type="password"
            placeholder="Mật khẩu"
            defaultValue={userProfile.matKhau}
          />
          <ErrorValidation errorMessage={errors.password?.message} />
        </div>
        <div className="form-group">
          <InputText
            label="Xác nhận mật khẩu"
            name="password_repeat"
            control={control}
            type="password"
            placeholder="Xác nhận mật khẩu"
            defaultValue={userProfile.matKhau}
          />
          <ErrorValidation errorMessage={errors.password_repeat?.message} />
        </div>
        <Button type="submit">Chỉnh sửa</Button>
      </form>
    </StyledProfileEdit>
  );
};

export default ProfileEdit;
