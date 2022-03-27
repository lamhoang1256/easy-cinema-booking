import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div>
      <h2>Auth Layout</h2>
      <Outlet />
    </div>
  );
};
