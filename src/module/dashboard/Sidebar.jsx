import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "components/button/Button";
import { useDispatch } from "react-redux";
import { logout } from "pages/Authentication/authentication.slice";

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
  .action button {
    width: 100%;
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

const Sidebar = ({ menu, ...props }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <StyledSidebar {...props}>
      <div className="sidebar">
        <ul>
          {menu?.map((item) => (
            <li className="sidebar-item" key={item.id}>
              <NavLink end to={item.path} className="sidebar-link">
                {item.icon}
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="action">
          <Button kind="gradient" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
