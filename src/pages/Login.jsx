import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupLogin } from "constants/schemaYupLogin";
// redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "redux/actions/user.action";
// components
import InputText from "components/InputText/InputText";
import ErrorValidation from "components/Message/ErrorValidation";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorLogin, userInfo } = useSelector((state) => state.user);
  const userLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupLogin) });

  const handleLogin = (data) => {
    const requestLogin = { taiKhoan: data.username, matKhau: data.password };
    dispatch(loginUser(requestLogin));
  };
  useEffect(() => {
    // if login successful will redirect previous page
    if (userLocalStorage) {
      navigate(-1);
    }
  }, [userLocalStorage]);

  return (
    <div className='auth login'>
      <div className='auth-container'>
        <div className='auth-main'>
          <h2 className='auth-heading'>Đăng nhập</h2>
          <form className='auth-content' onSubmit={handleSubmit(handleLogin)}>
            <div className='auth-group'>
              <ion-icon name='person-outline'></ion-icon>
              <InputText
                name='username'
                type='text'
                placeholder='Tên tài khoản *'
                control={control}
              />
            </div>
            <ErrorValidation errorMessage={errors.username?.message} />

            <div className='auth-group'>
              <ion-icon name='lock-closed-outline'></ion-icon>
              <InputText
                name='password'
                type='password'
                placeholder='Mật khẩu *'
                control={control}
              />
            </div>
            <ErrorValidation errorMessage={errors.password?.message} />
            {/* log error form API */}
            <ErrorValidation errorMessage={errorLogin?.content} />
            <button className='auth-submit btn btn--primary' type='submit'>
              Đăng nhập
            </button>
            {!userInfo && (
              <div className='auth-switch'>
                Bạn đã chưa có tài khoản ?{" "}
                <Link to='/auth/register' className='text--primary'>
                  Đăng kí
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
