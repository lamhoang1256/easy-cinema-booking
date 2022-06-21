import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";

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
