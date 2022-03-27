import React from "react";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div>
      <h2>Admin Layout</h2>
      <Outlet />
    </div>
  );
};
