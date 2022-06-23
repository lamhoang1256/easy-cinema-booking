import { useState } from "react";
import styled from "styled-components";
import { scroller } from "react-scroll";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { path } from "constants/path";
import Button from "components/button/Button";

const StyledHeader = styled.header`
  margin-bottom: 40px;
  .header-content {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .navbar-list {
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .navbar-link {
    font-size: 1.8rem;
    cursor: pointer;
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
    .sign-in,
    .sign-up {
      padding: 0px 10px;
      height: 36px;
      font-size: 1.4rem;
    }
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
  { display: "Lịch chiếu", path: "showtimes" },
  { display: "Tin tức", path: "article" },
  { display: "Cụm rạp", path: "/" },
  { display: "Ứng dụng", path: "/" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // handle when click link on header navbar
  const onClickLink = async (id) => {
    if (location.pathname === "/") {
      scroller.scrollTo(id, {
        duration: 800,
        smooth: "easeInOutQuart",
      });
    } else {
      await navigate(path.home);
      setTimeout(() => {
        scroller.scrollTo(id, {
          duration: 800,
          smooth: "easeInOutQuart",
        });
      }, 600);
    }
  };

  const [isShowMenu, setIsShowMenu] = useState(false);
  const handleToggleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  return (
    <StyledHeader>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <img src={`assets/images/chore/logo-star-cineplex.png`} alt="logo" />
          </Link>
          <ul className={`navbar-list ${isShowMenu ? "show" : null}`}>
            {headerNav.map((item, index) => (
              <li className="navbar-item" key={index}>
                <span className="navbar-link" onClick={() => onClickLink(item.path)}>
                  {item.display}
                </span>
              </li>
            ))}
          </ul>
          <div className="header-auth">
            <Button className="sign-up" to={path.signUp}>
              Đăng ký
            </Button>
            <Button className="sign-in" to={path.signIn}>
              Đăng nhập
            </Button>
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
