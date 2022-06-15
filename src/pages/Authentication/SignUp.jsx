import { yupResolver } from "@hookform/resolvers/yup";
import Field from "components/field/Field";
import Heading from "components/heading/Heading";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { schemaYupSignUp } from "constants/auth.schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "redux/actions/user.action";
import styled from "styled-components";

const StyledButtonAuth = styled.button`
  position: relative;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  line-height: 2.4rem;
  font-weight: 600;
  margin: 7px 0;
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
    background-image: url("/images/auth-bg.png");
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1;
    }
  }
  .heading {
    margin-bottom: 10px;
    /* font-size: ; */
  }
  .auth-container {
    position: relative;
    max-width: 500px;
    padding: 50px 60px;
    background-color: var(--dark-color);
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
    border: 1px solid #8a3cff;
    background-image: var(--gradient-primary);
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
  .auth-facebook {
    color: var(--white);
    background-color: #404eed;
  }
  .auth-google {
    background-color: var(--white);
  }
  .already-account {
    padding-top: 20px;
    text-align: center;
    a {
      color: var(--blue-color);
    }
  }
  @media screen and (max-width: 767.98px) {
    .auth-container {
      max-width: 100%;
      padding: 40px 20px;
    }
  }
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupSignUp) });

  const handleSignUp = (data) => {
    const requestSignUp = {
      taiKhoan: data.username,
      matKhau: data.password,
      email: data.email,
      soDt: data.phone,
      maNhom: "GP00",
      hoTen: data.fullname,
    };
    dispatch(registerUser(requestSignUp));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(-1);
    }
  }, []);

  return (
    <StyledAuth>
      <div className="auth">
        <div className="auth-container">
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="auth-main">
              <h2 className="heading">Đăng ký tài khoản</h2>
              <Field>
                <Label htmlFor="username">Username</Label>
                <Input name="username" control={control} type="text" placeholder={"Username"} />
                <LabelError>{errors.username?.message}</LabelError>
              </Field>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input name="email" control={control} type="email" placeholder="Email" />
                <LabelError>{errors.email?.message}</LabelError>
              </Field>
              <Field>
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  control={control}
                  type="password"
                  placeholder={"Min 8 characters"}
                />
                <LabelError>{errors.password?.message}</LabelError>
              </Field>
              <Field>
                <Label htmlFor="repeatPassword">Re-password</Label>
                <Input
                  name="repeatPassword"
                  control={control}
                  type="password"
                  placeholder={"Min 8 characters"}
                />
                <LabelError>{errors.repeatPassword?.message}</LabelError>
              </Field>
              <StyledButtonAuth type="submit" className="auth-primary">
                {"Sign Up"}
              </StyledButtonAuth>
            </div>
          </form>
        </div>
      </div>
    </StyledAuth>
  );
};

export default SignUp;
