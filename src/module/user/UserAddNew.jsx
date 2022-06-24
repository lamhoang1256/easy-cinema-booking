import styled from "styled-components";
import { schemaAddNewUser } from "constants/yupSchema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { configAPI } from "apis/configAPI";
import Button from "components/button/Button";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LabelError from "components/label/LabelError";
import { useNavigate } from "react-router-dom";
import { path } from "constants/path";

const StyledUserAddNew = styled.div`
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

const UserAddNew = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaAddNewUser) });

  const handleAddNewUser = async (values) => {
    try {
      const { data } = await configAPI.userAddNew(values);
      if (data?.status === "success") toast.success("Add new user successfully");
      navigate(path.userManage);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <StyledUserAddNew>
      <h2>Add New User</h2>
      <form className="movie" onSubmit={handleSubmit(handleAddNewUser)}>
        <div className="form-layout">
          <Field>
            <Label htmlFor="firstName">First Name</Label>
            <Input placeholder="First Name" name="firstName" type="text" control={control} />
            <LabelError>{errors.firstName?.message} </LabelError>
          </Field>
          <Field>
            <Label htmlFor="lastName">Last Name</Label>
            <Input placeholder="Last Name" type="text" control={control} name="lastName" />
            <LabelError>{errors.lastName?.message}</LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input placeholder="Email" type="email" control={control} name="email" />
            <LabelError>{errors.email?.message}</LabelError>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input placeholder="Password" type="password" control={control} name="password" />
            <LabelError>{errors.password?.message}</LabelError>
          </Field>
        </div>
        <div className="form-layout">
          <div className="form-layout">
            <Field>
              <Label htmlFor="role">Role</Label>
              <Input placeholder="Role" type="text" control={control} name="role" />
              <LabelError>{errors.role?.message}</LabelError>
            </Field>
            <Field>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input type="date" placeholder="Date of Birth" control={control} name="dateOfBirth" />
              <LabelError>{errors.dateOfBirth?.message} </LabelError>
            </Field>
          </div>
          <Field>
            <Label htmlFor={"phoneNumber"}>Phone Number</Label>
            <Input type="text" placeholder="Phone Number" control={control} name="phoneNumber" />
            <LabelError>{errors.phoneNumber?.message}</LabelError>
          </Field>
        </div>
        <Button kind="purple" type="submit" className="submit">
          Sửa
        </Button>
      </form>
    </StyledUserAddNew>
  );
};

export default UserAddNew;
