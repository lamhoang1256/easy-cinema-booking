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
  const { idDisplay, userSelected } = action.payload;
  console.log({ idDisplay, userSelected });
  // if user HAS SELECTED return index of seat else user NOT SELECT return -1
  const index = state.isSelecting.findIndex((item) => item.ticketId === userSelected.id);
  console.log(index);
  if (index === -1) {
    state.isSelecting = [
      ...state.isSelecting,
      { ...userSelected, idDisplay: idDisplay, ticketId: userSelected.id },
    ];
  } else {
    state.isSelecting = state.isSelecting.filter((seat, key) => key !== index);
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
