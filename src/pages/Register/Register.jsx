import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupRegister } from "constants/schemaYupRegister";
// redux
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "redux/actions/user/user.action";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorRegister, userInfo } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupRegister) });

  // xử lí register user
  const handleRegister = (data) => {
    const requestRegister = {
      taiKhoan: data.username,
      matKhau: data.password,
      email: data.email,
      soDt: data.phone,
      maNhom: "GP00",
      hoTen: data.fullname,
    };
    dispatch(registerUser(requestRegister));
  };

  useEffect(() => {
    //nếu đã đăng nhập thì chuyển về trang trước đó
    if (userInfo) {
      navigate(-1);
    }
  }, [userInfo]);

  return (
    <div className='auth register'>
      <div className='auth-container'>
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
                  {...register("fullname")}
                />
              </div>
              {errors.fullname && <span className='text--primary'>{errors.fullname.message}</span>}

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
              {errors.password && <span className='text--primary'>{errors.password.message}</span>}
            </div>

            <div className='auth-box'>
              {/* số điện thoại */}
              <div className='auth-group'>
                <ion-icon name='call-outline'></ion-icon>
                <input
                  type='text'
                  className='auth-input auth-password'
                  placeholder='Số điện thoại *'
                  {...register("phone")}
                />
              </div>
              {errors.phone && <span className='text--primary'>{errors.phone.message}</span>}
              {/* email */}
              <div className='auth-group'>
                <ion-icon name='mail-outline'></ion-icon>
                <input
                  type='email'
                  className='auth-input auth-email'
                  placeholder='Email *'
                  {...register("email")}
                />
              </div>
              {errors.email && <span className='text--primary'>{errors.email.message}</span>}
              {/* xác nhận mật khẩu */}
              <div className='auth-group'>
                <ion-icon name='lock-closed-outline'></ion-icon>
                <input
                  type='password'
                  className='auth-input auth-password'
                  placeholder='Xác nhận mật khẩu *'
                  {...register("password_repeat")}
                />
              </div>
              {errors.password_repeat && (
                <span className='text--primary'>{errors.password_repeat.message}</span>
              )}
            </div>
          </div>

          {errorRegister && <p className='text--primary text-center'>{errorRegister.content}</p>}
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
    </div>
  );
};
