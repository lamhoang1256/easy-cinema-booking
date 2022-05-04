import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./auth.scss";

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <Outlet />
      <Link to='/' className='auth-backhome'>
        <ion-icon name='home'></ion-icon>
      </Link>
    </div>
  );
};

export default AuthLayout;
