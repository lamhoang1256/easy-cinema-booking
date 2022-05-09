import {
  GET_TICKET_ROOM_REQUEST,
  GET_TICKET_ROOM_SUCCESS,
  GET_TICKET_ROOM_FAIL,
  SELECT_SEAT,
  RESET_SELETING_SEAT,
} from "../../constants/movie/ticketRoom.constant";

const initialState = {
  isLoading: true,
  dataTicketRoom: {},
  selectingSeatList: [],
  error: null,
};

export const TicketRoom = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TICKET_ROOM_REQUEST:
      return { ...state, isLoading: true };
    case GET_TICKET_ROOM_SUCCESS:
      return { ...state, isLoading: false, dataTicketRoom: payload };
    case GET_TICKET_ROOM_FAIL:
      return { ...state, isLoading: false, error: payload };

    case SELECT_SEAT:
      return { ...state, selectingSeatList: payload };
    case RESET_SELETING_SEAT:
      return { ...state, selectingSeatList: [] };

    default:
      return state;
  }
};
