import axiosClient from "apis/axiosClient";
import {
  GET_MOVIE_BOOKING_REQUEST,
  GET_MOVIE_BOOKING_SUCCESS,
  GET_MOVIE_BOOKING_FAIL,
  SELECT_CHAIR,
  BUY_TICKET_REQUEST,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAIL,
  RESET_SELETING_CHAIR,
} from "../constants/movieBuyTicket.constant";

// lấy thông tin phòng vé (thông tin phim + danh sách ghế)
export const getMovieBookingAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_MOVIE_BOOKING_REQUEST });
    const response = await axiosClient.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);
    dispatch({ type: GET_MOVIE_BOOKING_SUCCESS, payload: response.data.content });
  } catch (err) {
    dispatch({ type: GET_MOVIE_BOOKING_FAIL, payload: err });
  }
};

// chọn ghế
export const selectChairAction = (infoChair) => async (dispatch) => {
  dispatch({ type: SELECT_CHAIR, payload: infoChair });
};

// xử lí mua vé
export const buyTicketAction = (dataToBuyTicket) => async (dispatch) => {
  try {
    dispatch({ type: BUY_TICKET_REQUEST });
    const response = await axiosClient.post(
      "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
      dataToBuyTicket
    );
    dispatch({ type: BUY_TICKET_SUCCESS });
    return { isBuyTicketSuccess: true };
  } catch (err) {
    dispatch({ type: BUY_TICKET_FAIL, payload: err });
  }
};

// xóa các ghế đang chọn khi thanh toán thành công
export const resetSelectingChair = () => async (dispatch) => {
  dispatch({ type: RESET_SELETING_CHAIR });
};
