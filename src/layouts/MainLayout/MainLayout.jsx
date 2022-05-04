import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

const MainLayout = () => {
  return (
    <div>
      <Header></Header>
      <div className='main-layout'>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
