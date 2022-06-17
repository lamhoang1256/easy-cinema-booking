import { Tabs } from "antd";
import { useEffect } from "react";
import styled from "styled-components";
const urlBanner = `url("/assets/images/background/news.png")`;

const StyledProfile = styled.div`
  .profile-header {
    transform: translateY(-20%);
    margin-bottom: -20px;
    gap: 0 40px;
    display: flex;
    align-items: center;
  }
  .profile-avatar {
    overflow: hidden;
    border: 3px solid #fff;
    border-radius: 100rem;
    width: 200px;
    height: 200px;
  }
  // style css tab antd
  .ant-tabs-top > .ant-tabs-nav .ant-tabs-tab {
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
  }
  .ant-tabs-top .ant-tabs-tab .ant-tabs-tab-btn {
    padding: 10px 20px;
    border-radius: 4px;
    min-width: 180px;
    color: var(--white);
  }
  .ant-tabs-top .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    background-image: var(--gradient-primary);
  }
  @media screen and (max-width: 1023.98px) {
    .ant-tabs-top .ant-tabs {
      flex-direction: column;
    }
    .ant-tabs-top > div > .ant-tabs-content-holder {
      margin-top: 30px;
    }
  }
  @media screen and (max-width: 767.98px) {
    .profile-top {
      flex-direction: column;
    }
    .profile-avatar {
      width: 160px;
      height: 160px;
    }
  }
`;

const Profile = () => {
  const { TabPane } = Tabs;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>Profile</>;
};

export default Profile;

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
