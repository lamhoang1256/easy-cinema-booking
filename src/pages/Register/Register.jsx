import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // xử lí register
  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <div className='auth register'>
      <div className='auth-container'>
        {/* <div className='auth-main'> */}
        <h2 className='auth-heading'>Đăng kí</h2>
        <form className='auth-content' onSubmit={handleSubmit(handleRegister)}>
          <div className='auth-wrapper'>
            <div className='auth-box'>
              {/* họ và tên */}
              <div className='auth-group'>
                <ion-icon name='person-outline'></ion-icon>
                <input
                  type='text'
                  className='auth-input auth-username'
                  placeholder='Họ và tên *'
                  {...register("fullname", { required: true })}
                />
              </div>
              {errors.fullname && errors.fullname.type === "required" && (
                <span className='text--primary'>Họ và tên không được để trống !</span>
              )}
              {errors.fullname && errors.fullname.type === "minLength" && (
                <span className='text--primary'>Họ và tên ít nhất bao gồm 6 kí tự !</span>
              )}
              {errors.fullname && errors.fullname.type === "maxLength" && (
                <span className='text--primary'>Họ và tên nhiều nhất bao gồm 28 kí tự !</span>
              )}

              {/* tên tài khoản */}
              <div className='auth-group'>
                <ion-icon name='person-outline'></ion-icon>
                <input
                  type='text'
                  className='auth-input auth-username'
                  placeholder='Tên tài khoản *'
                  {...register("username", { required: true })}
                />
              </div>
              {errors.username && errors.username.type === "required" && (
                <span className='text--primary'>Tên tài khoản không được để trống !</span>
              )}
              {errors.username && errors.username.type === "minLength" && (
                <span className='text--primary'>Tên tài khoản ít nhất bao gồm 6 kí tự !</span>
              )}
              {errors.username && errors.username.type === "maxLength" && (
                <span className='text--primary'>Tên tài khoản nhiều nhất bao gồm 15 kí tự !</span>
              )}
              {/* mật khẩu */}
              <div className='auth-group'>
                <ion-icon name='lock-closed-outline'></ion-icon>
                <input
                  // ref={password}
                  type='password'
                  className='auth-input auth-password'
                  placeholder='Mật khẩu *'
                  {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                />
              </div>
              {errors.password && errors.password.type === "required" && (
                <span className='text--primary'>Mật khẩu không được để trống !</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className='text--primary'>Mật khẩu ít nhất bao gồm 6 kí tự !</span>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <span className='text--primary'>Mật khẩu nhiều nhất bao gồm 28 kí tự !</span>
              )}
            </div>

            <div className='auth-box'>
              {/* số điện thoại */}
              <div className='auth-group'>
                <ion-icon name='call-outline'></ion-icon>
                <input
                  type='text'
                  className='auth-input auth-password'
                  placeholder='Số điện thoại *'
                  {...register("phone", { required: true })}
                />
              </div>
              {errors.phone && errors.phone.type === "required" && (
                <span className='text--primary'>Số điện thoại không được để trống !</span>
              )}

              {/* email */}
              <div className='auth-group'>
                <ion-icon name='mail-outline'></ion-icon>
                <input
                  type='email'
                  className='auth-input auth-email'
                  placeholder='Email *'
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && errors.email.type === "required" && (
                <span className='text--primary'>Email không được để trống !</span>
              )}
              {errors.email && errors.email.type === "minLength" && (
                <span className='text--primary'>Email ít nhất bao gồm 6 kí tự !</span>
              )}
              {errors.email && errors.email.type === "maxLength" && (
                <span className='text--primary'>Email nhiều nhất bao gồm 28 kí tự !</span>
              )}

              {/* xác nhận mật khẩu */}
              <div className='auth-group'>
                <ion-icon name='lock-closed-outline'></ion-icon>
                <input
                  type='password'
                  className='auth-input auth-password'
                  placeholder='Xác nhận mật khẩu *'
                  {...register("password_repeat", {
                    required: true,
                    validate: (value) => {
                      if (watch("password") != value) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
              </div>
              {errors.password_repeat && errors.password_repeat.type === "required" && (
                <span className='text--primary'>Xác nhận mật khẩu không được để trống !</span>
              )}
              {errors.password_repeat && errors.password_repeat.type === "validate" && (
                <span className='text--primary'>Xác nhận mật khẩu không trùng khớp !</span>
              )}
            </div>
          </div>

          <button className='auth-submit btn btn--primary' type='submit'>
            Đăng kí
          </button>

          <div className='auth-switch'>
            Bạn đã chưa có tài khoản ?{" "}
            <Link to='/auth/login' className='text--primary'>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
};
