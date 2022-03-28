import { OPEN_TRAILER, CLOSE_TRAILER } from "../constants/modalTrailer.constant";

export const openModalTrailerAction = (urlTrailer) => {
  return { type: OPEN_TRAILER, payload: urlTrailer };
};

export const closeModalTrailerAction = () => {
  return { type: CLOSE_TRAILER };
};
