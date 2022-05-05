import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className='main-layout'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
