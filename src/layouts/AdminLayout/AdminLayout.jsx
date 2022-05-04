import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./adminLayout.scss";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth/login");
    }
  }, [userInfo]);

  return (
    <>
      {userInfo && userInfo.maLoaiNguoiDung === "QuanTri" ? (
        <div className='admin-layout'>
          <Sidebar />
          <div className='admin-layout-main'>
            <div className='admin-layout-container'>
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <div className='page-error'>
          <div className='page-error-container'>
            <div className='page-error-gradient'>403</div>
            <h2 className='page-error-heading'>Không đủ quyền truy cập</h2>
            <div className='page-error-desc'>
              <p>Trang này chỉ dành riêng cho các quản trị viên</p>
              <p>Nếu muốn truy cập trang này, hãy thử lại với tài khoản có quyền Quản trị</p>
            </div>
            <Link to='/'>
              <button className='btn btn--primary'>Quay lại trang chủ</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
