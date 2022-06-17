import * as yup from "yup";

export const schemaUserUpdate = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup.string(),
  // .min(8, "Password must be at least 8 characters")
  // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  //   message: "Password must have at least 1 uppercase, 1 lowercase, 1 special character",
  // }),
  firstName: yup.string().required("Please enter your firstname"),
  lastName: yup.string().required("Please enter your lastname"),
  role: yup.string().required("Please enter role"),
  dateOfBirth: yup.string().required("Please enter date of birth"),
  phoneNumber: yup.number().required("Please enter phone number"),
});
