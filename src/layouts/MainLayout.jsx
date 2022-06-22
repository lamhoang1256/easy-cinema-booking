import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Footer from "components/layouts/Footer";
import Header from "components/layouts/Header";

const StyledMainLayout = styled.div`
  main {
    min-height: 100vh;
  }
`;

const MainLayout = () => {
  return (
    <StyledMainLayout>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </StyledMainLayout>
  );
};

export default MainLayout;
