import * as yup from "yup";

export const schemaYupFilm = yup.object().shape({
  movieName: yup
    .string()
    .required("Tên không được để trống !")
    .min(6, "Tên ít nhất bao gồm 10 kí tự !")
    .max(600, "Tên nhiều nhất bao gồm 100 kí tự !"),
  movieDesc: yup
    .string()
    .required("Mô tả không được để trống !")
    .min(6, "Mô tả ít nhất bao gồm 10 kí tự !")
    .max(600, "Mô tả nhiều nhất bao gồm 500 kí tự !"),
  movieRating: yup.string().required("Đánh giá không được để trống !"),
  movieUrlTrailer: yup
    .string()
    .required("Trailer không được để trống !")
    .matches(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
      "Trailer bắt buộc là video từ youtube!"
    ),
});
