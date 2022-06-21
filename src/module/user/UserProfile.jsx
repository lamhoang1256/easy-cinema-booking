import { yupResolver } from "@hookform/resolvers/yup";
import { usersApi } from "apis/usersApi";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { schemaUserUpdate } from "constants/user.schema";
import { StyledButtonAuth } from "pages/Authentication/authentication.style";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { removeEmptyStringProperties } from "utilities/helper";

const StyledUserProfile = styled.div``;

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaUserUpdate),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
  });

  const handleUpdateProfile = async (values) => {
    console.log(values);
    const body = removeEmptyStringProperties(values);
    try {
      const { data } = await usersApi.userUpdateProfile(body);
      if (data.status === "success") toast.success("Update user profile successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMyProfile = async () => {
    try {
      const { data } = await usersApi.userMyProfile();
      setProfile(data.data.user);
      reset(data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyProfile();
  }, []);

  return (
    <StyledUserProfile>
      <div className="container">
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <h2 className="heading">Update Account</h2>
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
              <Label htmlFor="email">Email</Label>
              <Input name="email" control={control} type="email" placeholder="Email" />
              <LabelError>{errors.email?.message}</LabelError>
            </Field>
            <Field>
              <Label htmlFor="password">New Password</Label>
              <Input
                name="password"
                control={control}
                type="password"
                placeholder={"Min 8 characters"}
              />
              <LabelError>{errors.password?.message}</LabelError>
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
          <StyledButtonAuth type="submit">Update</StyledButtonAuth>
        </form>
      </div>
    </StyledUserProfile>
  );
};

export default UserProfile;
