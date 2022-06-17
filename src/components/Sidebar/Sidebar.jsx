import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutAction } from "redux/actions/user.action";
import "./sidebar.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
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
          <button className="btn btn--success sidebar-btn">Về trang chủ</button>
        </NavLink>
        <button className="btn btn--info sidebar-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
