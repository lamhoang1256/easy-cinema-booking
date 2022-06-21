import * as yup from "yup";

export const schemaUserUpdate = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup.string(),
  firstName: yup.string().required("Please enter your firstname"),
  lastName: yup.string().required("Please enter your lastname"),
  role: yup.string().required("Please enter role"),
  dateOfBirth: yup.string().required("Please enter date of birth"),
  phoneNumber: yup.string().required("Please enter phone number"),
});
