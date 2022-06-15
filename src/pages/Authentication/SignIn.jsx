import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaYupSignIn } from "constants/auth.schema";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "redux/actions/user.action";
import Field from "components/field/Field";
import Label from "components/label/Label";
import Input from "components/input/Input";
import LabelError from "components/label/LabelError";
import { StyledAuth, StyledButtonAuth } from "./authentication";

const StyledSignIn = styled.div``;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const userLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupSignIn) });

  const handleSignIn = (data) => {
    const requestSignIn = { taiKhoan: data.username, matKhau: data.password };
    dispatch(loginUser(requestSignIn));
  };
  useEffect(() => {
    // if login successful will redirect previous page
    if (userLocalStorage) {
      navigate(-1);
    }
  }, [userLocalStorage]);

  return (
    <StyledSignIn>
      <StyledAuth>
        <div className="auth">
          <div className="auth-container">
            <form onSubmit={handleSubmit(handleSignIn)}>
              <h2>Welcome to website</h2>
              <span className="auth-label">SignIn to continue</span>
              <div className="auth-main">
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" type="text" placeholder="Email" control={control} />
                  <LabelError>{errors.email?.message}</LabelError>
                </Field>
                <Field>
                  <Label htmlFor="password">Password</Label>
                  <Input name="password" type="password" placeholder="Password" control={control} />
                  <LabelError>{errors.password?.message}</LabelError>
                </Field>
                <StyledButtonAuth type="submit" className="auth-primary">
                  Sign In
                </StyledButtonAuth>
              </div>
              <div className="already-account">
                Do not have an account? <Link to="/sign-up">Sign Up Here</Link>
              </div>
            </form>
          </div>
        </div>
      </StyledAuth>
    </StyledSignIn>
  );
};

export default SignIn;
