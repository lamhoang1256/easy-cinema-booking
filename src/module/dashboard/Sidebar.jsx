import Button from "components/button/Button";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.div`
  min-width: 280px;
  max-width: 300px;
  background-color: #280f4c;
  min-height: 80vh;
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
  .sidebar-item {
    a {
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
    ion-icon {
      margin-right: 10px;
      font-size: 2rem;
    }
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <div className="sidebar">
        <Link to="/admin">
          <h2 className="sidebar-heading">Cineplex Admin</h2>
        </Link>
        <ul>
          <li className="sidebar-item">
            <NavLink end to="/admin">
              <ion-icon name="people-outline"></ion-icon>
              Trang tổng quan
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/admin/user-manage">
              <ion-icon name="people-outline"></ion-icon>
              Quản lí người dùng
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/admin/movie-manage">
              <ion-icon name="videocam-outline"></ion-icon>Quản lí phim
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/admin/cinema-manage">
              <ion-icon name="storefront-outline"></ion-icon>Quản lí rạp
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/admin/showtime-manage">
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
