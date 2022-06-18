import { yupResolver } from "@hookform/resolvers/yup";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { schemaYupSignUp } from "constants/auth.schema";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { StyledAuth, StyledButtonAuth } from "./authentication.style";
import { signUp } from "./authentication.slice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import LocalStorage from "constants/localStorage";
import { useEffect } from "react";
import { path } from "constants/path";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem(LocalStorage.currentUser));
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaYupSignUp) });

  const handleSignUp = async (values) => {
    try {
      const signUpResult = await dispatch(signUp(values));
      unwrapResult(signUpResult);
      toast.success("Sign Up Success");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (currentUser?.email) navigate(path.home);
  }, [currentUser]);

  return (
    <StyledAuth>
      <div className="auth">
        <div className="auth-container">
          <form onSubmit={handleSubmit(handleSignUp)}>
            <h2 className="heading">Sign Up Account</h2>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input name="email" control={control} type="email" placeholder="Email" />
              <LabelError>{errors.email?.message}</LabelError>
            </Field>
            <div className="form-layout">
              <Field>
                <Label htmlFor="firstName">First Name</Label>
                <Input name="firstName" control={control} type="text" placeholder={"First Name"} />
                <LabelError>{errors.firstName?.message}</LabelError>
              </Field>
              <Field>
                <Label htmlFor="lastName">Last Name</Label>
                <Input name="lastName" control={control} type="text" placeholder={"Last Name"} />
                <LabelError>{errors.lastName?.message}</LabelError>
              </Field>
            </div>
            <div className="form-layout">
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
            </div>
            <div className="form-layout">
              <Field>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  name="phoneNumber"
                  control={control}
                  type="phone"
                  placeholder={"Phone Number"}
                />
                <LabelError>{errors.phoneNumber?.message}</LabelError>
              </Field>
              <Field>
                <Label htmlFor="repeatPassword">Date Of Birth</Label>
                <Input name="dateOfBirth" control={control} type="date" />
                <LabelError>{errors.dateOfBirth?.message}</LabelError>
              </Field>
            </div>
            <StyledButtonAuth type="submit" className="auth-primary">
              {"Sign Up"}
            </StyledButtonAuth>
            <div className="already-account">
              Have an account? <Link to={path.signIn}>Sign In Here</Link>
            </div>
          </form>
        </div>
      </div>
    </StyledAuth>
  );
};

export default SignUp;
