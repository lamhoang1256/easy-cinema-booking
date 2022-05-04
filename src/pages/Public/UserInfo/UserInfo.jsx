import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUserAction, updateUserAction } from "redux/actions/user/user.action";
// validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupRegister } from "constants/schemaYupRegister";
// components
import { Banner } from "components/Banner/Banner";
import { MovieHistory } from "./components/MovieHistory";
import { LoadingAnimation } from "components/LoadingAnimation/LoadingAnimation";
import InputText from "components/InputText/InputText";
import MessageErrorValidation from "components/MessageErrorValidation/MessageErrorValidation";
import "./userInfo.scss";
const urlBanner = `url("${process.env.PUBLIC_URL}/assets/images/background-news.png"
)`;

export const UserInfo = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const { isLoading, userProfile } = useSelector((state) => state.user);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupRegister) });

  const handleUpdateProfile = (dataForm) => {
    const requestRegister = {
      taiKhoan: dataForm.username,
      matKhau: dataForm.password,
      email: dataForm.email,
      soDt: dataForm.phone,
      maNhom: "GP00",
      hoTen: dataForm.fullname,
      maLoaiNguoiDung: "KhachHang",
    };
    dispatch(updateUserAction(requestRegister));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getDetailUserAction());
  }, []);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      {!isLoading && (
        <div className='user-info'>
          <Banner urlBanner={urlBanner} heading={"Thông tin tài khoản"} />
          <div className='user-info-wrapper'>
            <div className='container'>
              <div className='user-info-top'>
                <div className='user-info-avatar'>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/avatar/avatar-boss-baby.jpg`}
                    alt='avatar'
                  />
                </div>
                <div className='user-info-name'>
                  <h2>{userProfile.hoTen}</h2>
                  <p>{userProfile.email}</p>
                </div>
              </div>
              <Tabs tabPosition={"left"}>
                <TabPane tab='Thông tin cơ bản' key='1'>
                  {userProfile ? (
                    <div className='user-info-basic'>
                      <h2 className='user-info-title'>Thông tin cơ bản</h2>
                      {UserProfileField("Tên tài khoản:", userProfile.taiKhoan)}
                      {UserProfileField("Họ và tên:", userProfile.hoTen)}
                      {UserProfileField("Email:", userProfile.email)}
                      {UserProfileField("Số điện thoại:", userProfile.soDT)}
                      {UserProfileField(
                        "Quyền truy cập",
                        userProfile.maLoaiNguoiDung === "QuanTri" ? "Quản Trị" : "Khách Hàng"
                      )}
                    </div>
                  ) : (
                    "Thông tin tài khoản hiện đang trống"
                  )}
                </TabPane>
                {/* TAB 2 - CHỈNH SỬA THÔNG TIN */}
                <TabPane tab='Chỉnh sửa thông tin' key='2'>
                  <h2 className='user-info-title'>Chỉnh sửa thông tin</h2>
                  <form className='user-info-edit' onSubmit={handleSubmit(handleUpdateProfile)}>
                    <div className='user-info-edit-group'>
                      <InputText
                        label='Tên tài khoản'
                        name='username'
                        control={control}
                        type='text'
                        defaultValue={userProfile.taiKhoan}
                        placeholder='Tên tài khoản'
                      />
                      <MessageErrorValidation errorMessage={errors.username?.message} />
                    </div>
                    <div className='user-info-edit-group'>
                      <InputText
                        label='Họ và tên'
                        name='fullname'
                        control={control}
                        type='text'
                        placeholder='Họ và tên'
                        defaultValue={userProfile.hoTen}
                      />
                      <MessageErrorValidation errorMessage={errors.fullname?.message} />
                    </div>
                    <div className='user-info-edit-group'>
                      <InputText
                        label='Email'
                        name='email'
                        control={control}
                        type='email'
                        placeholder='Email'
                        defaultValue={userProfile.email}
                      />
                      <MessageErrorValidation errorMessage={errors.email?.message} />
                    </div>
                    <div className='user-info-edit-group'>
                      <InputText
                        label='Số điện thoại'
                        name='phone'
                        control={control}
                        type='text'
                        placeholder='Số điện thoại'
                        defaultValue={userProfile.soDT}
                      />
                      <MessageErrorValidation errorMessage={errors.phone?.message} />
                    </div>
                    <div className='user-info-edit-group'>
                      <InputText
                        label='Mật khẩu'
                        name='password'
                        control={control}
                        type='password'
                        placeholder='Mật khẩu'
                        defaultValue={userProfile.matKhau}
                      />
                      <MessageErrorValidation errorMessage={errors.password?.message} />
                    </div>
                    <div className='user-info-edit-group'>
                      <InputText
                        label='Xác nhận mật khẩu'
                        name='password_repeat'
                        control={control}
                        type='password'
                        placeholder='Xác nhận mật khẩu'
                        defaultValue={userProfile.matKhau}
                      />
                      <MessageErrorValidation errorMessage={errors.password_repeat?.message} />
                    </div>
                    <button type='submit' className='user-info-edit-submit btn btn--primary'>
                      Chỉnh sửa
                    </button>
                  </form>
                </TabPane>
                {/* TAB 3 - LỊCH SỬ ĐẶT VÉ */}
                <TabPane tab='Lịch sử đặt vé' key='3'>
                  <div className='user-info-history'>
                    <h2 className='user-info-title'>Lịch sử đặt vé</h2>
                    <MovieHistory thongTinDatVe={userProfile.thongTinDatVe} />
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const UserProfileField = (label, info) => (
  <p className='line'>
    <span className='label'>{label}</span> {info}
  </p>
);

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
