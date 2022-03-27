import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

export const MainLayout = () => {
  return (
    <div>
      <Header></Header>
      <div className='mainLayout'>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};
