import React, { useEffect } from "react";
import { useMediaQuery } from "hooks/useMediaQuery";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./adminLayout.scss";
import ErrorPage from "components/ErrorPage/ErrorPage";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isDesktop = useMediaQuery("(min-width:1400px)");

  useEffect(() => {
    if (!userInfo) {
      navigate("/auth/login");
    }
  }, [userInfo]);

  return (
    <>
      {userInfo && userInfo.maLoaiNguoiDung === "QuanTri" ? (
        <>
          {!isDesktop && (
            <ErrorPage code='Error' heading='Trang này hiện chưa hỗ trợ mobile, tablet'>
              <p>Vui lòng đăng nhập ở thiết bị có màn hình lớn hơn 1400px</p>
            </ErrorPage>
          )}
          {isDesktop && (
            <div className='admin-layout'>
              <Sidebar />
              <div className='admin-layout-main'>
                <div className='admin-layout-container'>
                  <Outlet />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <ErrorPage code='403' heading='Không đủ quyền truy cập'>
          <p>Trang này chỉ dành riêng cho các quản trị viên</p>
          <p>Nếu muốn truy cập trang này, hãy thử lại với tài khoản có quyền Quản trị</p>
        </ErrorPage>
      )}
    </>
  );
};

export default AdminLayout;
