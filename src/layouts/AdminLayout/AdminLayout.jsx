import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./adminLayout.scss";

export const AdminLayout = () => {
  return (
    <div className='admin-layout'>
      {/* <h2>Admin Layout</h2> */}
      <Sidebar />
      <div className='admin-layout-main'>
        <Outlet />
      </div>
    </div>
  );
};
