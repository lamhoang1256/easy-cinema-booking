import Section from "components/section/Section";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Button from "components/button/Button";

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
      <Sidebar showSidebar={isShowSidebar} />
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
