import { Outlet } from "react-router-dom";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";

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
