import { OPEN_TRAILER, CLOSE_TRAILER } from "../constants/modalTrailer.constant";

// mở trailer phim
export const openModalTrailerAction = (urlTrailer) => {
  return { type: OPEN_TRAILER, payload: urlTrailer };
};

// đóng trailer phim
export const closeModalTrailerAction = () => {
  return { type: CLOSE_TRAILER };
};
