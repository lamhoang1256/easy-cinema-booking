import Section from "components/section/Section";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Button from "components/button/Button";
import { path } from "constants/path";

const menu = [
  {
    id: 0,
    display: <h2 className="sidebar-heading">EasyBooking Admin</h2>,
    path: path.home,
    icon: null,
  },
  {
    id: 1,
    display: "Dashboard",
    path: path.dashboard,
    icon: <ion-icon name="grid-outline"></ion-icon>,
  },
  {
    id: 2,
    display: "User Manage",
    path: path.userManage,
    icon: <ion-icon name="people-outline"></ion-icon>,
  },
  {
    id: 3,
    display: "Movie Manage",
    path: path.movieManage,
    icon: <ion-icon name="videocam-outline"></ion-icon>,
  },
  {
    id: 4,
    display: "Cinema Manage",
    path: path.complexesManage,
    icon: <ion-icon name="storefront-outline"></ion-icon>,
  },
  {
    id: 5,
    display: "Showtime Manage",
    path: path.showtimeManage,
    icon: <ion-icon name="calendar-outline"></ion-icon>,
  },
];

const StyledDashboardLayout = styled.div`
  min-height: 100vh;
  display: flex;
  gap: 0 20px;
  main {
    flex: 1;
  }
  .open {
    display: none;
    margin-top: 20px;
  }
  .overplay {
    display: none;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 70;
  }
  .overplay.show {
    display: block;
  }
  @media screen and (max-width: 1023.98px) {
    .open {
      display: block;
    }
  }
`;

const DashboardLayout = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const onToggleSidebar = () => {
    setIsShowSidebar(!isShowSidebar);
  };

  return (
    <StyledDashboardLayout>
      <Sidebar showSidebar={isShowSidebar} menu={menu} />
      <main>
        <Button className="open" kind="purple" onClick={onToggleSidebar}>
          Sidebar
        </Button>
        <Section>
          <Outlet />
        </Section>
      </main>
      <div className={`overplay ${isShowSidebar ? "show" : null}`} onClick={onToggleSidebar}></div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
