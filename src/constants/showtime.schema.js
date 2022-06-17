import * as yup from "yup";

export const schemaShowtime = yup.object().shape({
  movieId: yup.number().required("Mã phim không được để trống !"),
  screenId: yup.number().required("Mã phòng chiếu không được để trống !"),
  startTime: yup.string().required("Thời gian khởi chiếu không được đê trống"),
  price: yup.number().required("Giá vé không được để trống !"),
});
