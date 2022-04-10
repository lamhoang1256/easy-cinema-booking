import * as yup from "yup";

export const schemaYupLogin = yup.object().shape({
  username: yup
    .string()
    .required("Tên tài khoản không được để trống !")
    .min(6, "Tên tài khoản ít nhất bao gồm 6 kí tự !")
    .max(15, "Tên tài khoản nhiều nhất bao gồm 15 kí tự !"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống !")
    .min(6, "Mật khẩu ít nhất bao gồm 6 kí tự !")
    .max(15, "Mật khẩu nhiều nhất bao gồm 15 kí tự !"),
});
