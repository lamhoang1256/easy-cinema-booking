import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUserAction, updateUserAction } from "redux/actions/user.action";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupRegister } from "constants/schemaYupRegister";
// components
import { MovieHistory } from "./components/MovieHistory";
import { LoadingAnimation } from "components/LoadingAnimation/LoadingAnimation";
import "./userInfo.scss";
// đường dẫn ảnh banner
const urlBanner = `url("${process.env.PUBLIC_URL}/assets/images/background-news.png"
)`;

export const UserInfo = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupRegister) });

  const handleUpdateProfile = (data) => {
    const dataToUpdateUser = {
      taiKhoan: data.username,
      matKhau: data.password,
      email: data.email,
      soDt: data.phone,
      maNhom: "GP00",
      hoTen: data.fullname,
      maLoaiNguoiDung: "KhachHang",
    };
    dispatch(updateUserAction(dataToUpdateUser));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getDetailUserAction());
  }, []);

  return (
    <div className='user-info'>
      {userDetail ? (
        <>
          <div
            className='new-detail-top'
            style={{
              backgroundImage: urlBanner,
            }}
          >
            <div className='new-detail-heading'>
              <h2>Thông tin tài khoản</h2>
            </div>
          </div>
          <div className='user-info-wrapper'>
            <div className='container'>
              <div className='user-info-top'>
                <div className='user-info-avatar'>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/avatar/avatar-boss-baby.jpg`}
                    alt=''
                  />
                </div>
                <div className='user-info-name'>
                  <h2>Nguyen Hoang Lam</h2>
                  <p>lamhoang@gmail.com</p>
                </div>
              </div>
              <Tabs tabPosition={"left"}>
                <TabPane tab='Thông tin cơ bản' key='1'>
                  {userDetail ? (
                    <div className='user-info-basic'>
                      <h2 className='user-info-title'>Thông tin cơ bản</h2>
                      <p className='line'>
                        <span className='label'>Tên tài khoản:</span> {userDetail.taiKhoan}
                      </p>
                      <p className='line'>
                        <span className='label'>Họ và tên:</span>
                        {userDetail.hoTen}
                      </p>
                      <p className='line'>
                        <span className='label'>Email:</span>
                        {userDetail.email}
                      </p>
                      <p className='line'>
                        <span className='label'>Số điện thoại:</span>
                        {userDetail.soDT}
                      </p>
                      <p className='line'>
                        <span className='label'>Quyền truy cập:</span>{" "}
                        {userDetail.maLoaiNguoiDung === "KhachHang" ? "Khách Hàng" : "Quản Trị"}
                      </p>
                    </div>
                  ) : (
                    "Trống"
                  )}
                </TabPane>

                <TabPane tab='Chỉnh sửa thông tin' key='2'>
                  <h2 className='user-info-title'>Chỉnh sửa thông tin</h2>
                  <form className='user-info-edit' onSubmit={handleSubmit(handleUpdateProfile)}>
                    {/* Tên tài khoản */}
                    <div className='user-info-edit-group'>
                      <h3>Tên tài khoản</h3>
                      <input
                        type='text'
                        defaultValue={userDetail.taiKhoan}
                        placeholder='Tên tài khoản'
                        {...register("username")}
                      />
                      {errors.username && (
                        <span className='text--primary'>{errors.username.message}</span>
                      )}
                    </div>

                    {/* Họ và tên */}
                    <div className='user-info-edit-group'>
                      <h3>Họ và tên</h3>
                      <input
                        type='text'
                        placeholder='Họ và tên'
                        defaultValue={userDetail.hoTen}
                        {...register("fullname")}
                      />
                      {errors.fullname && (
                        <span className='text--primary'>{errors.fullname.message}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className='user-info-edit-group'>
                      <h3>Email</h3>
                      <input
                        type='email'
                        placeholder='Email'
                        defaultValue={userDetail.email}
                        {...register("email")}
                      />
                      {errors.email && (
                        <span className='text--primary'>{errors.email.message}</span>
                      )}
                    </div>

                    {/* Số điện thoại */}
                    <div className='user-info-edit-group'>
                      <h3>Số điện thoại</h3>
                      <input
                        type='text'
                        placeholder='Số điện thoại'
                        defaultValue={userDetail.soDT}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <span className='text--primary'>{errors.phone.message}</span>
                      )}
                    </div>

                    {/* Mật khẩu */}
                    <div className='user-info-edit-group'>
                      <h3>Mật khẩu</h3>
                      <input
                        type='password'
                        placeholder='Mật khẩu'
                        defaultValue={userDetail.matKhau}
                        {...register("password")}
                      />
                      {errors.password && (
                        <span className='text--primary'>{errors.password.message}</span>
                      )}
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div className='user-info-edit-group'>
                      <h3>Xác nhận mật khẩu</h3>
                      <input
                        type='password'
                        placeholder='Xác nhận mật khẩu'
                        defaultValue={userDetail.matKhau}
                        {...register("password_repeat")}
                      />
                      {errors.password_repeat && (
                        <span className='text--primary'>{errors.password_repeat.message}</span>
                      )}
                    </div>

                    {/* SUBMIT */}
                    <button type='submit' className='user-info-edit-submit btn btn--primary'>
                      Chỉnh sửa
                    </button>
                  </form>
                </TabPane>

                <TabPane tab='Lịch sử đặt vé' key='3'>
                  <div className='user-info-history'>
                    <h2 className='user-info-title'>Lịch sử đặt vé</h2>
                    <MovieHistory thongTinDatVe={userDetail.thongTinDatVe} />
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};

// "taiKhoan": "TramQuynh127",
// "matKhau": "123456789",
// "email": "TramQuynh127@gmail.com",
// "soDt": "090481451",
// "maNhom": "GP00",
// "maLoaiNguoiDung": "QuanTri",
// "hoTen": "Nguyễn Thị Quỳnh Trâm"

// taiKhoan:"TramQuynh127"
// hoTen :"Lam Hoang Nguyen"
// email :"TramQuynh127@gmail.com"
// soDT :null
// maNhom :"GP00"
// maLoaiNguoiDung :"KhachHang"
// accessToken :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVHJhbVF1eW5oMTI3IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiVHJhbVF1eW5oMTI3QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJLaGFjaEhhbmciLCJUcmFtUXV5bmgxMjdAZ21haWwuY29tIiwiR1AwMCJdLCJuYmYiOjE2NDk0MTQ5MjUsImV4cCI6MTY0OTQxODUyNX0.SlmtTcHgjj88hOz-z6caZHMxsD6E3wRros-K-q3TlMg"
