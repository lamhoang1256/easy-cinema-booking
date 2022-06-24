import Button from "components/button/Button";
import { path } from "constants/path";
import { logout } from "pages/Authentication/authentication.slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { TextGradient } from "assets/styles/mixin";

const StyledHeader = styled.header`
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
  }
  .header-logo h2 {
    text-align: center;
    font-size: 2.6rem;
    font-weight: 800;
    ${TextGradient.primary}
  }
  .navbar-list {
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  .navbar-link {
    font-size: 1.8rem;
    cursor: pointer;
    color: var(--white);
  }
  .navbar-link.active {
    color: var(--primary-color);
  }
  .header-auth {
    display: flex;
    gap: 10px;
  }
  .header-open,
  .header-close {
    display: none;
    font-size: 3rem;
  }
  .header-overplay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 80;
  }
  .sign-in {
    background-color: var(--primary-color);
  }
  .sign-up {
    background-color: var(--purple-color);
  }
  @media screen and (max-width: 1023.98px) {
    .header-open {
      display: flex;
    }
    .navbar-list {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 100;
      background-color: #280f4c;
      width: 300px;
      height: 100vh;
      color: var(--white);
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.3s linear;
    }
    .navbar-list.show {
      transform: translateX(0);
    }
  }
`;

const headerNav = [
  { id: 3, display: "Profile", path: path.profile },
  { id: 4, display: "History", path: path.history },
];

const Header = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const dispatch = useDispatch();
  const handleToggleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <StyledHeader>
      <div className="container">
        <div className="header-content">
          <Link to={path.home} className="header-logo">
            <h2>EasyBooking</h2>
          </Link>
          <ul className={`navbar-list ${isShowMenu ? "show" : null}`}>
            {headerNav.map((item) => (
              <li className="navbar-item" key={item.id}>
                <NavLink to={item.path} className="navbar-link">
                  {item.display}
                </NavLink>
              </li>
            ))}
            {currentUser?.role === "admin" ? (
              <li className="navbar-item" key={0}>
                <NavLink to={path.dashboard} className="navbar-link">
                  Dashboard
                </NavLink>
              </li>
            ) : null}
          </ul>
          <div className="header-auth">
            {currentUser?.email && (
              <Button kind="gradient" className="sign-in" onClick={handleLogout}>
                Logout
              </Button>
            )}
            {!currentUser?.email && (
              <Button kind="gradient" className="sign-in" to={path.signIn}>
                Sign In
              </Button>
            )}
          </div>
          <div className="header-open" onClick={handleToggleMenu}>
            <ion-icon name="list-outline"></ion-icon>
          </div>
        </div>
      </div>
      {/* overplay when open menu in table + mobile */}
      {isShowMenu && <div className="header-overplay" onClick={handleToggleMenu}></div>}
    </StyledHeader>
  );
};

export default Header;
