import { OPEN_TRAILER, CLOSE_TRAILER } from "redux/constants/modalTrailer.constant";

export const openModalTrailer = (urlTrailer) => {
  return { type: OPEN_TRAILER, payload: urlTrailer };
};

export const closeModalTrailer = () => {
  return { type: CLOSE_TRAILER };
};
