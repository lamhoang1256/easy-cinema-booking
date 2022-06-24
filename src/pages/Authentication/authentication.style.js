import styled from "styled-components";

export const StyledButtonAuth = styled.button`
  position: relative;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  line-height: 2.4rem;
  font-weight: 600;
  margin: 7px 0;
  background-image: var(--gradient-primary);
  img {
    position: absolute;
    top: 50%;
    left: 10px;
    height: 30px;
    width: 30px;
    transform: translateY(-50%);
  }
`;

export const StyledAuth = styled.div`
  .auth {
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: var(--white);
    background-image: url("/images/auth-bg.png");
  }
  .auth::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
  .heading {
    margin-bottom: 10px;
    color: var(--white);
  }
  .auth-container {
    position: relative;
    max-width: 600px;
    padding: 40px 60px;
    background-color: var(--darker-color);
    border-radius: 10px;
    z-index: 2;
  }
  .auth-main {
    margin-top: 30px;
  }
  .auth-primary {
    color: var(--white);
    font-weight: 700;
    border-radius: 6px;
    border: 0;
    outline: 0;
    background-color: rgba(61, 180, 242);
  }
  .auth-other {
    margin: 7px 0;
    text-align: center;
  }
  .auth-other span {
    position: relative;
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      border: 1px solid #9692c7;
      width: 88px;
    }
    &::before {
      left: 30px;
    }
    &:after {
      right: 30px;
    }
  }
  .already-account {
    padding-top: 20px;
    text-align: center;
    color: var(--white);
    a {
      color: #3d6ef7;
    }
  }
  @media screen and (max-width: 767.98px) {
    .auth-container {
      max-width: 100%;
      padding: 40px 20px;
    }
  }
  .already-account a {
    color: #3d6ef7;
  }
`;
