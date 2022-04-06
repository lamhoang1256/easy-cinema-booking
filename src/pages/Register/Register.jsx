import React from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className='auth register'>
      <div className='auth-container'>
        {/* <div className='auth-main'> */}
        <h2 className='auth-heading'>Đăng kí</h2>
        <form className='auth-content'>
          <div className='auth-box'>
            <div className='auth-group'>
              <ion-icon name='person-outline'></ion-icon>
              <input type='text' className='auth-input auth-username' placeholder='Họ và tên *' />
            </div>
            <div className='auth-group'>
              <ion-icon name='person-outline'></ion-icon>
              <input
                type='password'
                className='auth-input auth-password'
                placeholder='Tên tài khoản *'
              />
            </div>
          </div>

          <div className='auth-box'>
            <div className='auth-group'>
              <ion-icon name='mail-outline'></ion-icon>
              <input type='email' className='auth-input auth-password' placeholder='Email *' />
            </div>
            <div className='auth-group'>
              <ion-icon name='call-outline'></ion-icon>
              <input
                type='text'
                className='auth-input auth-password'
                placeholder='Số điện thoại *'
              />
            </div>
          </div>

          <div className='auth-box'>
            <div className='auth-group'>
              <ion-icon name='lock-closed-outline'></ion-icon>
              <input
                type='password'
                className='auth-input auth-password'
                placeholder='Mật khẩu *'
              />
            </div>
            <div className='auth-group'>
              <ion-icon name='lock-closed-outline'></ion-icon>
              <input
                type='password'
                className='auth-input auth-password'
                placeholder='Xác nhận mật khẩu *'
              />
            </div>
          </div>

          <button className='auth-submit btn btn--primary'>Đăng kí</button>
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
