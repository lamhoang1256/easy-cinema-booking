import {
  GET_MOVIE_BOOKING_REQUEST,
  GET_MOVIE_BOOKING_SUCCESS,
  GET_MOVIE_BOOKING_FAIL,
  SELECT_CHAIR,
  BUY_TICKET_SUCCESS,
  RESET_SELETING_CHAIR,
} from "../constants/movieBuyTicket.constant";

const initialState = {
  loading: true,
  dataMovieBooking: {},
  listGheDangChon: [],
};

export const movieBooking = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MOVIE_BOOKING_REQUEST:
      return { ...state, loading: true };
    case GET_MOVIE_BOOKING_SUCCESS:
      return { ...state, loading: false, dataMovieBooking: payload };
    case GET_MOVIE_BOOKING_FAIL:
      return { ...state, loading: false, error: payload };
    case SELECT_CHAIR:
      //kiểm tra xem ghế đang chọn có được chọn trước không VD: chọn ghế 4 nếu nhấn chọn ghế 4 một lần nữa sẽ bỏ chọn ghế 4
      const selectChair = payload;
      let newListGheDangChon = [...state.listGheDangChon];
      const index = state.listGheDangChon.findIndex((c) => c.maGhe === selectChair.maGhe); // trả về -1 nếu ko tồn tại trong mảng
      if (index === -1) {
        // ghế chưa được chọn
        newListGheDangChon = [...newListGheDangChon, payload];
      } else {
        newListGheDangChon.splice(index, 1);
      }
      newListGheDangChon.sort((firstItem, secondItem) => firstItem.maGhe - secondItem.maGhe);
      return { ...state, listGheDangChon: newListGheDangChon };
    case RESET_SELETING_CHAIR:
      return { ...state, listGheDangChon: [] };
    default:
      return state;
  }
};
