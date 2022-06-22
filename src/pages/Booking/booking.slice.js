import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { configAPI } from "apis/configAPI";

const initialState = {
  showtime: [],
  isSelecting: [],
  loading: true,
};

export const fetchShowtime = createAsyncThunk("booking/fetchShowtime", async (id) => {
  const { data } = await configAPI.showtimeGetSingle(id);
  return data.data.showtime;
});

const handleSelectSeat = (state, action) => {
  const { idDisplay, userSelected } = action.payload;
  // if user HAS SELECTED return index of seat else user NOT SELECT return -1
  const index = state.isSelecting.findIndex((seat) => seat.ticketId === userSelected.id);
  if (index === -1) {
    state.isSelecting = [
      ...state.isSelecting,
      { ...userSelected, idDisplay, ticketId: userSelected.id },
    ];
  } else {
    state.isSelecting = state.isSelecting.filter((seat, key) => key !== index);
  }
};
const handleSelectingSeat = (state) => {
  state.isSelecting = [];
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectSeat: handleSelectSeat,
    resetSelectingSeat: handleSelectingSeat,
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
export const { selectSeat, resetSelectingSeat } = bookingSlice.actions;
export default bookingSlice.reducer;
