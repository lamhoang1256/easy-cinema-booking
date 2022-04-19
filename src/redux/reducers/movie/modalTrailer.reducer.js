import { OPEN_TRAILER, CLOSE_TRAILER } from "../../constants/movie/modalTrailer.constant";

const initialState = {
  urlTrailer: "",
  isTrailerVisible: false,
};

export const modalTrailer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_TRAILER:
      return { ...state, urlTrailer: payload, isTrailerVisible: true };
    case CLOSE_TRAILER:
      return { ...state, urlTrailer: "", isTrailerVisible: false };
    default:
      return state;
  }
};
