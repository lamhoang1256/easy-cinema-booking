import { OPEN_TRAILER, CLOSE_TRAILER } from "redux/constants/modalTrailer.constant";

// mở trailer phim
export const openModalTrailer = (urlTrailer) => {
  return { type: OPEN_TRAILER, payload: urlTrailer };
};

// đóng trailer phim
export const closeModalTrailer = () => {
  return { type: CLOSE_TRAILER };
};
