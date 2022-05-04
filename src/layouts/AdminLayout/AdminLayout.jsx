import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./adminLayout.scss";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth/login");
    }
  }, [userInfo]);

  return (
    <div className='admin-layout'>
      <Sidebar />
      <div className='admin-layout-main'>
        <div className='admin-layout-container'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
