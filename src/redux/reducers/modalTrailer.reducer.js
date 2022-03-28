import { OPEN_TRAILER, CLOSE_TRAILER } from "../constants/modalTrailer.constant";

const initialState = {
  urlTrailer: "",
  isShowTrailer: false,
};

export const modalTrailer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_TRAILER:
      return { ...state, urlTrailer: payload, isShowTrailer: true };
    case CLOSE_TRAILER:
      return { ...state, urlTrailer: "", isShowTrailer: false };
    default:
      return state;
  }
};
