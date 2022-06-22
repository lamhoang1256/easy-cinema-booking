import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { configAPI } from "apis/configAPI";
import Button from "components/button/Button";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { schemaUserUpdate } from "constants/yupSchema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { sweetAlert } from "utilities/sweetAlert";

const StyledUserUpdate = styled.div`
  .form-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    button {
      width: max-content;
    }
  }
  .submit {
    width: 100%;
  }
`;

const UserUpdate = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaUserUpdate) });

  const fetchUserNeedUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.userGetSingle(id);
      setUser(data.data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUpdateUser = (values) => {
    const updates = {
      ...values,
      password: values?.password || null,
    };
    const updateUser = async () => {
      try {
        const { data } = await configAPI.userUpdate(id, updates);
        if (data?.status === "success") {
          sweetAlert(
            "success",
            "Cập nhật người dùng thành công!",
            "Bạn đã sửa thành công thông tin người dùng!"
          );
        }
      } catch (error) {
        sweetAlert("error", "Cập nhật người dùng thất bại!", error?.response?.data?.content);
      }
    };
    updateUser();
  };

  useEffect(() => {
    fetchUserNeedUpdate();
  }, [id]);

  if (loading) return "Loading";
  // console.log(user);
  return (
    <StyledUserUpdate>
      <h2>Update User</h2>
      <form className="movie" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="form-layout">
          <Field>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              placeholder="First Name"
              name="firstName"
              type="text"
              defaultValue={user?.firstName}
              control={control}
            />
            <LabelError>{errors.firstName?.message} </LabelError>
          </Field>
          <Field>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              placeholder="Last Name"
              type="text"
              defaultValue={user?.lastName}
              control={control}
              name="lastName"
            />
            <LabelError>{errors.lastName?.message}</LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Email"
              type="email"
              defaultValue={user?.email}
              control={control}
              name="email"
            />
            <LabelError>{errors.email?.message}</LabelError>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Password"
              type="password"
              defaultValue={""}
              control={control}
              name="password"
            />
            <LabelError>{errors.password?.message}</LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <div className="form-layout">
            <Field>
              <Label htmlFor="role">Role</Label>
              <Input
                placeholder="Role"
                type="text"
                defaultValue={user?.role}
                control={control}
                name="role"
              />
              <LabelError>{errors.role?.message}</LabelError>
            </Field>
            <Field>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                type="date"
                placeholder="Date of Birth"
                defaultValue={user?.dateOfBirth}
                control={control}
                name="dateOfBirth"
              />
              <LabelError>{errors.dateOfBirth?.message} </LabelError>
            </Field>
          </div>
          <Field>
            <Label htmlFor={"phoneNumber"}>Phone Number</Label>
            <Input
              type="text"
              placeholder="Phone Number"
              defaultValue={user?.phoneNumber}
              control={control}
              name="phoneNumber"
            />
            <LabelError>{errors.phoneNumber?.message}</LabelError>
          </Field>
        </div>
        <Button kind="purple" type="submit" className="submit">
          Sửa
        </Button>
      </form>
    </StyledUserUpdate>
  );
};

export default UserUpdate;
