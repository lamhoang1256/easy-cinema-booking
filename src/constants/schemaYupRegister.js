import * as yup from "yup";

export const schemaYupRegister = yup.object().shape({
  username: yup
    .string()
    .required("Tên tài khoản không được để trống !")
    .min(6, "Tên tài khoản ít nhất bao gồm 6 kí tự !")
    .max(15, "Tên tài khoản nhiều nhất bao gồm 15 kí tự !"),
  fullname: yup
    .string()
    .required("Họ và tên không được để trống !")
    .min(6, "Họ và tên ít nhất bao gồm 6 kí tự !")
    .max(30, "Họ và tên nhiều nhất bao gồm 30 kí tự !"),
  email: yup
    .string()
    .required("Email không được để trống !")
    .min(6, "Email ít nhất bao gồm 6 kí tự !"),
  phone: yup
    .string()
    .required("Số điện thoại không được để trống !")
    .min(6, "Số điện thoại ít nhất bao gồm 6 kí tự !")
    .max(16, "Số điện thoại nhiều nhất bao gồm 16 kí tự !"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống !")
    .min(6, "Mật khẩu ít nhất bao gồm 6 kí tự !")
    .max(15, "Mật khẩu nhiều nhất bao gồm 15 kí tự !"),
  password_repeat: yup
    .string()
    .required("Xác nhận mật khẩu không được để trống !")
    .oneOf([yup.ref("password")], "Xác nhận mật khẩu không trùng khớp !"),
});
