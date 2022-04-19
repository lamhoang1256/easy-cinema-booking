import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupLogin } from "constants/schemaYupLogin";
// redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "redux/actions/user/user.action";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorLogin, userInfo } = useSelector((state) => state.user);
  const userLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupLogin) });

  // xử lí login user
  const handleLogin = (data) => {
    const requestLogin = { taiKhoan: data.username, matKhau: data.password };
    dispatch(loginUser(requestLogin));
  };

  useEffect(() => {
    if (userLocalStorage) {
      navigate("/");
    }
  }, [userLocalStorage]);

  return (
    <div className='auth login'>
      <div className='auth-container'>
        <div className='auth-main'>
          <h2 className='auth-heading'>Đăng nhập</h2>
          <form className='auth-content' onSubmit={handleSubmit(handleLogin)}>
            {/* tên tài khoản */}
            <div className='auth-group'>
              <ion-icon name='person-outline'></ion-icon>
              <input
                type='text'
                className='auth-input auth-username'
                placeholder='Tên tài khoản *'
                {...register("username")}
              />
            </div>
            {errors.username && <span className='text--primary'>{errors.username.message}</span>}

            {/* mật khẩu */}
            <div className='auth-group'>
              <ion-icon name='lock-closed-outline'></ion-icon>
              <input
                type='password'
                className='auth-input auth-password'
                placeholder='Mật khẩu *'
                {...register("password")}
              />
            </div>
            {errors.password && errors.password.type === "required" && (
              <span className='text--primary'>Mật khẩu không được để trống !</span>
            )}
            {errors.password && errors.password.type === "min" && (
              <span className='text--primary'>Mật khẩu ít nhất bao gồm 6 kí tự !</span>
            )}
            {errors.password && errors.password.type === "max" && (
              <span className='text--primary'>Mật khẩu nhiều nhất bao gồm 15 kí tự !</span>
            )}
            {errorLogin && <p className='text--primary'>{errorLogin.content}</p>}

            {/* nút submit */}
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
