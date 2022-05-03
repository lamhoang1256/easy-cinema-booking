import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./adminLayout.scss";

export const AdminLayout = () => {
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
