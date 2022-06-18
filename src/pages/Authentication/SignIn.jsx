import { yupResolver } from "@hookform/resolvers/yup";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { schemaYupSignIn } from "constants/auth.schema";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledAuth, StyledButtonAuth } from "./authentication.style";
import { signIn } from "./authentication.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import LocalStorage from "constants/localStorage";
import { useEffect } from "react";
import { path } from "constants/path";

const StyledSignIn = styled.div``;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem(LocalStorage.currentUser));
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupSignIn) });

  const handleSignIn = async (user) => {
    try {
      const signInResult = await dispatch(signIn(user));
      unwrapResult(signInResult);
      toast.success("Sign In Success");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (currentUser?.email) navigate(path.home);
  }, [currentUser]);

  return (
    <StyledSignIn>
      <StyledAuth>
        <div className="auth">
          <div className="auth-container">
            <form onSubmit={handleSubmit(handleSignIn)}>
              <h2 className="heading">Welcome to website</h2>
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
                Do not have an account? <Link to={path.signUp}>Sign Up Here</Link>
              </div>
            </form>
          </div>
        </div>
      </StyledAuth>
    </StyledSignIn>
  );
};

export default SignIn;
