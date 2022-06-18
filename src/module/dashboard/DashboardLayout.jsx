import Section from "components/section/Section";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  min-height: 100vh;
  display: flex;
  gap: 0 20px;
  main {
    flex: 1;
  }
`;

const DashboardLayout = () => {
  return (
    <StyledDashboardLayout>
      <Sidebar />
      <main>
        <Section>
          <Outlet />
        </Section>
      </main>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
