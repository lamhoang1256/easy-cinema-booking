import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "components/button/Button";

const StyledSidebar = styled.div`
  width: 300px;
  background-color: #280f4c;
  min-height: 80vh;
  padding-top: 40px;
  flex-shrink: 0;
  transition: all 0.25s linear;
  .sidebar-logo {
    text-align: center;
    margin-bottom: 20px;
    font-size: 3rem;
    font-weight: 700;
  }
  .sidebar-heading {
    margin-bottom: 10px;
    font-size: 2.4rem;
    color: var(--primary-color);
    text-align: center;
  }
  .sidebar-container {
    padding: 20px;
  }
  .sidebar-item ion-icon {
    margin-right: 10px;
    font-size: 2rem;
  }
  .sidebar-link {
    margin: 10px 0;
    padding: 14px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    color: var(--white);
    &:hover {
      color: var(--white);
    }
    &.active {
      color: var(--white);
      background-color: #461d6a;
    }
  }
  @media screen and (max-width: 1023.98px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: #280f4c;
    transform: translateX(-100%);
    z-index: 100;
    ${(props) =>
      props.showSidebar === true &&
      css`
        transform: translateX(0);
      `}
  }
`;

const Sidebar = ({ ...props }) => {
  return (
    <StyledSidebar {...props}>
      <div className="sidebar">
        <Link to="/admin">
          <h2 className="sidebar-heading">Cineplex Admin</h2>
        </Link>
        <ul>
          <li className="sidebar-item">
            <NavLink end to="/admin" className="sidebar-link">
              <ion-icon name="people-outline"></ion-icon>
              Trang tổng quan
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/admin/user-manage" className="sidebar-link">
              <ion-icon name="people-outline"></ion-icon>
              Quản lí người dùng
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/admin/movie-manage" className="sidebar-link">
              <ion-icon name="videocam-outline"></ion-icon>Quản lí phim
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/admin/cinema-manage" className="sidebar-link">
              <ion-icon name="storefront-outline"></ion-icon>Quản lí rạp
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/admin/showtime-manage" className="sidebar-link">
              <ion-icon name="storefront-outline"></ion-icon>Quản lí lịch chiếu
            </NavLink>
          </li>
        </ul>
        <NavLink to="/">
          <Button>Về trang chủ</Button>
        </NavLink>
        <Button>Đăng xuất</Button>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
