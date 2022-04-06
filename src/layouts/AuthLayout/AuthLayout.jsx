import React from "react";
import { Outlet } from "react-router-dom";
import "./auth.scss";

export const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <Outlet />
    </div>
  );
};
