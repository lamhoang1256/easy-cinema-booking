import * as yup from "yup";

export const schemaYupSignUp = yup.object({
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must have at least 1 uppercase, 1 lowercase, 1 special character",
    })
    .required("Please enter your password"),
  repeatPassword: yup
    .string()
    .required("Please enter re-password")
    .oneOf([yup.ref("password")], "Passwords must be same!"),
  phoneNumber: yup.string().required("Please enter your phone number"),
  dateOfBirth: yup.string().required("Please enter your date of birth"),
});

export const schemaYupSignIn = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),
});

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

export const schemaYupFilm = yup.object().shape({
  title: yup
    .string()
    .required("Tên không được để trống !")
    .min(6, "Tên ít nhất bao gồm 6 kí tự !")
    .max(200, "Tên nhiều nhất bao gồm 200 kí tự !"),
  description: yup
    .string()
    .required("Mô tả không được để trống !")
    .min(6, "Mô tả ít nhất bao gồm 6 kí tự !")
    .max(2000, "Mô tả nhiều nhất bao gồm 2000 kí tự !"),
  rating: yup.string().required("Đánh giá không được để trống !"),
  trailer: yup
    .string()
    .required("Trailer không được để trống !")
    .matches(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
      "Trailer bắt buộc là video từ youtube!"
    ),
});

export const schemaShowtime = yup.object().shape({
  movieId: yup.number().required("Mã phim không được để trống !"),
  screenId: yup.number().required("Mã phòng chiếu không được để trống !"),
  startTime: yup.string().required("Thời gian khởi chiếu không được đê trống"),
  price: yup.number().required("Giá vé không được để trống !"),
});
