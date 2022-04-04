import axios from "axios";
import {
  GET_MOVIE_BOOKING_REQUEST,
  GET_MOVIE_BOOKING_SUCCESS,
  GET_MOVIE_BOOKING_FAIL,
  SELECT_CHAIR,
  BUY_TICKET_REQUEST,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAIL,
} from "../constants/movieBooking.constant";

export const getMovieBookingAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MOVIE_BOOKING_REQUEST });
    const response = await axios.get(
      "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=40343",
      {
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzAiLCJIZXRIYW5TdHJpbmciOiIxNC8xMC8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NjU3MDU2MDAwMDAiLCJuYmYiOjE2Mzc0Mjc2MDAsImV4cCI6MTY2NTg1MzIwMH0.RAzH9H37ZyQ8ZT6A62fw3_bDfJOCq0A9vz08qT262EU",
        },
      }
    );
    dispatch({ type: GET_MOVIE_BOOKING_SUCCESS, payload: response.data.content });
  } catch (err) {
    dispatch({ type: GET_MOVIE_BOOKING_FAIL, payload: err });
  }
};

export const selectChairAction = (infoChair) => async (dispatch) => {
  console.log(infoChair);
  dispatch({ type: SELECT_CHAIR, payload: infoChair });
};

export const buyTicketAction = (dataToBuyTicket) => async (dispatch) => {
  try {
    dispatch({ type: BUY_TICKET_REQUEST });
    const response = await axios.post(
      "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
      dataToBuyTicket,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibmd1eWVubGFtIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibmd1eWVubGFtMTNAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIktoYWNoSGFuZyIsIm5ndXllbmxhbTEzQGdtYWlsLmNvbSIsIkdQMDAiXSwibmJmIjoxNjQ5MDc3ODE5LCJleHAiOjE2NDkwODE0MTl9.0iTIpLtxhBble1M2VAYVX37Q7IihX86PPhQQJi6fBU8",
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzAiLCJIZXRIYW5TdHJpbmciOiIxNC8xMC8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NjU3MDU2MDAwMDAiLCJuYmYiOjE2Mzc0Mjc2MDAsImV4cCI6MTY2NTg1MzIwMH0.RAzH9H37ZyQ8ZT6A62fw3_bDfJOCq0A9vz08qT262EU",
        },
      }
    );
    console.log(response);
    dispatch({ type: BUY_TICKET_SUCCESS });
  } catch (err) {
    dispatch({ type: BUY_TICKET_FAIL, payload: err });
  }
};
