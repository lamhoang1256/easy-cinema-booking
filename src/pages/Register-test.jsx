import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupRegister } from "constants/schemaYupRegister";
// components
import InputText from "components/temp/InputText";
import ErrorValidation from "components/Message/ErrorValidation";

const Register = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupRegister) });

  const handleRegister = (data) => {
    const requestRegister = {
      taiKhoan: data.username,
      matKhau: data.password,
      email: data.email,
      soDt: data.phone,
      maNhom: "GP00",
      hoTen: data.fullname,
    };
  };

  return (
    <div className="auth register">
      <div className="auth-container">
        <h2 className="auth-heading">Đăng kí</h2>
        <form className="auth-content" onSubmit={handleSubmit(handleRegister)}>
          <div className="auth-wrapper">
            <div className="auth-box">
              <div className="auth-group">
                <ion-icon name="person-outline"></ion-icon>
                <InputText
                  type="text"
                  control={control}
                  placeholder="Họ và tên *"
                  name="fullname"
                />
              </div>
              <ErrorValidation errorMessage={errors.fullname?.message} />
              <div className="auth-group">
                <ion-icon name="person-outline"></ion-icon>
                <InputText
                  type="text"
                  control={control}
                  placeholder="Tên tài khoản *"
                  name="username"
                />
              </div>
              <ErrorValidation errorMessage={errors.username?.message} />
              <div className="auth-group">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <InputText
                  type="password"
                  control={control}
                  placeholder="Mật khẩu *"
                  name="password"
                />
              </div>
              <ErrorValidation errorMessage={errors.password?.message} />
            </div>

            <div className="auth-box">
              <div className="auth-group">
                <ion-icon name="call-outline"></ion-icon>
                <InputText
                  type="text"
                  control={control}
                  placeholder="Số điện thoại *"
                  name="phone"
                />
              </div>
              <ErrorValidation errorMessage={errors.phone?.message} />
              <div className="auth-group">
                <ion-icon name="mail-outline"></ion-icon>
                <InputText type="email" control={control} placeholder="Email *" name="email" />
              </div>
              <ErrorValidation errorMessage={errors.email?.message} />
              <div className="auth-group">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <InputText
                  type="password"
                  control={control}
                  placeholder="Xác nhận mật khẩu *"
                  name="password_repeat"
                />
              </div>
              <ErrorValidation errorMessage={errors.password_repeat?.message} />
            </div>
          </div>
          {/* Log error messenge when register form API */}

          <button className="auth-submit btn btn--primary" type="submit">
            Đăng kí
          </button>
          <div className="auth-switch">
            Bạn đã chưa có tài khoản ?{" "}
            <Link to="/auth/login" className="text--primary">
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
