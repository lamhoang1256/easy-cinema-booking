import React from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "./userInfo.scss";
import { updateUserAction } from "redux/actions/user.action";

export const UserInfo = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { userInfo } = useSelector((state) => state.user);
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
    // console.log(dataToUpdateUser);
    dispatch(updateUserAction(dataToUpdateUser));
  };

  return (
    <div className='user-info'>
      <div
        className='new-detail-top'
        style={{
          backgroundImage: `url("${process.env.PUBLIC_URL}/assets/background-news.png"
          )`,
        }}
      >
        <div className='new-detail-heading'>
          <h2>Thông tin tài khoản</h2>
        </div>
      </div>
      {userInfo ? (
        <div className='user-info-wrapper'>
          <div className='container'>
            <div className='user-info-top'>
              <div className='user-info-avatar'>
                <img src={`${process.env.PUBLIC_URL}/assets/avatar/avatar-boss-baby.jpg`} alt='' />
              </div>
              <div className='user-info-name'>
                <h2>Nguyen Hoang Lam</h2>
                <p>lamhoang@gmail.com</p>
              </div>
            </div>
            <Tabs tabPosition={"left"}>
              <TabPane tab='Thông tin cơ bản' key='1'>
                {userInfo ? (
                  <div className='user-info-basic'>
                    <h2 className='user-info-title'>Thông tin cơ bản</h2>
                    <p className='line'>
                      <span className='label'>Tên tài khoản:</span> {userInfo.taiKhoan}
                    </p>
                    <p className='line'>
                      <span className='label'>Họ và tên:</span>
                      {userInfo.hoTen}
                    </p>
                    <p className='line'>
                      <span className='label'>Email:</span>
                      {userInfo.email}
                    </p>
                    <p className='line'>
                      <span className='label'>Số điện thoại:</span>
                      {userInfo.soDT}
                    </p>
                    <p className='line'>
                      <span className='label'>Quyền truy cập:</span>{" "}
                      {userInfo.maLoaiNguoiDung === "KhachHang" ? "Khách Hàng" : "Quản Trị"}
                    </p>
                  </div>
                ) : (
                  "Trống"
                )}
              </TabPane>
              {/* // "taiKhoan": "TramQuynh127", // "matKhau": "123456789", // "email":
            "TramQuynh127@gmail.com", // "soDt": "090481451", // "maNhom": "GP00", //
            "maLoaiNguoiDung": "QuanTri", // "hoTen": "Nguyễn Thị Quỳnh Trâm" */}
              <TabPane tab='Chỉnh sửa thông tin' key='2'>
                <h2 className='user-info-title'>Chỉnh sửa thông tin</h2>
                <form className='user-info-edit' onSubmit={handleSubmit(handleUpdateProfile)}>
                  {/* Tên tài khoản */}
                  <div className='user-info-edit-group'>
                    <h3>Tên tài khoản</h3>
                    <input
                      type='text'
                      defaultValue={userInfo.taiKhoan}
                      placeholder='Tên tài khoản'
                      {...register("username", { required: true, minLength: 6, maxLength: 15 })}
                    />
                    {errors.username && errors.username.type === "required" && (
                      <span className='text--primary'>Tên tài khoản không được để trống !</span>
                    )}
                    {errors.username && errors.username.type === "minLength" && (
                      <span className='text--primary'>Tên tài khoản ít nhất bao gồm 6 kí tự !</span>
                    )}
                    {errors.username && errors.username.type === "maxLength" && (
                      <span className='text--primary'>
                        Tên tài khoản nhiều nhất bao gồm 15 kí tự !
                      </span>
                    )}
                  </div>

                  {/* Họ và tên */}
                  <div className='user-info-edit-group'>
                    <h3>Họ và tên</h3>
                    <input
                      type='text'
                      placeholder='Họ và tên'
                      defaultValue={userInfo.hoTen}
                      {...register("fullname", { required: true, minLength: 6, maxLength: 28 })}
                    />
                    {errors.fullname && errors.fullname.type === "required" && (
                      <span className='text--primary'>Họ và tên không được để trống !</span>
                    )}
                    {errors.fullname && errors.fullname.type === "minLength" && (
                      <span className='text--primary'>Họ và tên ít nhất bao gồm 6 kí tự !</span>
                    )}
                    {errors.fullname && errors.fullname.type === "maxLength" && (
                      <span className='text--primary'>Họ và tên nhiều nhất bao gồm 28 kí tự !</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className='user-info-edit-group'>
                    <h3>Email</h3>
                    <input
                      type='email'
                      placeholder='Email'
                      defaultValue={userInfo.email}
                      {...register("email", { required: true, minLength: 6, maxLength: 28 })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className='text--primary'>Email không được để trống !</span>
                    )}
                    {errors.email && errors.email.type === "minLength" && (
                      <span className='text--primary'>Email ít nhất bao gồm 6 kí tự !</span>
                    )}
                    {errors.email && errors.email.type === "maxLength" && (
                      <span className='text--primary'>Email nhiều nhất bao gồm 28 kí tự !</span>
                    )}
                  </div>

                  {/* Số điện thoại */}
                  <div className='user-info-edit-group'>
                    <h3>Số điện thoại</h3>
                    <input
                      type='text'
                      placeholder='Số điện thoại'
                      defaultValue={userInfo.soDT}
                      {...register("phone", { required: true })}
                    />
                    {errors.phone && errors.phone.type === "required" && (
                      <span className='text--primary'>Số điện thoại không được để trống !</span>
                    )}
                  </div>

                  {/* Mật khẩu */}
                  <div className='user-info-edit-group'>
                    <h3>Mật khẩu</h3>
                    <input
                      type='password'
                      placeholder='Mật khẩu'
                      defaultValue={userInfo.matKhau}
                      {...register("password", { required: true, minLength: 6, maxLength: 15 })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span className='text--primary'>Mật khẩu không được để trống !</span>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                      <span className='text--primary'>Mật khẩu ít nhất bao gồm 6 kí tự !</span>
                    )}
                    {errors.password && errors.password.type === "maxLength" && (
                      <span className='text--primary'>Mật khẩu nhiều nhất bao gồm 15 kí tự !</span>
                    )}
                  </div>

                  {/* Xác nhận mật khẩu */}
                  <div className='user-info-edit-group'>
                    <h3>Xác nhận mật khẩu</h3>
                    <input
                      type='password'
                      placeholder='Xác nhận mật khẩu'
                      defaultValue={userInfo.matKhau}
                      {...register("password_repeat", {
                        required: true,
                        validate: (value) => {
                          if (watch("password") != value) {
                            return "Your passwords do no match";
                          }
                        },
                      })}
                    />
                    {errors.password_repeat && errors.password_repeat.type === "required" && (
                      <span className='text--primary'>Xác nhận mật khẩu không được để trống !</span>
                    )}
                    {errors.password_repeat && errors.password_repeat.type === "validate" && (
                      <span className='text--primary'>Xác nhận mật khẩu không trùng khớp !</span>
                    )}
                  </div>

                  {/* SUBMIT */}
                  <button type='submit' className='user-info-edit-submit btn btn--primary'>
                    Chỉnh sửa
                  </button>
                </form>
              </TabPane>
              <TabPane tab='Lịch sử đặt vé' key='3'>
                Lịch sử đặt vé
              </TabPane>
            </Tabs>
          </div>
        </div>
      ) : (
        "Trống"
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

// taiKhoan(pin):"TramQuynh127"
// hoTen(pin):"Lam Hoang Nguyen"
// email(pin):"TramQuynh127@gmail.com"
// soDT(pin):null
// maNhom(pin):"GP00"
// maLoaiNguoiDung(pin):"KhachHang"
// accessToken(pin):"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVHJhbVF1eW5oMTI3IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiVHJhbVF1eW5oMTI3QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJLaGFjaEhhbmciLCJUcmFtUXV5bmgxMjdAZ21haWwuY29tIiwiR1AwMCJdLCJuYmYiOjE2NDk0MTQ5MjUsImV4cCI6MTY0OTQxODUyNX0.SlmtTcHgjj88hOz-z6caZHMxsD6E3wRros-K-q3TlMg"
