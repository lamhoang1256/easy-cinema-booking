import ErrorPage from "components/ErrorPage/ErrorPage";
import Sidebar from "components/Sidebar/Sidebar";
import { useMediaQuery } from "hooks/useMediaQuery";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const isDesktop = useMediaQuery("(min-width:1400px)");

  return (
    <>
      {!isDesktop && (
        <ErrorPage code="Error" heading="Trang này hiện chưa hỗ trợ mobile, tablet">
          <p>Vui lòng đăng nhập ở thiết bị có màn hình lớn hơn 1400px</p>
        </ErrorPage>
      )}
      {isDesktop && (
        <div className="admin-layout">
          <Sidebar />
          <div className="admin-layout-main">
            <div className="admin-layout-container">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
