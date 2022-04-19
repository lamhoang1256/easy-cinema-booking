import {
  GET_TICKET_ROOM_REQUEST,
  GET_TICKET_ROOM_SUCCESS,
  GET_TICKET_ROOM_FAIL,
  SELECT_SEAT,
  RESET_SELETING_SEAT,
} from "../../constants/movie/movieTicketRoom.constant";

const initialState = {
  isLoadingTicketRoom: true,
  dataTicketRoom: {},
  listSelectingSeat: [],
  error: null,
};

export const movieTicketRoom = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TICKET_ROOM_REQUEST:
      return { ...state, isLoadingTicketRoom: true };
    case GET_TICKET_ROOM_SUCCESS:
      return { ...state, isLoadingTicketRoom: false, dataTicketRoom: payload };
    case GET_TICKET_ROOM_FAIL:
      return { ...state, isLoadingTicketRoom: false, error: payload };

    case SELECT_SEAT:
      return { ...state, listSelectingSeat: payload };
    case RESET_SELETING_SEAT:
      return { ...state, listSelectingSeat: [] };

    default:
      return state;
  }
};
