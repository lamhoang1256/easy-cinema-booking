import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className='auth login'>
      <div className='auth-container'>
        <div className='auth-main'>
          <h2 className='auth-heading'>Đăng nhập</h2>
          <form className='auth-content'>
            <div className='auth-group'>
              <ion-icon name='person-outline'></ion-icon>
              <input
                type='text'
                className='auth-input auth-username'
                placeholder='Tên tài khoản *'
              />
            </div>
            <div className='auth-group'>
              <ion-icon name='lock-closed-outline'></ion-icon>
              <input
                type='password'
                className='auth-input auth-password'
                placeholder='Mật khẩu *'
              />
            </div>
            <button className='auth-submit btn btn--primary'>Đăng nhập</button>
            <div className='auth-switch'>
              Bạn đã chưa có tài khoản ?{" "}
              <Link to='/auth/register' className='text--primary'>
                Đăng kí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
