// import * as yup from "yup";

// export const schemaYupFilm = yup.object().shape({
//   title: yup
//     .string()
//     .required("Tên phim không được để trống !")
//     .min(6, "Tên ít nhất bao gồm 6 kí tự !")
//     .max(200, "Tên nhiều nhất bao gồm 200 kí tự !"),
//   description: yup
//     .string()
//     .required("Mô tả không được để trống !")
//     .min(6, "Mô tả ít nhất bao gồm 6 kí tự !")
//     .max(2000, "Mô tả nhiều nhất bao gồm 2000 kí tự !"),
//   rating: yup.string().required("Đánh giá không được để trống !"),
//   trailer: yup
//     .string()
//     .required("Trailer không được để trống !")
//     .matches(
//       /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
//       "Trailer bắt buộc là video từ youtube!"
//     ),
// });

import * as yup from "yup";

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
