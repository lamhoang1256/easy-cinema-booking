import { yupResolver } from "@hookform/resolvers/yup";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { schemaYupSignUp } from "constants/auth.schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { StyledAuth, StyledButtonAuth } from "./authentication";

const SignUp = () => {
  const navigate = useNavigate();

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
  };

  return (
    <StyledAuth>
      <div className="auth">
        <div className="auth-container">
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="auth-main">
              <h2 className="heading">Sign Up Account</h2>
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
              <div className="already-account">
                Have an account? <Link to="/sign-in">Sign In Here</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </StyledAuth>
  );
};

export default SignUp;
