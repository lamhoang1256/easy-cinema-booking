import styled from "styled-components";
import Button from "components/button/Button";
import { path } from "constants/path";

const StyledNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  min-height: 100vh;
  background-color: var(--black);
  gap: 12px;
  .heading {
    font-size: 8rem;
    line-height: 1;
    font-weight: 800;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(270deg, #c042ff, #8a3cff);
  }
  .title {
    color: #f6eafb;
    font-size: 2.8rem;
    font-weight: 600;
  }
  .description {
    font-weight: 500;
    font-size: 2.2rem;
    color: #b48eca;
  }
  @media screen and (max-width: 767.98px) {
    padding: 20px;
    .title {
      font-size: 2.4rem;
    }
    .description {
      font-size: 2rem;
    }
  }
`;

const NotFound = () => {
  return (
    <StyledNotFound>
      <h1 className="heading">404</h1>
      <h2 className="title">Something is not right</h2>
      <p className="description">We can not find the page you are looking for.</p>
      <Button kind="primary" height="40" to={path.home}>
        Go Home
      </Button>
    </StyledNotFound>
  );
};

export default NotFound;
