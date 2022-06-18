import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesApi } from "apis/moviesApi";

const initialState = {
  showtime: [],
  isSelecting: [],
  loading: true,
};

export const fetchShowtime = createAsyncThunk("booking/fetchShowtime", async (id) => {
  const { data } = await moviesApi.showtimeGetSingle(id);
  return data.data.showtime;
});
const toggleSelectSeat = (state, action) => {
  // if user HAS SELECTED return index of seat else user NOT SELECT return -1
  const index = state.isSelecting.findIndex((item) => action.payload.id === item.ticketId);
  if (index === -1) {
    state.isSelecting = [...state.isSelecting, { ticketId: action.payload.id }];
  } else {
    state.isSelecting = state.isSelecting.splice(index, 1);
  }
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectSeat: toggleSelectSeat,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtime.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShowtime.fulfilled, (state, action) => {
        state.loading = false;
        state.showtime = action.payload;
      });
  },
});
export const { selectSeat } = bookingSlice.actions;
export default bookingSlice.reducer;
